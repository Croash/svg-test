import React, { Component } from 'react'
import SvgComp from './svgComp'

import navline from './img/navline.png'

import Canvas from './Canvas'
import Containers from './Components/Containers'
import Elements from './Components/Elements'
const { Group } = Containers
const { Rect, Path, Image, Circle } = Elements

const bezierFunc = (points) => {
  return `M${points[0].x} ${points[0].y} 
          Q${points[1].x} ${points[1].y} 
          ${points[2].x} ${points[2].y}`
}

const points = [
  { x:250,y:350 },
  { x:1020 ,y:270 },
  { x:1690,y:350 }
]

let num = 100
class Test extends Component {

  constructor(props) {
    super(props)
    this.index = 0
    this.state = {
      pathInit: false
    }
  }

  componentDidMount() {
    console.log('did')
  }

  render() {
    const RectEvents = {
      created: (rect) => {
        this.rectClick = true
      },
      click: (e,ins) => {
        if(this.rectClick) {
          this.rectClick = false
          ins.animate(1400).move(num,0).after(() => {
            // do something
            num+=100
            this.rectClick = true
          })
        }
      }
    }

    const PathEvents = {
      created: (path) => {
        this.path = path
        this.setState({
          pathInit: true
        })
        console.log(this.path)
      }
    }

    
    const pathConfig = { initAttr: { plot:bezierFunc(points),  fill: { width:22, color:'red' } } }
    const imageConfig = { initAttr: {  } }
    let rectConfig = {}
    const rectConfigArr = []
    const devide = 7
    console.log(this.path)
    if(this.path!=undefined) {
      const length = this.path.length()
      const rectPos = this.path.pointAt(0/(devide-1)*length)
      rectConfig = { initAttr: { size:[ 100,100 ], fill : 'blue', center: [ rectPos.x,rectPos.y ] } }
      for(let i=0;i<devide;i++) {
        const pos = this.path.pointAt(i/(devide-1)*length)
        console.log(this.path.pointAt(i/(devide-1)*length),devide,i)
        rectConfigArr.push({
          initAttr: { center: [ pos.x, pos.y ], size:[ 100,100 ], fill : 'white' }
        })
      } 
    }
    return (
      <Canvas size={{ width:1920, height:1080 }}>
        <Group>
          <Path events={ PathEvents } initConfig = { pathConfig }/>
          
          { rectConfigArr.map((rConfig,i)=><Rect initConfig={ rConfig } events={{ created:()=>{ console.log(i) } }}/>) }
          { this.path!=undefined ? <Rect events={ RectEvents } initConfig={ rectConfig } /> : null }
        </Group>
      </Canvas>
    )
  }
}

class App extends Component {
  render() {
    return (
      <Test style={{ width:'1920px' }}/>
    )
  }
}

export default App
