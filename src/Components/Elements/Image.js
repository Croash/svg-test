import React,{ Component, Children } from 'react'
import Base from './base'
import isFun from '../utils/isFun'
import SVG from 'svg.js'

class Image extends Base {
  
  initName() {
    this.instanceName = 'image'
    return this.instanceName
  }

  initAttr() {
    const { attr = { width : 100, height : 100, fill : 'blue' } } = this.props
    this[this.instanceName].attr(attr)
  }


  render() {
    return null
  }

  componentDidCatch(error, info) {
    return <div>{error} : {info}</div>
  }

}

export default Image
