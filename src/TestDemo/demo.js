import React, { Component } from 'react'
import SVG from 'svg.js'
import './dragproptype.js'
import { Containers, Elements } from 'react-svg.js'
import Addition from './Addition'
import navline from '../img/navline.png'
import utils from './utils'
const { angle } = utils
const { Canvas, Group } = Containers
const { Rect, Path, Image, Circle } = Elements
const singleAngle = 2.120077582553386

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

const rotateCal = (circleCenter,startPoint,endPoint) => {
  const vectorS = { x: startPoint.x - circleCenter[0], y: startPoint.y - circleCenter[1] },
    vectorE = { x: endPoint.x - circleCenter[0], y: endPoint.y - circleCenter[1] }
  return angle(vectorS,vectorE)
}

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
      window.__dragClick__ = false
    },
    beforedrag: (e) => {
      // window.__dragClick__ = false
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
      window.__dragClick__ = false
      const{ start, end } = e.detail
      if(!this.__points__) 
        this.__points__ = { ...start }
      const vectorS = { x: this.__points__.x - this.circleCenter[0], y: this.__points__.y - this.circleCenter[1] },
        vectorE = { x: end.x - this.circleCenter[0], y: end.y - this.circleCenter[1] }
      this.__rotate__ += angle(vectorS,vectorE)
      
      if(3*singleAngle<Math.abs(this.__rotate__))
        this.__rotate__ = this.__rotate__/Math.abs(this.__rotate__)*3*singleAngle

      this.CustomRotate(e,ins,this.__rotate__,this.imgIns,this.rectIns,this.rectPicIns,this.imgInsMatrix,this.rectInsMatrix,this.rectPicInsMatrix)
      this.__points__ = { ...end }
    },
    dragend: (e,ins) => {
      let left = this.__rotate__-Math.round(this.__rotate__/singleAngle)*singleAngle
      this.path.animate(600)
        .during((pos, morph, eased) => {  
          this.CustomRotate(e,ins,this.__rotate__-left*eased,this.imgIns,this.rectIns,this.rectPicIns,this.imgInsMatrix,this.rectInsMatrix,this.rectPicInsMatrix)
        })
        .after(()=>{
          let matrix = new SVG.Matrix()
          this.CustomRotate(e,ins,0,this.imgIns,this.rectIns,this.rectPicIns,this.imgInsMatrix,this.rectInsMatrix,this.rectPicInsMatrix)
          // const matrixRect = this.rectPicIns[0].transform(matrix.rotate(this.__rotate__-left,...this.circleCenter), true)
          window.__dragClick__ = true
        })
      
      this.__points__ = null
      // window.__dragClick__ = true
      console.log('end')
    }
  }

  // imgIns = this.imgIns ,
  // rectIns = this.rectIns,
  // rectPicIns = this.rectPicIns 
  // imgInsMatrix = this.imgInsMatrix,
  // rectInsMatrix = this.rectInsMatrix,
  // rectPicInsMatrix = this.rectPicInsMatrix
  CustomRotate = (e,ins,rotateAngle,imgIns,rectIns,rectPicIns,imgInsMatrix,rectInsMatrix,rectPicInsMatrix) => {
    let matrix = new SVG.Matrix()
    ins.matrix(e.detail.matrix).transform(matrix.rotate(rotateAngle,...this.circleCenter), true)

    imgIns.map((img,index)=>{
      const matrixImg = imgInsMatrix[index]
      img.matrix(matrixImg).transform(matrix.rotate(-rotateAngle,img.attr().x+25.5,img.attr().y+25.5), true)
    })
    rectIns.map((rect,index)=>{
      const matrixRect = rectInsMatrix[index]/* new SVG.Matrix() */
      rect.matrix(matrixRect).transform(matrix.rotate(-rotateAngle,rect.attr().x+rect.attr().width/2,rect.attr().y+rect.attr().width/2), true)
    })
    rectPicIns.map((rect,index)=>{
      const matrixRect = rectPicInsMatrix[index]/* new SVG.Matrix() */
      // rect.matrix(matrixRect).transform(matrix.rotate(-this.__rotate__,rect.attr().cx()/* +rect.attr().width/2 */,rect.attr().cy/* +rect.attr().width/2 */), true)
    })
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
