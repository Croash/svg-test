import React,{ Component, Children } from 'react'
import Base from './base'
import isFun from '../utils/isFun'
import SVG from 'svg.js'

class Path extends Base {
  
  initName() {
    this.instanceName = 'path'
    return this.instanceName
  }

  initAttr() {
    const { attr = { width : 100, height : 100, fill : 'blue' } } = this.props
    this[this.instanceName].attr(attr)
  }

}

export default Path
