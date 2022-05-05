# Performance study and examples for React!

## Cases when a components needs to be re-rendered

- When a parent component has changed, all of its children will be re-rendered
- When a prop changes, a component will be re-rendered along with its children
- when something inside a hook is changed, the component will be re-rendered

## Rendering flow

1. Create a new version of the componente that needs to be re-rendered
2. Compare this new version with the old one
3. If something is outdated, React will re-render the new version on screen
   Obs: A new rendering flow will be started, but that doesn´t mean that the whole component will be replaced, only the components that had been changed will be updated.

## Tips:

-> Study React devtools extensions for browser to debug performance

## Memo (shallow compare) -> Check ProductItem component

- It´s a function that we put around a component
- It will basically negate the first step of the rendering flow, it nothing has changed for this component, then react wont create a new updated version of the component

### Arguments

1. The component itself
2. A function comparing previous props with the latest props, and we create a rule around it. If the function returns true, the component will be re-rendered, if not, nothing will happen.

### Cases to use

1.  Pure functional components

    1. Given the same arguments to the function, it will always return the same value.

2.  Renders too often

    1. For example, a component that has an input, meaning that everytime that we add a new character to the input, the component will re-render

3.  Re-renders with same props

    1. If a component re-renders often, but with same props

4.  Medium to big size components

    1. small components doesn´t to be checked because it wouldn´t be bad for performance to re-render it.

    ***

## useMemo -> check SearchResult component

- It is used when there´s a calculus, or a logic that could complex or could need a lot of memory, in this case we could use useMemo to save the previous value if none of the arguments that we had passed to useMemo had changed.

### Arguments

1.  The main logic that we want to prevent running
2.  dependencies array, same as useEffect, the logic will only be runned when an element from the dependecies array changes its value.

### Cases to use

1.  Heavy calculus/logic to get that result
2.  Reference Equality (when we need to pass on that result to a children component, preventing the child to re-render)

## useCallback -> Check Home component

- It is used when we want to memoize a **FUNCTION**, not a value, like useMemo.
- We don´t need to use useCallback when we think that a function has too much code to be re-rendered, it´s basically because of reference equality, meaning for example if we create a function inside a context, and we want to use that function in a component that´s inside the context, it could be a good idea.

### Arguments

1.  Function that we want to run
2.  depencies array that useCallback will only recreate this specific function if any of the elements values inside of that array changes.

### Cases to use

1. when we want to pass a function to other components ( prop drilling, contexts etc)

---

## Logic and Data Formating

- We always need to try to prevent complex logics inside a child component, because if something happens to the father, this logic will have to be remade. Sure, we can use a useMemo for that if we wanted to, but it would be simple to just leave this responsability to the father.

---

## Dynamic/Lazy Import ( Code Splitting ) -> check variable AddProductToWishList

- Normally, on React or next, when we run yarn build it will generate a folder with **ALL** the code that our app needs to run, so for example if we use x libraries, the generated bundle will generate a code importing all libraries.

- **BUT** sometimes there´s a code that will only be runned when the user take a specific action, for example clicking a button, opening a modal. So the modal will only be shown when a user clicks that button.

### What does that mean, and what we can do about it?

- So, on React we have a function called Lazy and a component Called Suspense. If we just want a component to be rendered when the user takes an action that involves that component, we can wrap that import inside the Lazy function. By doing that, we are saying to react that we only want that component to be rendered when the conditions for it to be rendered are met ( for example, checking if a state is true or false). To use Lazy we basicaclly need to wrap the component Suspense around it, to tell the application that we are waiting for the component to be build before we show it.
- On Next its the same thing, but we dont need to use suspense, because we already have a SSR application, not static. just import dynamic and do the same thing as we did with lazy.

## Virtualization --> SearchResults component (List component)

- Sometimes we have a lot a components and information inside of a page, and sometimes the user wouldn´t even look at the information that needs to be scrolled down, so for that we would want to render that specific component **ONLY** if the user goes to the location by scrolling for example.

- For that we can use a library instead of creating it by hand, one useful lib is react-virtualized

**OBS**: right now the react-virtualized does not support react v18, so for us to run without any problems require a previous version listed below:

"@types/react": "17.0.2",
"@types/react-dom": "17.0.2"

just put those 2 versions on your package.json and run a yarn command
