import React, { Component } from 'react'
import 'svg.draggable.js'
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

class GComp extends Component {

  constructor(props) {
    super(props)
    this.index = 0
    this.state = {
      pathInit: false,
      groupInit: false
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

  GroupEvents = {
    created: (group) => {
      this.group = group
      // this.setState({ groupInit:true })
      console.log('cr')
      this.group.draggable()
    },
    beforedrag: (e) => {
      // e.preventDefault()
      console.log('sg')
    },
    dragstart: (e,ins) => {
      console.log('start')
    },
    dragmove: (e,ins) => {
      console.log('move process')
    },
    dragend: (e,ins) => {
      console.log('end')
    }
  }

  render() {
    const pathConfig = { initAttr: { plot:bezierFunc(points), stroke: { width:6, color:'red' } } }

    return (
      <Group __parent__= {this.props.__parent__} events = {this.GroupEvents}>
        <Path events={ this.PathEvents } initConfig = { pathConfig } />
        { this.path!=undefined?<Addition {...this.props} path={this.path}/>:null }
      </Group>
    )
  }
}

class Test extends Component {
  render() {
    const imageConfig = { initAttr: { load: navline, move: [ 0,40 ] } }
    return (
      <Canvas size={{ width:1920, height:1080 }}>
        <Image initConfig = { imageConfig }/>
        <GComp/>
      </Canvas>
    )
  }
}

export default Test
