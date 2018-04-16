import React, { Component } from 'react'
import SvgComp from './svgComp'

import Canvas from './Canvas'
import Containers from './Components/Containers'
import Elements from './Components/Elements'
const { Group } = Containers
const { Rect } = Elements
// import { Rect } from './Components/Elements'

class Test extends Component {
  render() {
    const RectEvents = {
      created: (rect) => {
        console.log(rect)
      },
      click: (rect) => {
        console.log('click')
      }
    }
    return (
      <Canvas>
        <Group>
          <Rect events={ RectEvents }/>
        </Group>
      </Canvas>
    )
  }
}

class App extends Component {
  render() {
    return (
      <SvgComp  style={{ width:'1920px' }}/>
    )
  }
}

export default App
