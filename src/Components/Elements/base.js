import React,{ Component, Children } from 'react'
import isFun from '../utils/isFun'
import SVG from 'svg.js'

const situationDefault = [
  'delay',
  'during',
  'loop',
  'after'
]

const compose = (f,ins) => ins[f]


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

  animate({ attr = {}, config: { time = 1000 } }) {
    this[this.instanceName].animate(time).attr(attr)
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
        console.log('sgsgsggsg')
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
    const defAttr = { width : 100, height : 200, fill : 'blue' }
    const defAnim = { 
      config: { time:3000, easing:'<', delay: 100 }, 
      situation:{ during:()=>{ console.log('13') }, loop:[ 1, false ], delay:100, after:()=>{} }
    }
    const { initConfig : { initAttr=defAttr, initAnim } } = this.props
    console.log(initAttr)
    this[this.instanceName].attr(initAttr)
    console.log(this[this.instanceName])

    console.log(this[this.instanceName].loop)
    this.initAnim(this[this.instanceName],defAnim)
    
  }

  initAnim = (ins,aniConfig) => {
    const { config={ time:3000, easing:'<', delay: 0 }, situation } = aniConfig
    let newIns = ins
      .animate(config.time,config.easing,config.delay)
    situationDefault.map(sit=>{
      if(situation[sit]!=undefined) {
        console.log(sit,newIns[sit],situation[sit])
        if(sit=='loop') {
          newIns = newIns.loop(...situation[sit])
        }
        else newIns = newIns[sit](situation[sit])
      }
    })
    
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
