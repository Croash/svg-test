import React,{ Component, Children } from 'react'
import _ from 'lodash'
import SVG from 'svg.js'

class Canvas extends Component {

  constructor(props) {
    super(props)
    const { divName = 'drawing' } = props
    this.state = {
      loaded: false
    }
  }

  render() {
    return(<div ref={ref=>{ this.ref=ref }}>
      { this.state.loaded? this.renderChildren(): null }
      </div>)
  }

  componentDidMount() {
    const { divName = 'drawing', size = { width : 500, height : 300 } } = this.props
    this.canvas = SVG(this.ref).size(size.width,size.height)
    this.setState({ loaded: true })
  }

  componentDidUpdate() {
  }

  renderChildren() {
    const childrenWithProps = Children.map(this.props.children,
      (child) => { 
        return child!=null?React.cloneElement(child, { 
          ..._.omit(this.props,[ 'children' ]),
          __canvas__: this.canvas,
          __parent__: this.canvas,
          __parent__type__: 'canvas'
        }):null
      }
    )
    return childrenWithProps
  }

}

export default Canvas
