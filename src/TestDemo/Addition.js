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
  }

  RectEvents = {
    created: (rect) => {
      this.rect = rect
      this.rectClick = true
      this.setState({ rectInit: true })
    }
  }

  render() {
    const devide = 7
    const length = this.path.length()
    const rectPos = this.path.pointAt(0/(devide-1)*length)
    const rectConfig = { initAttr: { size:[ 100,100 ], fill : 'blue', center: [ rectPos.x,rectPos.y ] } }
    
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
        click:()=>{ console.log(this.rect)
          this.rect.animate(300).during((pos, morph, eased) => {
            let p = this.path.pointAt( ( this.index +(index-this.index)*eased)/(devide-1) * length)
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
      
      { this.rect!=undefined ? imgArr.map((imgConfig,i)=><Image initConfig={ imgConfig }/> ) : null }
      { this.rect!=undefined ? rectConfigArr.map((r,i)=>(<Rect initConfig={ r } events={ eventsArr[i] }/>)) : null }
    </Group>)
  }
}

export default Addition
