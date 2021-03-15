import { useRef, useEffect, useState } from 'react'
import { select as d3Select } from 'd3-selection'
import 'd3-transition'

const DEFAULT_TRANSITION_DURATION = 800

const useD3Transition = ({
  attrsToTransitionTo,
  deps,
  attrsToTransitionFromInitially = null,
  duration = null,
  easingFunction = null,
}) => {
  const ref = useRef(null)
  const [attrState, setAttrState] = useState(
    attrsToTransitionFromInitially || attrsToTransitionTo
  )

  const executeD3Transition = () => {
    if (!ref.current) return

    const element = d3Select(ref.current)
    const transition = element
      .transition()
      .duration(
        typeof duration === 'number' ? duration : DEFAULT_TRANSITION_DURATION
      )

    if (easingFunction) {
      transition.ease(easingFunction)
    }

    const attrNames = Object.keys(attrState)

    attrNames.forEach((attrName) => {
      transition.attr(attrName, attrsToTransitionTo[attrName])
    })

    transition.on('end', () => {
      if (!ref.current) return
      setAttrState(attrsToTransitionTo)
    })
    return () => element.interrupt() // cleanup by ending transitions
  }

  useEffect(executeD3Transition, deps)

  return {
    ref,
    attrState,
  }
}

export default useD3Transition
