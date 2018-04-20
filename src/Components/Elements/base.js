import React,{ Component, Children } from 'react'
import isFun from '../utils/isFun'
import SVG from 'svg.js'

import animeLoad from '../utils/animateLoad'

class Base extends Component {
  
  constructor(props) {
    super(props)
    const { __parent__ } = props
    if (typeof window !== 'undefined') {
      if(__parent__!=undefined) {
        this.parent = __parent__
        this.initialInstance()
      }
      else console.error('__parent__ undefined')
    }
  }

  initialInstance() {
    const { __parent__, __parent__type__, __canvas__: canvas } = this.props
    this.instanceName = this.initName()
    // this.parent = __parent__
        
    if (this[this.instanceName]) {
      return new Promise((resolve) => {
        resolve(this[this.instanceName])
      })
    } else {
      return new Promise((resolve) => {
        this[this.instanceName] = this.parent[this.instanceName]()
        // if(__parent__type__=='group')
        //   this.props.__group__.add(this[this.instanceName])
        this.initAttr()
        const events = this.exposeInstance(this.props)
        events && this.bindEvents(events)
        resolve(this[this.instanceName])

      })
    }

  }

  initName() {
    this.instanceName = 'rect'
    return this.instanceName
  }

  initAttr() {
    const defAttr = { width : 400, height : 200, fill : 'red' }
    const defAnim = {
      config: { time:3000, easing:'<', delay: 100 }, 
      situation:{ during:()=>{ }, loop:[ 1, false ], delay:100, after:()=>{} }
    }
    const { initConfig : { initAttr=defAttr, initAnim = defAnim } } = this.props
    console.log('sg',initAttr,initAnim)
    this[this.instanceName].attr(initAttr)                                                                                                              
    
    animeLoad(this[this.instanceName],initAnim)
    
  }

  render() {
    return null
  }

  componentDidCatch(error, info) {
    return <div>{error} : {info}</div>
  }

  bindEvents(events,mapInstance) {
    const list = Object.keys(events)
    list.length && list.forEach((evName) => {
      let instance = this[this.instanceName]
      instance
        .on(evName, (param) => {
          events[evName](param, instance)
        })
    })
  }

  exposeInstance() {

    if ('events' in this.props) {
      const events = this.props.events || {}
      if (isFun(events.created)) {
        events.created(this[this.instanceName],this.instanceName)
        delete events.created
      }
      return events
    }
    return false

  }

}

export default Base
