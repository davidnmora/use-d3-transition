import { useRef, useEffect, useState } from 'react'
import { select as d3Select } from 'd3-selection'
import 'd3-transition'

interface StringIndexedObject { [key: string]: any; }

const DEFAULT_TRANSITION_DURATION = 800

const useD3Transition = ({
  attrsToTransitionTo,
  deps,
  attrsToTransitionFromInitially,
  duration,
  easingFunction,
} : {
  attrsToTransitionTo: StringIndexedObject,
  deps?: Array<any>,
  attrsToTransitionFromInitially?: StringIndexedObject,
  duration?: number,
  easingFunction?: Function,
}) : StringIndexedObject => {
  const ref = useRef(null)
  const [attrState, setAttrState] = useState(
    attrsToTransitionFromInitially || attrsToTransitionTo
  )

const executeD3Transition = (): VoidFunction | void => {
    if (!ref.current) return

    const element = d3Select(ref.current)
    const transition = element
      .transition()
      .duration(
        typeof duration === 'number' ? duration : DEFAULT_TRANSITION_DURATION
      )

    if (easingFunction) {
      // @ts-ignore
      transition.ease(easingFunction)
    }

    const attrNames = Object.keys(attrState)

    attrNames.forEach((attrName) => {
      transition.attr(attrName, attrsToTransitionTo[attrName])
    })

    transition.on('end', () => {
      if (!ref.current) return
      setAttrState(attrNames)
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
