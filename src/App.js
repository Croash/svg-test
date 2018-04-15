import React, { Component } from 'react'
import { BrowserRouter as Router, Link, Route, Switch, Redirect } from 'react-router-dom'
import SvgComp from './svgComp'

import Canvas from './Canvas'
import Group from './Components/Container/group'
import Rect from './Components/Element/rect'

class Test extends Component {
  render() {
    return (
      <Canvas>
        <Group>
          <Rect/>
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
