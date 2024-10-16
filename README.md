### Overview of React Redux Toolkit

**Redux Toolkit** is the official recommended way to write Redux logic. It provides a set of tools and best practices to simplify Redux development, making it easier to manage the global state in React applications.

### Key Features

- **Simplified Store Setup**: Creates a Redux store with sensible defaults.
- **Automatic Immutability**: Uses Immer to enable mutable-style updates.
- **Slice Reducers**: Organizes logic for a specific part of the state.
- **Built-in Middleware**: Includes Redux Thunk for handling asynchronous logic.

## Basic concepts:

1. **`configureStore()`**: A helper that simplifies the store setup by combining reducers, adding middleware, and enabling Redux DevTools by default.
2. **Slices**: A `slice` is a part of the Redux state, created using `createSlice()`, which automatically generates actions and reducers in one go.
3. **Actions and Reducers**: Redux Toolkit uses `createSlice()` to bundle actions and reducers together for easier management.
4. **Thunk Middleware**: It includes `redux-thunk` for handling asynchronous actions.
5. **Immutability**: It leverages `Immer` to simplify immutable state updates by allowing mutable operations.

---

### Example: Todo Application

Here’s a simple example demonstrating how to set up a Todo application using Redux Toolkit.

### Step 1: Install Dependencies

Make sure you have `@reduxjs/toolkit` and `react-redux` installed:

```bash
npm install @reduxjs/toolkit react-redux
```

### Step 2: Create a Todo Slice

Create a `slice` to manage todos:

```jsx
// features/todosSlice.js
import { createSlice } from '@reduxjs/toolkit';

const todosSlice = createSlice({
    name: 'todos',
    initialState: [],
    reducers: {
        addTodo: (state, action) => {
            state.push({ id: Date.now(), text: action.payload, completed: false });
        },
        toggleTodo: (state, action) => {
            const todo = state.find(todo => todo.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
        removeTodo: (state, action) => {
            return state.filter(todo => todo.id !== action.payload);
        }
    }
});

export const { addTodo, toggleTodo, removeTodo } = todosSlice.actions;
export default todosSlice.reducer;
```

### Step 3: Configure the Store

Set up the Redux store:

```jsx
// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../features/todosSlice';

const store = configureStore({
    reducer: {
        todos: todosReducer,
    },
});

export default store;

```

### Step 4: Set Up the Provider

Wrap your application with the Redux Provider:

```jsx
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './app/store';
import App from './App';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

```

### Step 5: Create Todo Components

Now, you can create components to manage todos:

```jsx
// App.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, toggleTodo, removeTodo } from './features/todosSlice';

function App() {
    const [inputValue, setInputValue] = useState('');
    const todos = useSelector(state => state.todos);
    const dispatch = useDispatch();

    const handleAddTodo = () => {
        if (inputValue.trim()) {
            dispatch(addTodo(inputValue));
            setInputValue('');
        }
    };

    return (
        <div>
            <h1>Todo App</h1>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Add a todo"
            />
            <button onClick={handleAddTodo}>Add Todo</button>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                        {todo.text}
                        <button onClick={() => dispatch(toggleTodo(todo.id))}>Toggle</button>
                        <button onClick={() => dispatch(removeTodo(todo.id))}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;

```

### Conclusion

Redux Toolkit streamlines the setup and management of Redux state. In this Todo example, you saw how to create slices for actions and reducers, configure the store, and connect the Redux state to React components, simplifying state management in your application.
