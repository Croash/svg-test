import React, { Component } from 'react'
import Containers from '../Components/Containers'
import Elements from '../Components/Elements'
import Dot from '../img/navdot.png'
const { Group } = Containers
const { Rect, Path, Image, Circle } = Elements

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
    const rectConfig = { initAttr: { size:[ 100,100 ], fill : 'blue', center: [ rectPos.x,rectPos.y ] } }
    
    const posArr = []
    for(let i=0;i<devide;i++) {
      const pos = this.path.pointAt(i/(devide-1)*length)
      posArr.push(pos)
    }
    console.log(posArr)

    const rectConfigArr = posArr.map(p=>({ initAttr: { center: [ p.x, p.y ], size:[ 80,80 ], fill : 'rgba(0,0,0,0)', stroke: { color: 'white', width: 2 } } }))
    let eventsArr = []
    let imgArr = []
    if(this.rect!=undefined) {
      eventsArr = posArr.map((pos,index)=>({
        created:(ins)=>{ this.rectIns.push(ins) },
        click:(e,ins)=>{ 
          console.log(this.path.transform(),e)
          this.rect.animate(300).rotate('auto').during((pos, morph, eased) => {
            const inputLength = ( this.index +(index-this.index)*eased)/(devide-1) * length
            let p = this.path.pointAt(inputLength)
            this.rect.center(p.x, p.y)
          })
          .after(()=>{
            this.index = index
          })
        }
      }))
      imgArr = posArr.map((p,index)=>({ initAttr: { center: [ p.x-26, p.y-26 ], fill : 'rgba(0,0,0,0)', load: Dot } }))
    }
    return (<Group __parent__= {this.props.__parent__} >
      <Rect events={ this.RectEvents } initConfig={ rectConfig }/>
      
      { this.rect!=undefined ? imgArr.map((imgConfig,i)=><Image initConfig={ imgConfig } events={{ created:(ins)=>{ this.imgIns.push(ins) } }}/> ) : null }
      { this.rect!=undefined ? rectConfigArr.map((r,i)=>(<Rect initConfig={ r } events={ eventsArr[i] }/>)) : null }
    </Group>)
  }  
  
  componentDidMount() {
    if(this.props.events&&this.props.events.created)
      this.props.events.created({ imgIns:this.imgIns, rectIns: this.rectIns, rectPicIns: this.rectPicIns })
  }
}

export default Addition
