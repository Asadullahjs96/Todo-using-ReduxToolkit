import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, removeTodo } from '../config/redux-config/reducers/todoslice';

const App = () => {
  const todoRef = useRef();

  //use Dispatch
  const dispatch = useDispatch()

  //use Selector
  const selector = useSelector(state => state.todos);

  const addTodoReducer = (event)=>{
    event.preventDefault();
    console.log(todoRef.current.value);
    dispatch (addTodo({
      title: todoRef.current.value
    }))
    console.log(selector);

    todoRef.current.value = ''
  }
  
  const deleteTodo = (index)=>{
    dispatch(removeTodo({
      index: index
    }))
  }
  return (
    <>
    <h1>React Todo</h1>
    <form onSubmit={addTodoReducer}>
      <input type="text" placeholder='enter Todo' ref={todoRef} />
      <button type='submit'>AddTodo</button>
    </form>
    <ul>
        {selector.map((item, index) => {
          return <li key={item.id}>{item.title}
          <button onClick={()=>deleteTodo(index)}>delete</button>
          <button onClick={()=>startEditing(index)}>Edit</button>
          
          </li>
        })}

      </ul>
    </>
    
  )
}

export default App