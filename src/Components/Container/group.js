import React,{ Component, Children } from 'react'
import SVG from 'svg.js'

class Group extends Component {

  constructor(props) {
    super(props)
    const { canvas } = props
    if(canvas!=undefined) {
      this.Initialize()
    }
    else console.error('this')
  }

  Initialize() {
    const { __parent__ } = this.props
    this.parent = this.__parent__
    this.group = this.parent['group']()
  }

  render() {
    return this.renderChildren()
  }

  renderChildren() {
    const childrenWithProps = Children.map(this.props.children,
      (child) => { 
        return React.cloneElement(child, { 
          ...this.props,
          __group__: this.group,
          __parent__: this.group
        })
      } 
    )
    return childrenWithProps
  }

  componentDidCatch(error, info) {
    return <div>{error} : {info}</div>
  }

}

export default Group
