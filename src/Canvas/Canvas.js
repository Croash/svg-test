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
    return(<div ref={ref=>{ this.ref=ref }}>
      { this.state.loaded? this.renderChildren: null }
      </div>)
  }

  componentDidMount() {
    const { divName = 'drawing', attr = {} } = this.props
    this.canvas = SVG.draw(this.ref).attr(attr)
    this.setState({ loaded: true })
  }

  renderChildren() {
    const childrenWithProps = Children.map(this.props.children,
      (child) => { 
        return React.cloneElement(child, { 
          ...this.props,
          canvas: this.ref
        })
      } 
    )
    return childrenWithProps
  }

}

export default Canvas
