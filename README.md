# React Holdable

`react-holdable` is a small and simple React component that allows you to have clickable elements that support both click and hold events.

React does not provide a built-in hold or long-press event, so this package keeps that behavior as a tiny wrapper component without any build step.

## Installation

```bash
npm install react-holdable
```

## Usage

```js
import React from 'react'
import Holdable from 'react-holdable'

export default function MyComponent() {
  return (
    <Holdable
      onClickComplete={() => console.log('Clicked')}
      onHoldComplete={() => console.log('Hold')}>
      <button>Click and hold me</button>
    </Holdable>
  )
}
```

`react-holdable` supports both short click and longer hold events, so you can have buttons that behaves differently when clicked and hold.

When user clicks on a wrapped element (e.g. button), `onClickComplete` will be invoked.

When users clicks and holds for 1000 ms (this can be changed via `timeout` property), `onHoldComplete` will be invoked.

### Properties

* `onClickComplete`: short click handler.
* `onHoldComplete`: hold handler.
* `timeout`: timeout in milliseconds after which `onHoldComplete` is invoked (default: `1000`).
* `className`: extra classes passed to the wrapper element.

## Local Demo

For manual testing, open [examples/index.html](./examples/index.html) in a browser through a simple local server. The `examples/` directory is for development only and is not included in the npm package.

## Feedback and support

For questions and bug reports please refer to GitHub issues: https://github.com/martynasjocius/react-holdable/issues
