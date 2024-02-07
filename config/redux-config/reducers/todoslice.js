import { createSlice, nanoid } from "@reduxjs/toolkit";


export const todoSlice = createSlice({
    name: 'Todos',
    initialState: {
        todos: [{
            title: 'Hello world',
            id: 1
        }]

    },
    reducers: {
        addTodo: (state, action) => {
            state.todos.push({
                title: action.payload.title,
                id: nanoid()
            })
        },
        removeTodo: (state, action) => {
            state.todos.splice(action.payload.index, 1)
        },
        editTodo: (state, action) => {
            const { index, title } = action.payload;
            state.todos[index].title = title;
        }

    }
})


export const { addTodo, removeTodo, editTodo } = todoSlice.actions
export default todoSlice.reducer;