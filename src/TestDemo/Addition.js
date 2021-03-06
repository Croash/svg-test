import React, { Component } from 'react'
import SVG from 'svg.js'
import { Containers,Elements } from 'react-svg.js'
import Dot from './img/navdot.png'
import utils from './utils'
import { vec2 } from 'gl-matrix'
const { angle, vec2GetPoint } = utils
const { Group } = Containers
const { Rect, Path, Image, Circle, Ellipse, Text } = Elements
const singleAngle = 2.120077582553386

const rotateCal = (circleCenter,startPoint,endPoint) => {
  const vectorS = { x: startPoint.x - circleCenter[0], y: startPoint.y - circleCenter[1] },
    vectorE = { x: endPoint.x - circleCenter[0], y: endPoint.y - circleCenter[1] }
  return angle(vectorS,vectorE)
}

class Addition extends Component {
  constructor(props) {
    super(props)
    this.path = props.path
    // this.index = 0
    this.state = {
      rectInit: false
    }
    this.imgIns = []
    this.rectIns = []
    this.sideRectIns = []
    this.rectPicIns = []
    this.textIns = []
    this.circleCenter = [ 970, 6540 ]
    this.rect = props.rect
    this.clickAble = false
    this.rectIndex = props.rectIndex
    this.index = props.rectIndex
  }

  componentWillReceiveProps(nextProps) {
    if( this.props.rectIndex != nextProps.rectIndex ) {
      this.index += (nextProps.rectIndex - this.props.rectIndex)
      console.log(this.index)
    }
  }

