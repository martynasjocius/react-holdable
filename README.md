# React Holdable

`react-holdable` is a small and simple React component that allows you to have clickable elements that support both click and hold events.

## Installation

```
$ npm install react-holdable --save
```

## Usage

```js
import React, { Component } from 'react'
import Holdable from 'react-holdable'

export default class MyComponent extends Component {
  handleClick() {
    console.log('Clicked')
  }

  handleHold() {
    console.log('Hold')
  }

  render() {
    return (
      <Holdable
        onClickComplete={this.handleClick}
        onHoldComplete={this.handleHold}>
        <button>Click and hold me</button>
      </Holdable>
    )
  }
}
```

`react-holdable` supports both short click and longer hold events, so you can have buttons that behaves differently when clicked and hold.

When user clicks on a wrapped element (e.g. button), `onClickComplete` will be invoked.

When users clicks and holds for 1000 ms (this can be changed via `timeout` property), `onHoldComplete` will be invoked.

### Properties

* `onClickComplete`: short click handler.
* `onHoldComplete`: hold handler.
* `timeout`: timeout in miliseconds after which `onHoldComplete` handler should be invoked (default: 1000).

## Feedback and support

For questions and bug reports please refer to GitHub issues: https://github.com/martynasjocius/react-holdable/issues

Developed with 💖 by [jocius.net](https://jocius.net) for [tipihub.com](https://tipihub.com).
