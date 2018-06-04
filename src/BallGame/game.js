import React, { Component } from 'react'
import SVG from 'svg.js'
import { Containers,Elements } from 'react-svg.js'
import updateBase from './function'
const { Canvas, Group } = Containers
const { Rect, Path, Image, Circle, Line } = Elements
const canvasWidth = 450, canvasHeight = 300, paddleWidth = 15, paddleHeight = 80, ballSize = 10

const paddleLeftConfig = { initAttr: { size: [ paddleWidth, paddleHeight ], fill:'#00ff99', x:0, cy:canvasHeight/2 } }
const paddleRightConfig = { initAttr: { size: [ paddleWidth, paddleHeight ], fill:'#ff0066', x:canvasWidth-paddleWidth, cy:canvasHeight/2 } }
const ballConfig = { initAttr: { size: [ 10,10 ], center: [ canvasWidth/2, canvasHeight/2 ], fill: '#7f7f7f' } }

let playerLeft = 0, playerRight = 0

let vx = 0, vy = 0
// AI difficulty
let difficulty = 2

let paddleDirection = 0, paddleSpeed = 5

const num = {
  paddleDirection: 0,
  paddleSpeed: 5,
  paddleWidth,
  paddleHeight,
  vx: 0,
  vy: 0,
  playerLeft:0,
  playerRight: 0,
  difficulty: 255,
  height: canvasHeight,
  width: canvasWidth
}

let lastTime
let callback = (ms) => {
  // we get passed a timestamp in milliseconds
  // we use it to determine how much time has passed since the last call
  if (lastTime) {
    this.update((ms-lastTime)/1000) // call update and pass delta time in seconds
  }
  lastTime = ms
  requestAnimationFrame(callback)
}


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
    const lineConfig = { initAttr:{ plot:[ canvasWidth/2, 0, canvasWidth/2, canvasHeight ], stroke:{ width: 5, color: '#fff', dasharray: '5,5' } } }
    return (
      <Canvas events = { { created:(canvas)=> { this.canvas = canvas } } } size={{ width:canvasWidth, height:canvasHeight }}>
        <Rect events = { { created:(back)=> { this.back = back } } } name={'background'} initConfig = { backgroundConfig }/>
        <Line name={'centerLine'} initConfig={lineConfig}/>
        <Rect events = { { created:(paddleLeft)=> { this.paddleLeft = paddleLeft } } } name={'paddleLeft'} initConfig={paddleLeftConfig}/>
        <Rect events = { { created:(paddleRight)=> { this.paddleRight = paddleRight } } } name={'paddleRight'} initConfig={paddleRightConfig}/>
        <Circle events = { { created:(ball)=> { this.ball = ball; console.log(this.ball) } } } name={'ball'} initConfig={ballConfig} />
      </Canvas>
    )
  }


  callback = (ms) => {
    // we get passed a timestamp in milliseconds
    // we use it to determine how much time has passed since the last call
    if (lastTime) {
      this.update((ms-lastTime)/1000) // call update and pass delta time in seconds
    }
    lastTime = ms
    requestAnimationFrame(this.callback)
  }

  bindEvents = () => {
    // this.canvas
    SVG.on(document, 'keydown', (e) => {
      num.paddleDirection = e.keyCode == 83 ? 1 : e.keyCode == 87 ? -1 : 0
      e.preventDefault()
    })

    SVG.on(document, 'keyup', (e) => {
      num.paddleDirection = 0
      e.preventDefault()
    })
    console.log(this.canvas)
    this.canvas.on('click', () => {
      if(num.vx === 0 && num.vy === 0) {
        num.vx = Math.random() * 500 - 150
        num.vy = Math.random() * 500 - 150
      }
    })
  }

  componentDidMount() {
    
    setTimeout(() => {
      console.log(this.ball)
      this.update = updateBase({ comp: { ball: this.ball,paddleLeft:this.paddleLeft,paddleRight: this.paddleRight }, num })
      this.bindEvents()      
      this.callback()
    }, 3000)
     
  }

}

export default BallGame
