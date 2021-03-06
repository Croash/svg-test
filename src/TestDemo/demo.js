import React, { Component } from 'react'
import SVG from 'svg.js'
import './dragproptype.js'
import { Containers, Elements } from 'react-svg.js'
import Addition from './Addition'
import navline from './img/navline.png'
import utils from './utils'
const { angle/* , vec2GetPoint */ } = utils
const { Canvas, Group } = Containers
const { Rect, Path, Image, Circle, Ellipse } = Elements
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
      groupInit: false,
      rectIndex: 0
    }
    this.circleCenter = [ 970, 6540 ]
    this.r = 6500
    const { leftConstrain = 3, rightConstrain = 3 } = props
    this.leftDragConstrain = leftConstrain
    this.rightDragConstrain = rightConstrain
  }
  componentDidMount() {

  }
  PathEvents = {
    created: (path) => {
      // it used to be this.path = path, test now
      this.path = path
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
      window.__dragable__ = true
      window.__btnClickable__ = true
      this.__dragMove__ = 0
      this.__rotate__ = 0
    },
    beforedrag: (e) => {
      if((this.__dragMove__ <= 4 )&&window.__dragable__) {
        console.log('before',this.rectPicIns[0].transform())
        this.rectIns.map((rect,index)=>{
          this.rectInsMatrix[index] = rect.transform()
        })
        this.rectPicIns.map((rect,index)=>{
          this.rectPicInsMatrix[index] = rect.transform()
        })
        this.imgIns.map((img,index)=>{
          this.imgInsMatrix[index] = img.transform()
        })
        this.textIns.map((text,index)=>{
          this.textInsMatrix[index] = text.transform()
        })
        this.__rotate__ = 0
      }
      this.__rotate__ = 0
    },
    dragstart: (e,ins) => {
      this.__points__ = null
    },
    dragmove: (e,ins) => {

      ++this.__dragMove__
      if(this.__dragMove__>4) 
        window.__btnClickable__ = false
    },
    customdrag: (e,ins) => {
      const{ start, end } = e.detail
      if(this.__dragMove__ > 4 && window.__dragable__ ) {
        if(!this.__points__) 
          this.__points__ = { ...start }
        const vectorS = { x: this.__points__.x - this.circleCenter[0], y: this.__points__.y - this.circleCenter[1] },
          vectorE = { x: end.x - this.circleCenter[0], y: end.y - this.circleCenter[1] }
        this.__rotate__ += angle(vectorS,vectorE)
        
        if(this.__rotate__<=0) {
          if(this.leftDragConstrain*singleAngle<Math.abs(this.__rotate__))
            this.__rotate__ = this.__rotate__/Math.abs(this.__rotate__)*this.leftDragConstrain*singleAngle
        }
        else if(this.rightDragConstrain*singleAngle<Math.abs(this.__rotate__))
          this.__rotate__ = this.__rotate__/Math.abs(this.__rotate__)*this.rightDragConstrain*singleAngle

        this.CustomRotate(e,ins,this.__rotate__,this.imgIns,this.rectIns,this.rectPicIns,this.imgInsMatrix,this.rectInsMatrix,this.rectPicInsMatrix)
        this.__points__ = { ...end }
      }
    },
    dragend: (e,ins) => {
      let left = this.__rotate__-Math.round(this.__rotate__/singleAngle)*singleAngle
      // this.__dragMove__ = 0
      if(window.__dragable__&&this.__dragMove__ >4 ) {
        this.path.animate(400)
          .during((pos, morph, eased) => { 
            // this.__dragMove__ = 0
            window.__dragable__ = false
            // console.log(this.__dragMove__)
            window.__dragable__ = false
            this.CustomRotate(e,ins,this.__rotate__-left*eased,this.imgIns,this.rectIns,this.rectPicIns,this.imgInsMatrix,this.rectInsMatrix,this.rectPicInsMatrix)
          })
          .after(()=>{
            // console.log('no rotate',(this.__rotate__-left)/singleAngle)
            const rectRotate = (this.__rotate__-left)
            let matrix = new SVG.Matrix()
            this.CustomRotate(e,ins,0,this.imgIns,this.rectIns,this.rectPicIns,this.imgInsMatrix,this.rectInsMatrix,this.rectPicInsMatrix)
            this.rectPicIns[0].matrix(this.rectPicInsMatrix[0]).transform(matrix.rotate(rectRotate,...this.circleCenter/* +rect.attr().width/2 */), true)
            console.log(rectRotate/singleAngle)
            window.__dragable__ = true
            this.__dragMove__ = 0
            this.setState({ rectIndex: this.state.rectIndex + Math.round(rectRotate/singleAngle) })
            setTimeout(() => {
              window.__btnClickable__ = true
              
            }, 0)

            
          })
      }
      this.__points__ = null
      this.__dragMove__ = 0
      // window.__btnClickable__ = true
      // console.log('end')
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
      // rect.matrix(matrixRect)
      //   .transform(matrix.rotate(rotateAngle,...this.circleCenter/* +rect.attr().width/2 */), true)
      // rect.matrix(matrixRect).transform(matrix.rotate(-rotateAngle,rect.attr().cx(),rect.attr().cy()/* +rect.attr().width/2 */), true)
    })

    this.textIns.map((text,index)=>{
      const matrixRect = rectInsMatrix[index]/* new SVG.Matrix() */
      text.matrix(matrixRect).transform(matrix.rotate(-rotateAngle,text.attr().x/* +text.attr().width/2 */,text.attr().y-20/* +text.attr().width/2 */), true)
    })

  }
        // { this.path!=undefined? <MoveIcon path={ this.path } 
        //   events = {{ created:(MoveIcon) => { 
        //     this.MoveIcon = MoveIcon
        //     this.rectPicIns = [ MoveIcon ]
        //     this.setState({ MoveIcon:true }) } 
        //   }}/>:null }
  render() {
    const pathConfig = { initAttr: { plot:bezierFunc(points), stroke: { width:6, color:'red' } } }
    console.log(this.state.rectIndex)
    return (
      <Group __parent__= {this.props.__parent__}>

        <Group  events = {this.GroupEvents}>
          <Path events={ this.PathEvents } initConfig = { pathConfig } />
          { (this.path!=undefined) ? <Addition {...this.props} path={this.path} 
              rectIndex = { this.state.rectIndex }
              events={{ created:(insObj)=>{
                this.imgIns=insObj.imgIns
                this.rectIns=insObj.rectIns
                this.rectPicIns=insObj.rectPicIns
                this.textIns = insObj.textIns
                this.imgInsMatrix = []
                this.rectInsMatrix = []
                this.rectPicInsMatrix = []
                this.textInsMatrix = []
                this.rectIns.map((rect,index)=>{
                  this.rectInsMatrix[index] = rect.transform()
                })
                this.imgIns.map((img,index)=>{
                  this.imgInsMatrix[index] = img.transform()
                })
                this.rectPicIns.map((rect,index)=>{
                  this.rectPicInsMatrix[index] = rect.transform()
                })
                this.textIns.map((text,index)=>{
                  this.textInsMatrix[index] = text.transform()
                })
              } }}
              rect = { this.MoveIcon }
            />:null }
        </Group>
      </Group>
    )
  }
}


class MoveIcon extends Component {
  constructor(props) {
    super(props)
    this.path = props.path
    this.__parent__ = props.__parent__
  }

  RectEvents = {
    created: (rect) => {
      this.rect = rect
      this.rectClick = true
    }
  }

  componentDidMount() {
    if(this.props.events&&this.props.events.created)
      this.props.events.created(this.rect)
  }

  render() {
    const rectPos = this.path.pointAt(0)
    const rectConfig = { 
      initAttr: { 
        size:[ 100,100 ], 
        fill : 'blue', 
        center: [ rectPos.x,rectPos.y ] 
      } 
    }
    return <Rect __parent__ = { this.__parent__ } events={ this.RectEvents } initConfig={ rectConfig }/>
  }
}

class Test extends Component {
  render() {
    const imageConfig = { initAttr: { load: navline, move: [ 0,40 ] } }
    return (
      <Canvas size={{ width:1920, height:280 }}>
        <Image initConfig = { imageConfig } />
        <GComp/>
      </Canvas>
    )
  }
}

export default Test
