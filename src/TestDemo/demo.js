import React, { Component } from 'react'
import SVG from 'svg.js'
import './dragproptype.js'
import Containers from '../Components/Containers'
import Elements from '../Components/Elements'
import Addition from './Addition'
import navline from '../img/navline.png'


// x: transformX, y: transformY
// 
//
const { Canvas, Group } = Containers
const { Rect, Path, Image, Circle } = Elements


const bezierFunc = (points) => {
  return `M${points[0].x} ${points[0].y} 
          Q${points[1].x} ${points[1].y} 
          ${points[2].x} ${points[2].y}`
}

const points = [
  { x:250,y:80 },
  { x:1020 ,y:0 },
  { x:1690,y:80 }
]

class GComp extends Component {

  constructor(props) {
    super(props)
    this.index = 0
    this.state = {
      pathInit: false,
      groupInit: false
    }
    this.circleCenter = [ 970, 6540 ]
    this.r = 6500
  }

  PathEvents = {
    created: (path) => {
      this.path = path
      this.setState({
        pathInit: true
      })
    }
  }

  GroupEvents = {
    created: (group) => {
      this.group = group
      // this.group.rotate(30)
      this.groupCenter = []
      this.group.draggable()
    },
    beforedrag: (e) => {
      console.log('sg')
    },
    dragstart: (e,ins) => {
      console.log('start')
      this.__rotate__ = 0
      this.__points__ = null
    },
    dragmove: (e,ins) => {

    },
    customdrag: (e,ins) => {
      const{ transform, start, end } = e.detail
      if(!this.__points__) 
        this.__points__ = { ...start }
      const center = this.circleCenter
      const vectorS = { x: this.__points__.x - this.circleCenter[0], y: this.__points__.y - this.circleCenter[1] },
        vectorE = { x: end.x - this.circleCenter[0], y: end.y - this.circleCenter[1] }
      const devider = Math.sqrt((vectorE.x*vectorE.x+vectorE.y*vectorE.y)*(vectorS.x*vectorS.x+vectorS.y*vectorS.y))
      let cosinput = (vectorE.x*vectorS.x+vectorE.y*vectorS.y)/devider
      const arccos = Math.acos(cosinput)
      let sininput = (-vectorE.x*vectorS.y+vectorS.x*vectorE.y)/devider
      const arcsin = Math.asin(sininput)
      console.log(arccos,arcsin,/* ,arcsin, */)
      let matrix = new SVG.Matrix()
      sininput>0? this.__rotate__ += arccos*50 : this.__rotate__ -= arccos*50
      ins.matrix(e.detail.matrix).transform(matrix.rotate(this.__rotate__,...this.circleCenter), true)
      this.__points__ = { ...end }
    },
    dragend: (e,ins) => {
      this.__points__ = null
      console.log('end')
    }
  }

  render() {
    const pathConfig = { initAttr: { plot:bezierFunc(points), stroke: { width:6, color:'red' } } }

    return (
      <Group __parent__= {this.props.__parent__} events = {this.GroupEvents}>
        <Path events={ this.PathEvents } initConfig = { pathConfig } />
        { this.path!=undefined?<Addition {...this.props} path={this.path}/>:null }
      </Group>
    )
  }
}

class Test extends Component {
  render() {
    const imageConfig = { initAttr: { load: navline, move: [ 0,40 ] } }
    return (
      <Canvas size={{ width:1920, height:1080 }}>
        <Image initConfig = { imageConfig }/>
        <GComp/>
      </Canvas>
    )
  }
}

export default Test
