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
    let length = path.length()
    let input = path.pointAt(length/3)
    let image = draw.image(navline,200,200).loaded( function (loader) {
      this.size(loader.width, loader.height)
    })
    image.move(0,40)


    path.fill('none').move(250, 40).stroke({ width: 1, color: 'rgba(0,0,0,0)' })
    
    this.index=0
    let devide = 7
    const pathArray = []
    for(let i = 0;i<devide;i++) {
      pathArray.push( path.pointAt( length/(devide-1)*i ) )
    }

    let circle = draw.circle(100).fill('blue').move(pathArray[0].x-50, pathArray[0].y-50)
    circle.animate(1000).radius(75)
    circle.click(()=>{
    })

    pathArray.map((pos,index) => {
      let symbol = draw.symbol()
      symbol.rect(100, 100).fill('#f09')
      symbol.click(()=>{
        circle.animate(300).during((pos, morph, eased) => {
          // const ratio = eased
          let p = path.pointAt( ( this.index +(index-this.index)*eased)/(devide-1) * length)
          circle.center(p.x, p.y)
        })
        .after(()=>{
          this.index = index
        })
        
      })
      draw.use(symbol).move(pos.x-50, pos.y-50)
    })

  }
  render() {
    console.log('son render')
    return(<div ref={ref=>{ this.ref=ref }}></div>)
  }
}

export default SvgComp
