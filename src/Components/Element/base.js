import React,{ Component, Children } from 'react'
import isFun from '../utils/isFun'
import SVG from 'svg.js'

class Base extends Component {
  
  constructor(props) {
    super(props)
    const { __parent__ } = props
    if (typeof window !== 'undefined') {
      if(__parent__!=undefined) {
        this.parent = __parent__
        console.log('__parent__ defined')
        this.initialInstance()
      }
      else console.error('__parent__ undefined')
    }
  }

  initialInstance() {
    console.log('const')
    const { __parent__, __parent__type__, __canvas__: canvas } = this.props
    this.instanceName = this.initName()
    console.log('sgsg')
    // this.parent = __parent__
        
    if (this[this.instanceName]) {
      return new Promise((resolve) => {
        resolve(this[this.instanceName])
      })
    } else {
      return new Promise((resolve) => {
        console.log(this.parent)
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
    const { attr = { width : 100, height : 100, fill : 'blue' } } = this.props
    console.log('attr')
    this[this.instanceName].attr(attr)
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
      this[this.instanceName]
        .on(evName, events[evName])
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
