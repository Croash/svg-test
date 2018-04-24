import React, { Component } from 'react'
import Containers from '../Components/Containers'
import Elements from '../Components/Elements'
const { Group } = Containers
const { Rect, Path, Image, Circle } = Elements

let num = 100
class Addition extends Component {
  constructor(props) {
    super(props)
    this.path = props.path
  }

  RectEvents = {
    created: (rect) => {
      this.rect = rect
      this.rectClick = true
    },
    click: (e,ins) => {
      // if(this.rectClick) {
      //   this.rectClick = false
      //   ins.animate(1400).move(num,0).after(() => {
      //     // do something
      //     num+=100
      //     this.rectClick = true
      //   })
      // }
    }
  }

  render() {
    const devide = 7
    const length = this.path.length()
    const rectPos = this.path.pointAt(0/(devide-1)*length)
    console.log(length,rectPos)
    const rectConfig = { initAttr: { size:[ 100,100 ], fill : 'blue', center: [ rectPos.x,rectPos.y ] } }
    
    
    const posArr = []
    for(let i=0;i<devide;i++) {
      const pos = this.path.pointAt(i/(devide-1)*length)
      posArr.push(pos)
    }

    const rectConfigArr = posArr.map(p=>({ initAttr: { center: [ p.x, p.y ], size:[ 100,100 ], fill : 'white' } }))
    // let eventsArr = posArr.map((p,index)=>{
    //   console.log(this.rect)
    //   this.rect.animate(300).during((pos, morph, eased) => {
    //     let p = this.path.pointAt( ( this.index +(index-this.index)*eased)/(devide-1) * length)
    //     this.rect.center(p.x, p.y)
    //   })
    //   .after(()=>{
    //     this.index = index
    //   })
    // })
    // events = { eventsArr[i] }
    return (<Group __parent__= {this.props.__parent__} >
      {rectConfigArr.map((r,i)=>(<Rect initConfig={ r } />))}
      <Rect events={ this.RectEvents } initConfig={ rectConfig }/>
    </Group>)
  }
}

export default Addition
