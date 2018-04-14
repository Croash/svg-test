import React,{ Component, Children } from 'react'
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
    console.log(SVG)
    return(<div ref={ref=>{ this.ref=ref }}>
      { this.state.loaded? this.renderChildren: null }
      </div>)
  }

  componentDidMount() {
    const { divName = 'drawing', attr = {} } = this.props
    this.canvas = SVG(this.ref)
    this.setState({ loaded: true })
  }

  renderChildren() {
    const childrenWithProps = Children.map(this.props.children,
      (child) => { 
        return React.cloneElement(child, { 
          ...this.props,
          __canvas__: this.canvas,
          __parent__: this.canvas
        })
      } 
    )
    return childrenWithProps
  }

}

export default Canvas
