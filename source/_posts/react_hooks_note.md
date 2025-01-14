---
title: Simple React Hooks Note
date: 2023-12-02
tags: [React, Frontend, Programming]
---



Notes for React Hooks. 

<!--more-->



# General 

* Hooks can only be called at the top level of a function component or a custom hook. You can't call it inside loops or conditions. 
* In Strict Mode, React will call your calculation function twice in order to help you find accidental impurities. This is development-only behavior and does not affect production. 



# `useState` hook

## Syntax

```js
const [state, setState] = useState(initialState)
```

Calling the `set` function does not update the state variable in the already running code. To solve this problem, you may pass an updater function to `setState`. 

```js
function handleClick() {
  setState((prevCount) => prevCount + 1)
  setState((prevCount) => prevCount + 1)
  setState((prevCount) => prevCount + 1)
}
```

React will ignore your update if the next state is equal to the previous state, as determined by an `Object.is` comparison. This usually happens when you change an object or an array in state directly. 

## Update state objects

```js
const [state, setState] = useState({ name: 'Bob', age: 20 })

const changeName(newName) {
  setState({ ...state, name: newName })
}
```

## Slow initialization

In function components, the initial state computation is declared in the render function and happens every render. Having a slow initial state computation can slow down an entire application significantly. 

By passing a function version of the initial state, you will no longer run the slow computation each render, but only once on the first render of the component just like class components. 

```js
const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props)
  return initialState
})
```

# `useEffect` hook

## Syntax

```js
useEffect(() => {
  // effect
  return () => {
    // cleanup
  }
}, [dependencies])
```

## Usage


### Connecting to an external system

```js
function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://chat.example.com')

  useEffect(() => {
    const connection = new ChatConnection(serverUrl, roomId)
    connection.connect()

    return () => {
      connection.disconnect()
    }
  }, [roomId, serverUrl])

  // ...
}
```

When the `ChatRoom` component above gets added to the page, it will connect to the chat room with the initial `serverUrl` and `roomId`. If either `serverUrl` or `roomId` change as a result of a re-render, your effect will disconnect from the previous room, and connect to the next one. 

Try to write every effect as an independent process and think about a single setup/cleanup cycle at a time. 

An effect lets you keep your component synchronized with some external system. Here, external system means any piece of code that's not controlled by React. Such as:
* A timer managed with `setInterval()` and `clearInterval()`
* An event subscription using `addEventListener()` and `removeEventListener()`
* A third-party animation library with an API like `animation.start()` and `animation.stop()`

### Controlling a non-React widget

For example, if you have a third-part map widget or a video player component written without React, you can use an Effect to call methods on it that make its state match the current state of your React component. 

```js
function Map({ zoomLevel }) {
  const containerRef = useRef(null)
  const mapRef = useRef(null)

  useEffect(() => {
    if (mapRef.current === null) {
      mapRef.current = new MapWidget(containerRef.current)
    }

    const map = mapRef.current
    map.setZoom(zoomLevel)
  }, [zoomLevel])

  return <div ref={containerRef} />
}
```

### Fetching data with effects

You can use an effect to fetch data for your component. Note that if you use a framework, using your framework's data fetching mechanism will be a lot more efficient that writing effects manually. 

### Updating state based on previous state from an effect

```js
function Counter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevCount) => prevCount + 1)
    }, 1000)
    return () => clearInterval(intervalId)
  }, [])
}
```

### Run after every render

```js
useEffect(() => {
  // effect
})
```

### When to use `useEffect`?

The useEffect hook is for effects that are caused by the component being mounted or updated.

If you want to pass state or data to the parent, better to use a callback function instead of do it in the effect. 

# `useMemo` hook

## Syntax

```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b])
```

## Usage

### Referential equality

```js
function Component({ param1, param2 }) {
  const params = useMemo(() => [param1, param2], [param1, param2])

  useEffect(() => {
    console.log(params[0], params[1])
  }, [params])
}
```

Now if `param1` or `param2` changes, the effect will run. 


# `useCallback` hook

## Syntax

```js
const memoizedCallback = useCallback(() => {
  doSomething(a, b)
}, [a, b])
```

## Usage

### Referential equality

```js
function Parent() {
  const [items, setItems] = useState([])
  const handleLoad = useCallback((data) => {
    setItems(data.items)
  }, [])

  return <Child onLoad={handleLoad} />
}

function Child({ onLoad }) {
  useEffect(() => {
    fetch('/data').then((response) => {
      response.json().then((data) => {
        onLoad(data)
      })
    })
  }, [onLoad])

  return null
}
```


