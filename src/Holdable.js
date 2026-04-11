(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('react'))
    module.exports.default = module.exports
    return
  }

  root.ReactHoldable = factory(root.React)
}(typeof globalThis !== 'undefined' ? globalThis : this, function(React) {
  function Holdable(props) {
    const activeRef = React.useRef(false)
    const holdTriggeredRef = React.useRef(false)
    const timerRef = React.useRef(null)
    const [isActive, setIsActive] = React.useState(false)

    const timeout = props.timeout || 1000

    const clearTimer = React.useCallback(() => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }, [])

    React.useEffect(() => clearTimer, [clearTimer])

    const stopEvent = React.useCallback((event) => {
      event.preventDefault()
      event.stopPropagation()
    }, [])

    const handlePressStart = React.useCallback((event) => {
      stopEvent(event)
      clearTimer()

      if (event.persist) {
        event.persist()
      }

      activeRef.current = true
      holdTriggeredRef.current = false
      setIsActive(true)

      timerRef.current = setTimeout(() => {
        if (!activeRef.current) {
          return
        }

        holdTriggeredRef.current = true
        clearTimer()

        if (props.onHoldComplete) {
          props.onHoldComplete(event)
        }
      }, timeout)
    }, [clearTimer, props, stopEvent, timeout])

    const handlePressEnd = React.useCallback((event) => {
      stopEvent(event)

      if (!activeRef.current) {
        return
      }

      activeRef.current = false
      setIsActive(false)
      clearTimer()

      if (!holdTriggeredRef.current && props.onClickComplete) {
        props.onClickComplete(event)
      }
    }, [clearTimer, props, stopEvent])

    const handlePressCancel = React.useCallback((event) => {
      stopEvent(event)

      if (!activeRef.current) {
        return
      }

      activeRef.current = false
      holdTriggeredRef.current = false
      setIsActive(false)
      clearTimer()
    }, [clearTimer, stopEvent])

    const classNames = [
      'holdable',
      props.className,
      isActive ? 'holdable-active' : null
    ].filter(Boolean).join(' ')

    return React.createElement(
      'div',
      {
        className: classNames,
        onPointerDown: handlePressStart,
        onPointerUp: handlePressEnd,
        onPointerCancel: handlePressCancel,
        onPointerLeave: handlePressCancel
      },
      props.children
    )
  }

  return Holdable
}))
