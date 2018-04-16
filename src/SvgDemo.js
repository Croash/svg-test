import React,{ Component } from 'react'
import SVG from 'svg.js'

import Canvas from './Canvas'
import Containers from './Components/Containers'
import Elements from './Components/Elements'
const { Group } = Containers
const { Rect, Path } = Elements

class SvgDemo extends Component {
  render() {
    return(
      <Canvas>
        <Group>
          <Path path = { 'M250 80Q1020 0 1690 80' } />
        </Group>
      </Canvas>
    )
  }
}

export default SvgDemo
