import React from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render } from '@testing-library/react'
import Holdable from './Holdable'

describe('Holdable', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    cleanup()
    vi.useRealTimers()
  })

  it('calls onClickComplete for a short press', () => {
    const onClickComplete = vi.fn()
    const onHoldComplete = vi.fn()
    const { container } = render(
      React.createElement(
        Holdable,
        { onClickComplete, onHoldComplete, timeout: 500 },
        React.createElement('button', { type: 'button' }, 'Press')
      )
    )

    const target = container.firstChild

    fireEvent.pointerDown(target)
    vi.advanceTimersByTime(499)
    fireEvent.pointerUp(target)

    expect(onClickComplete).toHaveBeenCalledTimes(1)
    expect(onHoldComplete).not.toHaveBeenCalled()
  })

  it('calls onHoldComplete for a long press', () => {
    const onClickComplete = vi.fn()
    const onHoldComplete = vi.fn()
    const { container } = render(
      React.createElement(
        Holdable,
        { onClickComplete, onHoldComplete, timeout: 500 },
        React.createElement('button', { type: 'button' }, 'Press')
      )
    )

    const target = container.firstChild

    fireEvent.pointerDown(target)
    vi.advanceTimersByTime(500)
    fireEvent.pointerUp(target)

    expect(onHoldComplete).toHaveBeenCalledTimes(1)
    expect(onClickComplete).not.toHaveBeenCalled()
  })

  it('cancels the gesture without firing click or hold', () => {
    const onClickComplete = vi.fn()
    const onHoldComplete = vi.fn()
    const { container } = render(
      React.createElement(
        Holdable,
        { onClickComplete, onHoldComplete, timeout: 500 },
        React.createElement('button', { type: 'button' }, 'Press')
      )
    )

    const target = container.firstChild

    fireEvent.pointerDown(target)
    fireEvent.pointerCancel(target)
    vi.advanceTimersByTime(500)

    expect(onClickComplete).not.toHaveBeenCalled()
    expect(onHoldComplete).not.toHaveBeenCalled()
  })
})
