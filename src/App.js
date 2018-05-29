import React, { Component } from 'react'
import SvgComp from './svgComp'
import { Containers, Elements } from 'react-svg.js'
import TestDemo from './TestDemo'
import BallGame from './BallGame/game'
const { Canvas, Group } = Containers
const { Rect, Path, Image, Circle } = Elements

class App extends Component {
  render() {
    return (
      <TestDemo style={{ width:'1920px' }}/>
    )
  }
}

export default App