# `useRef` hook

## Syntax

```js
const refContainer = useRef(initialValue)

refContainer.current = newValue
```

When you change the `ref.current` property, React does not re-render your component. Do not write or read `ref.current` during rendering, except for initialization. 

## Usage

### Refenrencing DOM elements

The most common use case for refs in React is to reference a DOM element. 

```js
function Component() {
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  return <input ref={inputRef} />
}
```


### Keeping mutable values around

Another common use case is to store the previous value of a state variable:

```js
function Counter() {
  const [count, setCount] = useState(0)
  const prevCountRef = useRef()

  useEffect(() => {
    prevCountRef.current = count
  }, [count])

  const prevCount = prevCountRef.current

  return (
    <h1>
      Now: {count}, before: {prevCount}
    </h1>
  )
}
```

### Avoiding recreating the ref contents

```js
function Video() {
  const playerRef = useRef(null)
  if (!playerRef.current) {
    playerRef.current = new Player()
  }
}
```

# `useContext` hook

## Syntax


```js
const ThemeContext = React.createContext(defaultValue)

function App() {
  const [theme, setTheme] = useState('light')

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ChildComponent />
    </ThemeContext.Provider>
  )
}

function ChildComponent() {
  return <GrandChildComponent />
}

function GrandChildComponent() {
  const { theme, setTheme } = useContext(ThemeContext)

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Change Theme
    </button>
  )
}
```

## Optimizing re-renders when passing objects and functions

```js
function MyApp() {
  const [currentUser, setCurrentUser] = useState(null)

  const login = useCallback((response) => {
    storeCredentials(response.credentials)
    setCurrentUser(response.user)
  }, [])

  const contextValue = useMemo(() => 
    ({ currentUser, login }), 
    [currentUser, login])

  return (
    <AuthContext.Provider value={contextValue}>
      <Header />
      <Main />
    </AuthContext.Provider>
  )
}
```

# `useReducer` hook

## Syntax

```js
const [state, dispatch] = useReducer(reducer, initialArg, init)
```

## Usage

### Simple counter

```js
const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    default:
      throw new Error()
  }
}

const [count, dispatch] = useReducer(reducer, 0)

return (
  <>
    Count: {count}
    <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    <button onClick={() => dispatch({ type: 'increment' })}>+</button>
  </>
)
```



# `useLayoutEffect` hook

## Syntax

```js
useLayoutEffect(() => {
  // effect
  return () => {
    // cleanup
  }
}, [dependencies])
```

The syntax of `useLayoutEffect` is identical to `useEffect`, but it fires synchronously after all DOM mutations. Use this to read layout from the DOM and synchronously re-render. Updates scheduled inside `useLayoutEffect` will be flushed synchronously, before the browser has a chance to paint.

Prefer the standard `useEffect` when possible to avoid blocking visual updates.

## Usage

### Measuring layout before the browser repaints the screen

```js 
function Tooltip() {
  const ref = useRef()
  const [tooltipHeight, setTooltipHeight] = useState(0)

  useLayoutEffect(() => {
    setTooltipHeight(ref.current.getBoundingClientRect().height)
  }, [])

  // ...
}
```


# `useId` hook

## Syntax

```js
const id = useId()
```

## Usage

### Generate a unique ID

```js
function Component() {
  const id = useId()

  return <div id={id} />
}
```

# `useImperativeHandle` hook 

## `forwardRef` function

`forwardRef` is a higher order component that takes a component as its first argument and returns a new component that forwards the ref to the component it wraps. 

```js
const FancyInput = React.forwardRef((props, ref) => {
  return <input ref={ref} />
})
```

## `useImperativeHandle` syntax

```js
const ref = useRef()

useImperativeHandle(ref, createHandle, [deps])
```

* `ref`: An `ref` you received as the second argument from the `forwardRef` call.
* `createHandle`: A function that takes no arguments and returns the ref handle you want to expose. That ref handle can have any type. Usually, you will return an object with the methods you want to expose. 
* `dependencies`: The list of all reactive values referenced inside of the `createHandle` function.

## Usage

### Expose imperative methods to parent components

```js
function FancyInput(props, ref) {
  const inputRef = useRef()
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus()
    },
  }))
  return <input ref={inputRef} />
}

FancyInput = forwardRef(FancyInput)
```

In parent component

```js
function Parent() {
  const inputRef = useRef()
  return (
    <>
      <FancyInput ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>Focus</button>
    </>
  )
}
```

# `useSyncExternalStore` hook

