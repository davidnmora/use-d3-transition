![use-d3-transition-gif](https://user-images.githubusercontent.com/6570507/77262989-17c41300-6c54-11ea-98f0-4d26ba500bdf.gif)

[![npm version](http://img.shields.io/npm/v/use-d3-transition.svg?style=flat)](https://npmjs.org/package/use-d3-transition "View this project on npm")

# use-d3-transition: _React animations with 1 line of code_ 
A custom React hook for D3 animations. Perfect for hefty data visualization projects. Or when you just need a quick animation.

No refactors. No messy class-based lifecycle hooks. Just dynamic animations and clean, modern React. :sunglasses: 

##### [Try it in CodeSandbox](https://codesandbox.io/s/use-d3-transitions-circle-demo-1jhk1). :pencil: [Or read the juicy details on Medium](https://medium.com/@davidnmora/d3-animations-in-react-with-1-line-of-code-976396a45ede). :open_book: 

Inspired by [Swizec Teller's blogpost.](https://swizec.com/blog/declarative-d3-transitions-react/swizec/8323)

### Installation

```sh
npm install use-d3-transition
# or yarn:
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

| property | description | type | default | required?  |
|-|-|-|-|-|
| **attrsToTransitionTo** | All the attributes you want to smoothly transition. <br> Form: `{ attributeName: attributeEndValue, ... }`| Object | - | required |
| **deps** | Identical to `deps` parameter in other React hooks (eg `useMemo`, `useEffect`)| Array | - | optional (technically) |
| attrsToTransitionFromInitially | Sometimes, you might want all attributes to transition in from a specific value <br>(eg transition circle radius in from 0).<br> List those start values here for each transitioning property. <br> Form: `{ attributeName: attributeStartValue, ... }`  | Object | `attrsToTransitionTo` | optional |
| duration | Transition duration, in ms | Number | 800 | optional |
| easingFunction | [A D3 easing function](https://github.com/d3/d3-ease) to fine tune the transition's progression | Function | [d3.easeCubic](https://github.com/d3/d3-ease#easeCubic) | optional |
