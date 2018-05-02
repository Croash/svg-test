import React, { Component } from 'react'
import Containers from '../Components/Containers'
import Elements from '../Components/Elements'

const { Canvas, Group } = Containers
const { Rect, Path, Image, Circle, Line } = Elements
const canvasWidth = 450, canvasHeight = 300

class BallGame extends Component {

  constructor(props) {
    super(props)
    this.index = 0
    this.state = {
      pathInit: false
    }
  }

  PathEvents = {
    created: (path) => {
      this.path = path
      this.setState({
        pathInit: true
      })
    }
  }

  render() {

    const backgroundConfig = { initAttr:{ size:[ canvasWidth, canvasHeight ], fill: '#dde3e1' } }

    return (
      <Canvas size={{ width:canvasWidth, height:canvasHeight }}>
        <Rect name={'background'} initConfig = { backgroundConfig }/>
      </Canvas>
    )
  }
}

export default BallGame
