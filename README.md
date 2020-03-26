![use-d3-transition-gif](https://user-images.githubusercontent.com/6570507/77262989-17c41300-6c54-11ea-98f0-4d26ba500bdf.gif)

[![npm version](http://img.shields.io/npm/v/use-d3-transition.svg?style=flat)](https://npmjs.org/package/use-d3-transition "View this project on npm")

# use-d3-transition
A custom React hook for transition element properties using D3. Do dynamic dataviz animations with clean, modern React (no fiddling with janky life cycle hooks!)

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
	const {ref, attrState} = useD3Transition({
		attrsToTransitionTo: {cx, cy}, // attributes to transition to smoothly
		deps: [cx, cy], // hook dependencies (typically identical to the attributes to transition to)
	})
	
	return (
		<circle
			{...restOfTheAttributes}
			
			ref={ref}
			cx={attrState.cx}
			cy={attrState.cy}
			
			
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
| **deps** | Identical to React hooks deps (eg useState)| Array | optional (technically) |
| attrsToTransitionFromInitially | Sometimes, you might want all attributes to transition in from a specific value (eg transition circle radius in from 0). List that here for each transitioning property. <br> Form: `{ attributeName: attributeStartValue, ... }`  | Object | optional |
| duration | Transition duration, in ms | Number | optional |

## Technical Implementation

### TLDR: useD3Transition hands off updating the node's DOM attributes to D3 during the transition, then hands control back to React when the transition finishes.

### Practical example: transitioning a circle radius
Let's say we're updating the value of an SVG `circle`'s attribute `r` (radius) from 0 to 100. The initial value passedin is 0.

When the passed in `r` value flips from 0 to 100, useD3Transition 
1. uses D3 to select the `circle` DOM node it tracks via `ref`, and directly transitions its `r` property using D3
2. __immediately returns the old value for `r`__, in this case 0, via `attrState`, ignoring the updated value (!)
3. waits until the D3 transition finishes, _then_ sets `attrState.r` to be the updated value, in this case `100`. By waiting to do updates until after the transition, __`useD3Transition` wards off the impending React re-render__ while D3 handles transitioning the attribute `r`, then re-syncs the React element when it's finished transitioning.
