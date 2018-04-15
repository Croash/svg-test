import React, { Component } from 'react'
import { BrowserRouter as Router, Link, Route, Switch, Redirect } from 'react-router-dom'
import SvgComp from './svgComp'

import Canvas from './Canvas'
import Group from './Components/Container/group'
import Rect from './Components/Element/rect'
// import { Rect } from './Components/Element'

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
    )     //   
  }
}

class App extends Component {
  render() {
    return (
      <Test  style={{ width:'1920px' }}/>
    )
  }
}

export default App
