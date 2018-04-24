import React, { Component } from 'react'
import Containers from '../Components/Containers'
import Elements from '../Components/Elements'
import Addition from './Addition'
const { Canvas, Group } = Containers
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

  PathEvents = {
    created: (path) => {
      this.path = path
      this.setState({
        pathInit: true
      })
      console.log(this.path)
    }
  }

  render() {
    const pathConfig = { initAttr: { plot:bezierFunc(points),  fill: { width:22, color:'red' } } }
    const imageConfig = { initAttr: {  } }

    return (
      <Canvas size={{ width:1920, height:1080 }}>
        <Path events={ this.PathEvents } initConfig = { pathConfig }/>
        { this.path!=undefined?<Addition {...this.props} path={this.path}/>:null }
      </Canvas>
    )
  }
}

export default Test
