import SVG from 'svg.js'

const ballColor = new SVG.Color('#ff0066')
let update = ({ comp: { ball,paddleLeft,paddleRight }, num }) => (dt) => {
  // move the ball by its velocity
  ball.dmove(num.vx*dt, num.vy*dt)
  
  let reset = () => {
  // visualize boom
    // boom()
    
    // reset speed values
    num.vx = 0
    num.vy = 0

    // position the ball back in the middle
    ball.animate(100).center(num.width/2, num.height/2)

    // reset the position of the paddles
    paddleLeft.animate(100).cy(num.height/2)
    paddleRight.animate(100).cy(num.height/2)
  }

  // get position of ball
  let cx = ball.cx()
    , cy = ball.cy()
  
  // get position of ball and paddle
  let paddleLeftCy = paddleLeft.cy()

  // move the left paddle in the direction of the ball
  let dy = Math.min(num.difficulty, Math.abs(cy - paddleLeftCy))
  paddleLeftCy += cy > paddleLeftCy ? dy : -dy

  // constraint the move to the canvas area
  paddleLeft.cy(Math.max(num.paddleHeight/2, Math.min(num.height-num.paddleHeight/2, paddleLeftCy)))

  // check if we hit top/bottom borders
  if ((num.vy < 0 && cy <= 0) || (num.vy > 0 && cy >= num.height)) {
    num.vy = -num.vy
  }
  
  let paddleLeftY = paddleLeft.y()
    , paddleRightY = paddleRight.y()

  console.log(cx,num.paddleWidth)
  // check if we hit the paddle
  if((num.vx < 0 && cx <= num.paddleWidth && cy > paddleLeftY && cy < paddleLeftY + num.paddleHeight) ||
     (num.vx > 0 && cx >= num.width - num.paddleWidth && cy > paddleRightY && cy < paddleRightY + num.paddleHeight)) {
    // depending on where the ball hit we adjust y velocity
    // for more realistic control we would need a bit more math here
    // just keep it simple
    num.vy = (cy - ((num.vx < 0 ? paddleLeftY : paddleRightY) + num.paddleHeight/2)) * 7 // magic factor

    // make the ball faster on hit
    num.vx = -num.vx * 1.05
  } else
  
  // check if we hit left/right borders
  if ((num.vx < 0 && cx <= 0) || (num.vx > 0 && cx >= num.width)) {
    // when x-velocity is negative, it's a point for player 2, otherwise player 1
    if(num.vx < 0) { ++num.playerRight }
    else { ++num.playerLeft }
    
    reset()
    console.log('gg')

    // scoreLeft.text(num.playerLeft+'')
    // scoreRight.text(num.playerRight+'')
  }
  
  
  // move player paddle
  let playerPaddleY = paddleRight.y()

  if (playerPaddleY <= 0 && num.paddleDirection == -1) {
    paddleRight.cy(num.paddleHeight/2)
  } else if (playerPaddleY >= num.height-num.paddleHeight && num.paddleDirection == 1) {
    paddleRight.y(num.height-num.paddleHeight)
  } else {
    paddleRight.dy(num.paddleDirection*num.paddleSpeed)
  }
  
  
  // update ball color based on position
  ball.fill(ballColor.at(1/num.width*ball.x()))
  
}

export default update
