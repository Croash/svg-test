import React, { Component } from 'react'
import SvgComp from './svgComp'

import navline from './img/navline.png'

import Canvas from './Canvas'
import Containers from './Components/Containers'
import Elements from './Components/Elements'
const { Group } = Containers
const { Rect, Path, Image } = Elements

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
        console.log(this.rectClick!=undefined)
        this.path = path
      }
    }

    const  rectConfig = { initAttr: { width : 100, height : 200, fill : 'white', x:100, y:100 } }
    const  pathConfig = { initAttr: { d:bezierFunc(points),  fill: { width:22, color:'red' } } }
    const  imageConfig = {}
    return (
      <Canvas size={{ width:1920, height:1080 }}>
        <Group>
          <Path events={ PathEvents } initConfig = { pathConfig }/>
          <Rect events={ RectEvents } initConfig={ rectConfig } />
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
