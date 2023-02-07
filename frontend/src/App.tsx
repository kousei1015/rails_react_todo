import react, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import TodoList from './src/components/TodoList';
import TodoForm from './src/components/TodoForm';
import { Todo } from './model';


function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/todos')
    .then(res => {
      console.log(res.data)
      setTodos(res.data)
    })
  }, [])

  return (
    <div className="App">
      <TodoForm todos={todos} setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos}/>
    </div>
  )
}

export default App
