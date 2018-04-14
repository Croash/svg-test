import React,{ Component, Children } from 'react'
import isFun from '../utils/isFun'
import SVG from 'svg.js'

class Rect extends Component {
  
  constructor(props) {
    super(props)
    const { canvas } = props
    if (typeof window !== 'undefined') {
      if(canvas!=undefined) {
        this.parent = this.__parent__
        this.initialInstance()
      }
      else console.error('this')
    }
  }

  initialInstance() {
    const { __parent__ } = this.props
    this.instanceName = 'rect'
        
    if (this[this.instanceName]) {
      return new Promise((resolve) => {
        resolve(this[this.instanceName])
      })
    } else {
      return new Promise((resolve) => {
        
        this[this.instanceName] = this.parent[this.instanceName]()
        const events = this.exposeInstance(this.props)
        events && this.bindEvents(events)
        resolve(this[this.instanceName])

      })
    }

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

export default Rect
