import React, { Component } from 'react'

export default class Holdable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      clickedAt: null
    }

    this.intervalId = null

    this.handleClick = this.handleClick.bind(this)
    this.handleFinish = this.handleFinish.bind(this)
  }

  handleClick(e) {
    e.persist()
    e.preventDefault()
    e.stopPropagation()

    this.setState({
      clickedAt: new Date()
    }, () => {
      this.intervalId = setInterval(() => {
        const timeDelta = new Date() - this.state.clickedAt
        const timeout = this.props.timeout || 1000

        if (this.state.clickedAt && timeDelta >= timeout) {
          this.handleFinish(e)
        }
      }, 100)
    })
  }

  handleFinish(e) {
    e.persist()
    e.preventDefault()
    e.stopPropagation()

    if (!this.state.clickedAt) {
      return
    }

    if (this.intervalId) {
      clearInterval(this.intervalId)
    }

    const timeDelta = new Date() - this.state.clickedAt
    const timeout = this.props.timeout || 1000

    if (timeDelta < timeout) {
      if (this.props.onClickComplete) {
        this.props.onClickComplete(e)
      }
    } else {
      if (this.props.onHoldComplete) {
        this.props.onHoldComplete(e)
      }
    }

    this.setState({
      clickedAt: null
    })
  }

  render() {
    const classNames = 'holdable' +
      (this.props.className ? ` ${this.props.className}` : '') +
      (this.state.clickedAt ? ' holdable-active' : '')

    return (
      <div
        className={classNames}
        onMouseDown={this.handleClick}
        onTouchStart={this.handleClick}
        onMouseUp={this.handleFinish}
        onTouchCancel={this.handleFinish}
        onTouchEnd={this.handleFinish}>
        {this.props.children}
      </div>
    )
  }
}
