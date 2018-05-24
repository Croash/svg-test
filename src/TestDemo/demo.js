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
      // it used to be this.path = path, test now
      this.path = path.clone()
      this.setState({
        pathInit: true
      })
    }
  }

  GroupEvents = {
    created: (group) => {
      this.group = group
      this.groupCenter = []
      this.group.draggable()
    },
    beforedrag: (e) => {
      this.rectIns.map((rect,index)=>{
        this.rectInsMatrix[index] = rect.transform()
      })
      this.rectPicIns.map((rect,index)=>{
        this.rectPicInsMatrix[index] = rect.transform()
      })
      this.imgIns.map((img,index)=>{
        this.imgInsMatrix[index] = img.transform()
      })
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
      let matrix = new SVG.Matrix()
      sininput>0? this.__rotate__ += arccos*57 : this.__rotate__ -= arccos*57
      ins.matrix(e.detail.matrix).transform(matrix.rotate(this.__rotate__,...this.circleCenter), true)

      // this.path.matrix(e.detail.matrix).transform(matrix.rotate(this.__rotate__,...this.circleCenter), true)

      this.imgIns.map((img,index)=>{
        const matrixImg = this.imgInsMatrix[index]
        img.matrix(matrixImg).transform(matrix.rotate(-this.__rotate__,img.attr().x+25.5,img.attr().y+25.5), true)
      })
      this.rectIns.map((rect,index)=>{
        const matrixRect = this.rectInsMatrix[index]/* new SVG.Matrix() */
        rect.matrix(matrixRect).transform(matrix.rotate(-this.__rotate__,rect.attr().x+rect.attr().width/2,rect.attr().y+rect.attr().width/2), true)
      })
      // console.log(this.rectInsMatrix[0])
      this.rectPicIns.map((rect,index)=>{
        const matrixRect = this.rectPicInsMatrix[index]/* new SVG.Matrix() */
        // rect.matrix(matrixRect).transform(matrix.rotate(-this.__rotate__,rect.attr().cx()/* +rect.attr().width/2 */,rect.attr().cy/* +rect.attr().width/2 */), true)
      })
      this.__points__ = { ...end }
    },
    dragend: (e,ins) => {
      this.__points__ = null
      console.log('end'/* ,ins.transform() */)
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
          this.imgInsMatrix = []
          this.rectInsMatrix = []
          this.rectPicInsMatrix = []
          this.rectIns.map((rect,index)=>{
            this.rectInsMatrix[index] = rect.transform()
          })
          this.imgIns.map((img,index)=>{
            this.imgInsMatrix[index] = img.transform()
          })
          this.rectPicIns.map((rect,index)=>{
            this.rectPicInsMatrix[index] = rect.transform()
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
