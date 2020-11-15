import React, { useState, useReducer } from 'react';
import './App.css';
import Todo from './Todo';

export const ACTIONS = {
  ADD_TODO: 'add-todo',
  DELETE_TODO: 'delete-todo',
  TRIGGER_TODO: 'trigger-todo'
}

function reducer(todos, action) {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [...todos, newTodo(action.payload.name)]
    case ACTIONS.TRIGGER_TODO:
      return todos.map(todo => {
        if (todo.id === action.payload.id) {
          return {...todo,complete: !todo.complete }
        }
        return todo
      })
    case ACTIONS.DELETE_TODO:
      return todos.filter(todo => todo.id !== action.payload.id)
    default:
      return todos
  }
}

function newTodo(name) {
  return {id: Date.now(),name:name,comeplete:false}
}

export default function App() {
  const [todos,dispatch] = useReducer(reducer, [])
  const [name, setName] = useState('');

  function onSubmit(e) {
    e.preventDefault();
    console.log(name);
    dispatch({ type: ACTIONS.ADD_TODO, payload: { name: name } });
    setName('');
  }
  return (
    <div className="App">
      <h1>To do list</h1>
      <form  onSubmit={onSubmit}>
        <input type="text" onChange={(e)=>setName(e.target.value)} value={name}/>
      </form>
      {todos.map(todo => {  
        return <Todo todo={todo} dispatch={dispatch}/>
      })}
    </div>
  );
}