  RectEvents = {
    created: (rect) => {
      this.rect = rect
      this.rectPicIns.push(this.rect)
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
    let textConfig = []
    let pathInitPos = this.path.pointAt(0)
    let matrixPos = new SVG.Matrix()
    const posArr = []
    for(let i=0;i<devide;i++) {
      const pos = vec2GetPoint(matrixPos.rotate(singleAngle*i,...this.circleCenter), [ pathInitPos.x, pathInitPos.y ] )
      posArr.push(pos)
      textConfig.push({
        initAttr: { 
          center: [ pos.x/* -30 */, pos.y+20 ], 
          // size:[ 80,80 ], 
          fill : 'white',
          font: { 
            family:   'Helvetica',
            size:     35,
            anchor:   'middle',
            leading:  '1.5em'
          },
          'text':'ggwp'
        } 
      })
    }
    console.log(textConfig)
    const rectFormerConfig = []
    const rectLatterConfig = []
    for(let i=1;i<=3;i++) {
      let formerPos = vec2GetPoint(matrixPos.rotate(-singleAngle*i,...this.circleCenter), [ posArr[0].x, posArr[0].y ] )
      let latterPos = vec2GetPoint(matrixPos.rotate(singleAngle*i,...this.circleCenter), [ posArr[posArr.length-1].x, posArr[posArr.length-1].y ] )
      rectFormerConfig.push( { initAttr: { center: [ formerPos.x, formerPos.y ], size:[ 80,80 ], fill : 'rgba(0,0,0,0)', stroke: { color: 'white', width: 2 } } } )
      rectLatterConfig.push( { initAttr: { center: [ latterPos.x, latterPos.y ], size:[ 80,80 ], fill : 'rgba(0,0,0,0)', stroke: { color: 'white', width: 2 } } } )
    }
    const rectConfigArr = posArr.map(
      p=>(
        { initAttr: { center: [ p.x, p.y ], size:[ 80,80 ], fill : 'rgba(0,0,0,0)', stroke: { color: 'white', width: 2 } } }
      )
    )
    let eventsArr = []
    let imgArr = []
    if(this.rect!=undefined) {
      eventsArr = posArr.map((pos,index)=>({
        created:(ins)=>{ this.rectIns.push(ins) },
        click:(e,ins)=>{
          let matrixBase = new SVG.Matrix()
          const { rectIndex = 0 } = this.props
          let angleInside = 0
          let increaseAngle = 0
          let startLen = ( this.index )/(devide-1) * length
          // let startPoint = this.path.pointAt(startLen)
          let startPoint = vec2GetPoint(matrixBase.rotate(singleAngle*this.index,...this.circleCenter), [ posArr[0].x, posArr[0].y ])
          // console.log(gg,startPoint)
          const rectMatrix = this.rect.transform()
          // console.log('gg',window.__btnClickable__)
          if(this.clickAble&&window.__btnClickable__/* &&window.__dragClick__ */)
            this.rect 
              .animate(300)
              .during((pos, morph, eased) => {
                this.clickAble = false
                // const inputLength = ( this.index +(index-this.index)*eased)/(devide-1) * length
                // let p = this.path.pointAt(inputLength)
                let p = vec2GetPoint(matrixBase.rotate(singleAngle* ( this.index +(index-this.index)*eased),...this.circleCenter), [ posArr[0].x, posArr[0].y ])
                const matrix = new SVG.Matrix()
                angleInside = rotateCal(this.circleCenter,startPoint,p)
                increaseAngle += angleInside
                // let input = increaseAngle+ rectIndex* singleAngle *eased
                console.log(rectIndex,this.index,increaseAngle)
                this.rect
                  .matrix(rectMatrix)
                  .transform(
                    matrix.rotate(increaseAngle,...this.circleCenter),
                    true )  
                startPoint = p
              })
            .after(()=>{
              // console.log('ggclick',window.__btnClickable__)
              this.clickAble = true
              this.index = index/* +this.index */
            })
        }
      }))
      imgArr = posArr.map((p,index)=>({ initAttr: { center: [ p.x-26, p.y-26 ], fill : 'rgba(0,0,0,0)', load: Dot } }))
      let leftSideText = []
      let rightSideText = []
      for(let i=1;i<=3;i++) {
        let formerPos = vec2GetPoint(matrixPos.rotate(-singleAngle*i,...this.circleCenter), [ posArr[0].x, posArr[0].y ] )
        let latterPos = vec2GetPoint(matrixPos.rotate(singleAngle*i,...this.circleCenter), [ posArr[posArr.length-1].x, posArr[posArr.length-1].y ] )
        imgArr.push( { initAttr: { center: [ formerPos.x-26, formerPos.y-26 ], fill : 'rgba(0,0,0,0)', load: Dot } })
        imgArr.push( { initAttr: { center: [ latterPos.x-26, latterPos.y-26 ], fill : 'rgba(0,0,0,0)', load: Dot } })
        leftSideText.push({
          initAttr: { 
            center: [ formerPos.x/* -30 */, formerPos.y+20 ], 
            // size:[ 80,80 ], 
            fill : 'white',
            font: { 
              family:   'Helvetica',
              size:     35,
              anchor:   'middle',
              leading:  '1.5em'
            },
            'text':`ggwp-${i}`
          } 
        })
        rightSideText.push({
          initAttr: { 
            center: [ latterPos.x/* -30 */, latterPos.y+20 ], 
            // size:[ 80,80 ], 
            fill : 'white',
            font: { 
              family:   'Helvetica',
              size:     35,
              anchor:   'middle',
              leading:  '1.5em'
            },
            'text':`ggwp+${i}`
          } 
        })
      }

      textConfig = [ ...leftSideText.reverse(), ...textConfig, ...rightSideText ]
    }
    return (<Group __parent__= {this.props.__parent__} >
      <Rect __parent__ = { this.__parent__ } events={ this.RectEvents } initConfig={ rectConfig }/>
      { this.rect!=undefined ? imgArr.map((imgConfig,i)=><Image initConfig={ imgConfig } events={{ created:(ins)=>{ this.imgIns.push(ins) } }}/> ) : null }
      { this.rect!=undefined ? rectConfigArr.map((r,i)=>(<Rect initConfig={ r } events={ eventsArr[i] }/>)) : null }
      { this.rect!=undefined ? rectFormerConfig.map((r,i)=>(<Rect initConfig={ r } events={{ created:(ins)=>{ this.rectIns.push(ins) } }}/>)) : null }
      { this.rect!=undefined ? rectLatterConfig.map((r,i)=>(<Rect initConfig={ r } events={{ created:(ins)=>{ this.rectIns.push(ins) } }}/>)) : null }
      { this.rect!=undefined ? textConfig.map((r,i)=>(<Text initConfig={ r } events={{ created:(ins)=>{ this.textIns.push(ins) } }} />)) : null  }
      </Group>)
  }  
  
  componentDidMount() {
    setTimeout(() => {
      this.clickAble = true
    }, 4000)
    //expose imgIns rectIns and PicIns
    console.log(this.imgIns)
    if(this.props.events&&this.props.events.created) {
      let arr = [ 1,2,3 ]
      console.log([ ...arr ],this.rectIns.length)
      this.props.events.created({ imgIns:this.imgIns, rectIns: this.rectIns/* , ...this.sideRectIns */ , rectPicIns: this.rectPicIns, textIns: this.textIns })
    }
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
      this.rectPicIns.push(this.rect)
      this.setState({ rectInit: true })
    }
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

export default Addition
