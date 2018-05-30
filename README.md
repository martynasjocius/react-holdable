# React Holdable

## Installation

```
$ npm install react-holdable --save
```

## Usage

```
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

When users clicks and holds for at least 200 ms, `onHoldComplete` will be invoked after 1000 ms (this can be changed via `timeout` property).

* **onClickComplete**: short click handler.
* **onHoldComplete**: hold handler.
* **timeout**: timeout in miliseconds after which `onHoldComplete` handler should be fired (default: 1000).
