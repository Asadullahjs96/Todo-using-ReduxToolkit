// import React, { useRef } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { addTodo, removeTodo } from '../config/redux-config/reducers/todoslice';

// const App = () => {
//   const todoRef = useRef();

//   //use Dispatch
//   const dispatch = useDispatch()

//   //use Selector
//   const selector = useSelector(state => state.todos);

//   const addTodoReducer = (event)=>{
//     event.preventDefault();
//     console.log(todoRef.current.value);
//     dispatch (addTodo({
//       title: todoRef.current.value
//     }))
//     console.log(selector);

//     todoRef.current.value = ''
//   }
  
//   const deleteTodo = (index)=>{
//     dispatch(removeTodo({
//       index: index
//     }))
//   }
//   return (
//     <>
//     <h1>React Todo</h1>
//     <form onSubmit={addTodoReducer}>
//       <input type="text" placeholder='enter Todo' ref={todoRef} />
//       <button type='submit'>AddTodo</button>
//     </form>
//     <ul>
//         {selector.map((item, index) => {
//           return <li key={item.id}>{item.title}
//           <button onClick={()=>deleteTodo(index)}>delete</button>
//           <button onClick={()=>startEditing(index)}>Edit</button>
          
//           </li>
//         })}

//       </ul>
//     </>
    
//   )
// }

// export default App




import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, removeTodo, editTodo } from '../config/redux-config/reducers/todoslice';
import './App.css'

const App = () => {
  const todoRef = useRef();
  const [editIndex, setEditIndex] = useState(null);

  // use Dispatch
  const dispatch = useDispatch();

  // use Selector
  const selector = useSelector(state => state.todos);

  const addTodoReducer = (event) => {
    event.preventDefault();
    const title = todoRef.current.value;

    if (editIndex !== null) {
      // If editing, dispatch editTodo action
      dispatch(editTodo({ index: editIndex, title }));
      setEditIndex(null); // Reset editIndex after editing
    } else {
      // If not editing, dispatch addTodo action
      dispatch(addTodo({ title }));
    }

    todoRef.current.value = ''; // Reset input field after editing or adding
  };

  const deleteTodo = (index) => {
    dispatch(removeTodo({
      index: index
    }));
  };

  const startEditing = (index) => {
    setEditIndex(index);
    todoRef.current.value = selector[index].title;
    todoRef.current.focus(); // Focus on the input field when starting to edit
  };

  return (
    <div className="app-container">
      <h1>React Todo</h1>
      <form onSubmit={addTodoReducer} className="form-container">
        <input type="text" placeholder='Enter Todo' ref={todoRef} className="todo-input" />
        <button type='submit' className="add-edit-button">{editIndex !== null ? 'Save Todo' : 'Add Todo'}</button>
      </form>
      <ul className="todo-list">
        {selector.map((item, index) => (
          <li key={item.id} className="todo-item">
            {editIndex === index ? (
              <input
                type="text"
                value={todoRef.current.value}
                onChange={(e) => (todoRef.current.value = e.target.value)}
                className="edit-input"
              />
            ) : (
              <span>{item.title}</span>
            )}
            <button onClick={() => deleteTodo(index)} className="delete-button">Delete</button>
            {editIndex === null && (
              <button onClick={() => startEditing(index)} className="edit-button">Edit</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
