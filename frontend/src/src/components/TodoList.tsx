import axios from "axios";
import React, { useState } from "react";
import { Todo, TodosProps } from "../../model";
import { Wrapper, Row } from "./TodoListStyles";

const TodoList: React.FC<TodosProps> = ({ todos, setTodos }) => {

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
      <Wrapper background="tomato">
        <h1>完了済みのタスク</h1>
        {todos.map((todo, key) => (
          todo.is_completed &&
          <Row key={key}>
          <div style={{ marginRight: "1rem", fontWeight: 500 }}>{todo.name}</div>
          <button onClick={() => editTodo(todo.id as number)}>
            完了済に変更
          </button>
          <button onClick={() => deleteTodo(todo.id as number)}>
            削除
          </button>
        </Row>
        ))}
      </Wrapper>

      <Wrapper background="blue">
        <h1>未完了のタスク</h1>
        {todos.map((todo, key) => (
          todo.is_completed ||
          <Row key={key}>
          <div style={{ marginRight: "1rem", fontWeight: 500 }}>{todo.name}</div>
          <button onClick={() => editTodo(todo.id as number)}>
            未完了に変更
          </button>
          <button onClick={() => deleteTodo(todo.id as number)}>
            削除
          </button>
        </Row>
        ))}
      </Wrapper>
    </>
  );
};

export default TodoList;
