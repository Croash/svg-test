import React, { Component } from 'react'
import SVG from 'svg.js'
import './dragproptype.js'
import Containers from '../Components/Containers'
import Elements from '../Components/Elements'
import Addition from './Addition'
import navline from '../img/navline.png'

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
  componentDidMount() {

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
      // console.log(arccos,arcsin)
      // console.log(this.imgIns)
      let matrix = new SVG.Matrix()
      sininput>0? this.__rotate__ += arccos*57 : this.__rotate__ -= arccos*57
      ins.matrix(e.detail.matrix).transform(matrix.rotate(this.__rotate__,...this.circleCenter), true)
      this.imgIns.map(img=>{
        const matrixImg = new SVG.Matrix()
        img.matrix(matrix).transform(matrixImg.rotate(-this.__rotate__,img.attr().x+25.5,img.attr().y+25.5), true)
      })
      // this.rectIns.map(rect=>{
      //   const matrixImg = new SVG.Matrix()
      //   console.log(rect.attr())
      //   rect.matrix(matrixImg).transform(matrixImg.rotate(-this.__rotate__,rect.attr().x+rect.attr().width/2,rect.attr().y+rect.attr().width/2), true)
      // })
      this.rectPicIns.map(rect=>{
        const matrixIn = rect.attr().transform
        // let matrixImg = matrixIn.toString().indexOf('NaN')>=0 ? new SVG.Matrix() : matrixIn
        let matrixImg = new SVG.Matrix()
        console.log(rect.attr().transform,matrixImg)
        rect.matrix(matrixIn).transform(matrixImg.rotate(-this.__rotate__,rect.attr().x+rect.attr().width/2,rect.attr().y+rect.attr().width/2), true)
      })
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
        { this.path!=undefined?<Addition {...this.props} path={this.path} events={{ created:(insObj)=>{
          this.imgIns=insObj.imgIns
          this.rectIns=insObj.rectIns
          this.rectPicIns=insObj.rectPicIns
          this.rectIns.map(rect=>{
            let matrix = new SVG.Matrix({ a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 })
            rect.matrix(matrix).transform(matrix.rotate(1),true)
          })
          this.imgIns.map(img=>{
            let matrix = new SVG.Matrix({ a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 })
            img.matrix(matrix).transform(matrix.rotate(1),true)
          })
          this.rectPicIns.map(rect=>{
            let matrix = new SVG.Matrix({ a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 })
            rect.matrix(matrix).transform(matrix.rotate(1),true)
          })
        } }}  />:null }
      </Group>
    )
  }
}

class Test extends Component {
  render() {
    const imageConfig = { initAttr: { load: navline, move: [ 0,40 ] } }
    return (
      <Canvas size={{ width:1920, height:1080 }}>
        <Image initConfig = { imageConfig } />
        <GComp/>
      </Canvas>
    )
  }
}

export default Test
