[![npm version](http://img.shields.io/npm/v/use-d3-transition.svg?style=flat)](https://npmjs.org/package/use-d3-transition "View this project on npm")

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
import useD3Transition from 'use-d3-transition'


export const TransitionableCircle = ({cx, cy, ...restOfTheAttributes}) => {
	const {ref, attrState} = useD3Transition(
		{cx, cy}, // attributes to transition to smoothly
		[cx, cy], // hook dependencies (typically identical to the attributes to transition to)
	)
	
	return (
		<circle
			ref={ref}
			cx={attrState.cx}
			cy={attrState.cy}
			
			{...restOfTheAttributes}
		/>
	)
}

```

Now you can use that component as you would a native SVG or HTML element, and the component will automatically transition itself between attribute changes.

```html
<TransitionableCircle
	className={'my-transitioning-circle'}
	r={42}
	cx={updatingXValue}
	cy={updatingYValue}
/>
```

## API
| property | description | type   | default  |
|-|-|-|-|
| **attrsToTransitionTo** | All the attributes you want to smoothly transition. <br> Form: `{ attributeName: attributeEndValue, ... }`| Object | required |
| **deps** | Identical to React hooks deps (eg useState)| Array  | optional (technically) |
| attrsToTransitionFromInitially | Sometimes, you might want all attributes to transition in from a specific value (eg transition circle radius in from 0). List that here for each transitioning property. <br> Form: `{ attributeName: attributeStartValue, ... }`  | Object | optional |
