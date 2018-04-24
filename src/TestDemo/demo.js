import React, { Component } from 'react'
import Containers from '../Components/Containers'
import Elements from '../Components/Elements'
import Addition from './Addition'
import navline from '../img/navline.png'

const { Canvas, Group } = Containers
const { Rect, Path, Image, Circle } = Elements


const bezierFunc = (points) => {
  return `M${points[0].x} ${points[0].y} 
          Q${points[1].x} ${points[1].y} 
          ${points[2].x} ${points[2].y}`
}

const points = [
  { x:250,y:80 },
  { x:1020 ,y:0 },
  { x:1690,y:80 }
]

class Test extends Component {

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
    const pathConfig = { initAttr: { plot:bezierFunc(points), stroke: { width:6, color:'red' } } }
    const imageConfig = { initAttr: { load: navline, move: [ 0,40 ] } }

    return (
      <Canvas size={{ width:1920, height:1080 }}>
        <Path events={ this.PathEvents } initConfig = { pathConfig }/>
        <Image initConfig = { imageConfig }/>
        { this.path!=undefined?<Addition {...this.props} path={this.path}/>:null }
      </Canvas>
    )
  }
}

export default Test
