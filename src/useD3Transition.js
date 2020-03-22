import {useRef, useEffect, useState} from 'react'
import {select as d3Select} from 'd3-selection';

const useD3AttrTransition = (attrsToTransitionTo, deps, attrsToTransitionFromInitially = null) => {
	const ref = useRef(null)
	const [attrState, setAttrState] = useState(attrsToTransitionFromInitially || attrsToTransitionTo)
	
	const callback = () => {
		if (!ref.current) return
		
		const element = d3Select(ref.current);
		const transition = element.transition().duration(1000)
		const attrNames = Object.keys(attrState)
		
		attrNames.forEach(attrName => {
			transition.attr(attrName, attrsToTransitionTo[attrName])
		})
		
		transition.on('end', () => {
			if (!ref.current) return
			setAttrState(
				attrNames.reduce(
					(accumulator, attrName) => (
						{
							...accumulator,
							[attrName]: attrsToTransitionTo[attrName],
						}
					),
					{}
				)
			)
		})
		return () => element.interrupt() // cleanup by ending transitions
	}
	
	useEffect(callback, deps)
	
	return {
		ref,
		attrState,
	}
}

export default useD3AttrTransition