## Syntax

```js
import { todosStore } from './todoStore.js'

function Todos() {
  useSyncExternalStore(todosStore.subscribe, todosStore.getSnapshot)

  // ...
}
```

The `subscribe` function should subscribe to the store and return a function that unsubscribes. The `getSnapshot` function should return the current state of the store. The store snapshot returned by `getSnapshot` must be immutable. 

The store snapshot returned by `getSnapshot` must be immutable. If the underlying store has mutable data, return a new immutable snapshot if the data has changed. Otherwise, return a cached last snapshot.

If a different `subscribe` function is passed during a re-render, React will re-subscribe to the store using the newly passed `subscribe` function. You can prevent this by declaring `subscribe` outside the component.

If the store is mutated during a non-blocking transition update, React will fall back to performing that update as blocking. Specifically, for every transition update, React will call `getSnapshot` a second time just before applying changes to the DOM. If it returns a different value than when it was called originally, React will restart the update from scratch, this time applying it as a blocking update, to ensure that every component on screen is reflecting the same version of the store.

## Usage

### Subscribing to an external store

```js
import { todosStore } from './todoStore.js'

function Todos() {
  const todos = useSyncExternalStore(todosStore.subscribe, todosStore.getSnapshot);
}
```

1. The `subscribe` function should subscribe to the store and return a function that unsubscribes.
2. The `getSnapshot` function should read a snapshot of the data from the store.

React will use these functions to keep your component subscribed to the store and re-render it on changes.

### Subscribing to a browser API

```js
import { useSyncExternalStore } from 'react'

export default function ChatIndicator() {
  const isOline = useSyncExternalStore(subscribe, getSnapshot)
  return <h1>{isOnline ? 'Online' : 'Offline'}</h1>
}

function getSnapshot() {
  return navigator.onLine
}

function subscribe(listener) {
  window.addEventListener('online', listener)
  window.addEventListener('offline', listener)
  return () => {
    window.removeEventListener('online', listener)
    window.removeEventListener('offline', listener)
  }
}
```

# `useDeferredValue` hook

Comes with React 18. `useDeferredValue` is a hook that lets you defer updating a part of the UI. 


## Syntax

```js
const deferredValue = useDeferredValue(value)
```

During the initial render, the returned deferred value will be the same as the value you provided. During updates, React will first attempt a re-render with the old value, and then try another re-render in background with the new value. 

## Usage

### Avoiding jank

```js
function App() {
  const [text, setText] = useState('');
  const deferredText = useDeferredValue(text);
  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      <SlowList text={deferredText} />
    </>
  );
}
```


### Indicating that the content is stale

```js
<div style={{
  opacity: query !== deferredQuery ? 0.5 : 1,
}}>
  <SearchResults query={deferredQuery} />
</div>
````


# `useTransition` hook

Comes with React 18. `useTransition` is a hook that lets you update the state without blocking the UI. This works like `useMemo`, but the value is computed asynchronously. 

## Syntax

```js
const [isPending, startTransition] = useTransition()
```

1. `isPending`: A boolean that is true if there is a pending transition.
2. `startTransition`: A function that lets you mark a state update as a transition.


## Usage

### Avoiding jank

```js
export default function TabButton({ children, isActive, onClick }) {
  const [isPending, startTransition] = useTransition();
  if (isActive) {
    return <b>{children}</b>
  }
  return (
    <button onClick={() => {
      startTransition(() => {
        onClick();
      });
    }}>
      {children}
    </button>
  );
}
```


# The power of custom hooks

## How to make a custom hook?

The custom hooks are just functions that start with `use` at the beginning of their name. They can use other hooks inside them.

## For example, `useLocalStorage` hook

The custom hook:

```js
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key)
    if (jsonValue != null) return JSON.parse(jsonValue)
    return initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
```

Usage:

```js
const [name, setName] = useLocalStorage('name', 'Bob')
```

## Another example, `useArray` hook

The custom hook:

```js
export default function useArray(initialValue) {
  const [value, setValue] = useState(initialValue)

  return {
    value, 
    setValue,
    add: useCallback((item) => {
      setValue((v) => [...v, item])
    }, []),
    clear: useCallback(() => setValue(() => []), []),
    removeById: useCallback((id) => {
      setValue((arr) => arr.filter((v) => v && v.id !== id))
    }, []),
  }
}
```


# References

- [React Hooks](https://reactjs.org/docs/hooks-intro.html)
- [Web Dev Simplified Blog](https://blog.webdevsimplified.com/)
- [Github](https://www.github.com)

