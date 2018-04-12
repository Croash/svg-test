import React, { Component } from 'react'
import { BrowserRouter as Router, Link, Route, Switch, Redirect } from 'react-router-dom'
import SvgComp from './svgComp'

class Test extends Component {
  render() {
    return (
      <div style = {{ width:'1920px',height:'1000px',backgroundColor:'red' }}>
        sgsg
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <SvgComp  style={{ width:'1920px' }}/>
    )
  }
}

export default App
