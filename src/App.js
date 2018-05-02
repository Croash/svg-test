import React, { Component } from 'react'
import SvgComp from './svgComp'
import Containers from './Components/Containers'
import Elements from './Components/Elements'
import navline from './img/navline.png'
import TestDemo from './TestDemo'
import BallGame from './BallGame/game'
const { Canvas, Group } = Containers
const { Rect, Path, Image, Circle } = Elements

class App extends Component {
  render() {
    return (
      <BallGame style={{ width:'1920px' }}/>
    )
  }
}

export default App
