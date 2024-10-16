import { createSlice, nanoid } from "@reduxjs/toolkit";

const todosSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push({
        id: nanoid(),
        text: action.payload,
        completed: false,
      });
    },
    toggleTodo: (state, action) => {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    removeTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
    editTodo: (state, action) => {
      const todo = state.find((todo) => todo.id == action.payload.id);
      if (todo) {
        todo.text = action.payload.newText;
      }
    },
  },
});

export const { addTodo, toggleTodo, removeTodo, editTodo } = todosSlice.actions;

export default todosSlice.reducer;
