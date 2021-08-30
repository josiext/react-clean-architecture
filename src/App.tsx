import { useState } from "react";

import { ITodo } from "entities/todo";
import Todo from "application/useCases/todo";
import "./App.css";

export default function App() {
  const [todoList, setTodoList] = useState<ITodo[]>([]);
  const [todoForm, setTodoForm] = useState<{ description: string } | null>(
    null
  );

  const handleCreateTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!todoForm) return;

    const newTodo = new Todo({
      description: todoForm.description,
      state: "pending",
    });

    await newTodo.save();

    setTodoList([...todoList, newTodo.content]);

    setTodoForm(null);
  };

  const handleRemove = (todo: ITodo) => {
    // TODO
  };

  return (
    <div className="App">
      <h1>ToDo</h1>
      <form onSubmit={handleCreateTodo}>
        <label>
          Description
          <input
            onChange={(e) => setTodoForm({ description: e.target.value })}
            value={todoForm?.description || ""}
          />
        </label>
        <button>Create</button>
      </form>

      <div>
        {todoList.map((todo) => (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <p>{todo.description}</p>
            <button onClick={() => handleRemove(todo)}>X</button>
          </div>
        ))}
      </div>
    </div>
  );
}
