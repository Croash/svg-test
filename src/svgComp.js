import React,{ Component } from 'react'
import SVG from 'svg.js'

class SvgComp extends Component {
  componentDidMount() {
    let draw = SVG('SvgDrawing').size(300, 300)
    let path = draw.path('M0 0 A50 50 0 0 1 50 50 A50 50 0 0 0 100 100')

    path.fill('none').move(50, 20).stroke({ width: 1, color: '#ccc' })
    
    path.marker('start', 10, 10, function (add) {
      add.circle(10).fill('#f06')
    })
    path.marker('mid', 10, 10, function (add) {
      add.rect(5, 10).cx(5).fill('#ccc')
    })
    path.marker('end', 20, 20, function (add) {
      add.circle(6).center(4, 5)
      add.circle(6).center(4, 15)
      add.circle(6).center(12, 10)
    
      this.fill('#0f9')
    })

  }
  render() {
    return(<div id="SvgDrawing"></div>)
  }
}

export default SvgComp
