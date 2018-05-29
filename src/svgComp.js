import React,{ Component } from 'react'
import SVG from 'svg.js'
import navline from './img/navline.png'

const bezierFunc = (points) => {
  return `M${points[0].x} ${points[0].y} 
          Q${points[1].x} ${points[1].y} 
          ${points[2].x} ${points[2].y}`
}

class SvgComp extends Component {

  constructor(props) {
    super(props)
    this.index = 0
  }

  componentDidMount() {
    const points = [
      { x:250,y:350 },
      { x:1020 ,y:270 },
      { x:1690,y:350 }
    ]
    let draw = SVG(this.ref).size(1920, 1080)

    let path = draw.path(bezierFunc(points))

    let text = draw.text()

    text.font({
      family:   'Helvetica',
      size:     144,
      anchor:   'middle',
      leading:  '1.5em'
    })
    text.fill('red')

  }
  render() {
    console.log('son render')
    return(<div ref={ref=>{ this.ref=ref }}></div>)
  }
}

export default SvgComp
