import logo from './logo.svg';
import './App.css';
import { useState, useRef, useEffect } from "react";
import TodoList from './TodoList';
import * as uuid from "uuid";



function App() {


  const LOCAL_STORAGE_KEY = 'todoApp.todos'

  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef()


  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])


  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }


  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuid.v4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
  <>
    <header className="App-header">

      <TodoList todos={todos} toggleTodo={toggleTodo}  />
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodos}>Clear Complete</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </header>
  
  </>
  )
}

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <div>
  //         <TodoList todos={todos}/>
  //         <input type='text'
  //         value={name}
  //         onChange={(e) => setName(e.target.value)}
  //         />
  //         <button onClick={handleAddTodo}>CLick!</button>
  //       </div>
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
// }

export default App;
