import axios, { AxiosResponse } from "axios";
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
          { id: res.data.id, name: res.data.name, is_completed: res.data.is_completed },
          ...todos,
        ]);
      })
      .catch((error) => {
        console.log(error);
      });
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
      {todos.map((todo, key) => (
        <div key={key} style={{ display: "flex" }}>
          <div style={{ marginRight: "1rem" }}>{todo.id}</div>
          <div style={{ marginRight: "1rem" }}>{todo.name}</div>
          <input type="checkbox" defaultChecked={todo.is_completed} />
        </div>
      ))}
    </>
  );
};

export default TodoList;
