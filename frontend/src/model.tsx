import React from "react";

export type Todo = {
  id?: number;
  name: string;
  is_completed: boolean;
}

export type TodosProps = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

