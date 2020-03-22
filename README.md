[![npm version](http://img.shields.io/npm/v/use-d3-transition.svg?style=flat)](https://npmjs.org/package/REPO "View this project on npm")

# use-d3-transition
A custom React hook for transition element properties using D3. Do dynamic dataviz animations with clean, modern React (no fiddling with janky life cycle hooks !)

This hook was inspired by Swizec Teller's blogpost, [Declarative D3 transitions with React 16.3](https://swizec.com/blog/declarative-d3-transitions-react/swizec/8323)

### Installation

```sh
npm install use-d3-transition
```
or with yarn
```sh
yarn add use-d3-transition
```

### Example

```js
import React from 'react'
import useD3AttrTransition from 'useD3AttrTransition';


const TransitionableCircle = ({className, r, cx, cy, cxInitial, cyInitial, style, onMouseEnter, onMouseLeave}) => {
	const {ref, attrState} = useD3AttrTransition(
		{cx, cy},
		[cx, cy],
		{cx: cxInitial, cy: cyInitial}
	)
	
	return (
		<circle
			ref={ref}
			className={className}
			r={r}
			cx={attrState.cx}
			cy={attrState.cy}
			style={style}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		/>
	)
}

export default TransitionableCircle
```
