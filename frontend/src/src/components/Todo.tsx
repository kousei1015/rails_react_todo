import axios from "axios";
import React, { useState } from "react";
import { Todo, TodosProps } from "../../model";

const TodoList: React.FC<TodosProps> = ({ todos, setTodos }) => {
  const [nameInput, setNameInput] = useState("");

  const addTodo = () => {
    const packet = {
      name: nameInput,
    };

    axios
      .post<Todo>("http://localhost:3000/api/v1/todos", packet)
      .then((res) => {
        setTodos([
          {
            id: res.data.id,
            name: res.data.name,
            is_completed: res.data.is_completed,
          },
          ...todos,
        ]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editTodo = (id: number) => {
    const selectedTodo = todos.find((todo) => todo.id === id);
    const packet = {
      is_completed: !selectedTodo?.is_completed,
    };
    axios
      .put<Todo>(`http://localhost:3000/api/v1/todos/${id}`, packet)
      .then((res) => {
        setTodos([
          ...todos.map((todo) => (todo.id === res.data.id ? res.data : todo)),
        ]);
      })
      .catch((error) => console.log(error));
  };

  const deleteTodo = (id: number) => {
    const selectedTodo = todos.find((todo) => todo.id === id);
    axios
      .delete(`http://localhost:3000/api/v1/todos/${id}`)
      .then((res) => setTodos(todos.filter((todo) => todo.id !== id)));
  };

  return (
    <>
      <h1>TodoList</h1>
      <input
        type="text"
        value={nameInput}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setNameInput(e.target.value);
        }}
      />
      <button onClick={addTodo}>追加</button>
      <div style={{background: "tomato", padding: "1rem"}}>
        <h1>完了済みのタスク</h1>
        {todos.map((todo, key) => (
          todo.is_completed &&
          <div key={key} style={{ display: "flex", alignItems: "center"}}>
          <div style={{ marginRight: "1rem" }}>{todo.name}</div>
          <button onClick={() => editTodo(todo.id as number)}>
            完了済に変更
          </button>
          <button onClick={() => deleteTodo(todo.id as number)}>
            削除
          </button>
        </div>
        ))}
      </div>

      <div style={{background: "blue", padding: "1rem"}}>
        <h1>未完了のタスク</h1>
        {todos.map((todo, key) => (
          todo.is_completed ||
          <div key={key} style={{ display: "flex", alignItems: "center"}}>
          <div style={{ marginRight: "1rem" }}>{todo.name}</div>
          <button onClick={() => editTodo(todo.id as number)}>
            未完了に変更
          </button>
          <button onClick={() => deleteTodo(todo.id as number)}>
            削除
          </button>
        </div>
        ))}
      </div>
    </>
  );
};

export default TodoList;
