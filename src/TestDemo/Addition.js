import React, { Component } from 'react'
import SVG from 'svg.js'
import { Containers,Elements } from 'react-svg.js'
import Dot from '../img/navdot.png'
import utils from './utils'
const { angle } = utils
const { Group } = Containers
const { Rect, Path, Image, Circle, Ellipse } = Elements

const rotateCal = (circleCenter,startPoint,endPoint) => {
  const vectorS = { x: startPoint.x - circleCenter[0], y: startPoint.y - circleCenter[1] },
    vectorE = { x: endPoint.x - circleCenter[0], y: endPoint.y - circleCenter[1] }
  return angle(vectorS,vectorE)
}

class Addition extends Component {
  constructor(props) {
    super(props)
    this.path = props.path
    this.index = 0
    this.state = {
      rectInit: false
    }
    this.imgIns = []
    this.rectIns = []
    this.rectPicIns = []
    this.circleCenter = [ 970, 6540 ]
    this.clickAble = false
  }

  RectEvents = {
    created: (rect) => {
      this.rect = rect
      this.rectPicIns.push(this.rect)
      this.rectClick = true
      this.setState({ rectInit: true })
    }
  }

  render() {
    const { devide = 7 } = this.props
    const length = this.path.length()
    const rectPos = this.path.pointAt(0/(devide-1)*length)
    const rectConfig = { 
      initAttr: { 
        size:[ 100,100 ], 
        fill : 'blue', 
        center: [ rectPos.x,rectPos.y ] 
      } 
    }
    
    const posArr = []
    for(let i=0;i<devide;i++) {
      const pos = this.path.pointAt(i/(devide-1)*length)
      posArr.push(pos)
    }

    const rectConfigArr = posArr.map(p=>({ initAttr: { center: [ p.x, p.y ], size:[ 80,80 ], fill : 'rgba(0,0,0,0)', stroke: { color: 'white', width: 2 } } }))
    let eventsArr = []
    let imgArr = []
    if(this.rect!=undefined) {
      eventsArr = posArr.map((pos,index)=>({
        created:(ins)=>{ this.rectIns.push(ins) },
        click:(e,ins)=>{
          let angle = 0
          let increaseAngle = 0
          // console.log(this.rect.attr())
          let startLen = ( this.index +(index-this.index)*0)/(devide-1) * length
          let startPoint = this.path.pointAt(startLen)
          if(this.clickAble/* &&window.__dragClick__ */)
            this.rect
              .animate(300)
              // .rotate('auto')
              .during((pos, morph, eased) => {  
                this.clickAble = false
                const rectMatrix = this.rect.transform()
                const inputLength = ( this.index +(index-this.index)*eased)/(devide-1) * length
                let p = this.path.pointAt(inputLength)
                const matrix = new SVG.Matrix()
                angle = rotateCal(this.circleCenter,startPoint,p)
                increaseAngle += angle
                this.rect
                  .matrix(rectMatrix)
                  .transform(
                    matrix.rotate(angle,...this.circleCenter),
                    true )
                  // .center(p.x, p.y)
                startPoint = p
              })
            .after(()=>{
              this.clickAble = true
              // console.log(increaseAngle)
              this.index = index
            })
        }
      }))
      imgArr = posArr.map((p,index)=>({ initAttr: { center: [ p.x-26, p.y-26 ], fill : 'rgba(0,0,0,0)', load: Dot } }))
    }
    return (<Group __parent__= {this.props.__parent__} >
      <Ellipse events={ this.RectEvents } initConfig={ rectConfig }/>
      
      { this.rect!=undefined ? imgArr.map((imgConfig,i)=><Image initConfig={ imgConfig } events={{ created:(ins)=>{ this.imgIns.push(ins) } }}/> ) : null }
      { this.rect!=undefined ? rectConfigArr.map((r,i)=>(<Rect initConfig={ r } events={ eventsArr[i] }/>)) : null }
    </Group>)
  }  
  
  componentDidMount() {
    setTimeout(() => {
      this.clickAble = true
    }, 4000)
    if(this.props.events&&this.props.events.created)
      this.props.events.created({ imgIns:this.imgIns, rectIns: this.rectIns, rectPicIns: this.rectPicIns })
  }
}

export default Addition
