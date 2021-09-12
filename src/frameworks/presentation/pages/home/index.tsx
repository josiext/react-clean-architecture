import { useState, useEffect } from "react";

import { ITodo } from "entities/todo";
import * as TodoUseCases from "application/todo";

export default function Home() {
  const [todoList, setTodoList] = useState<ITodo[]>([]);
  const [todoForm, setTodoForm] = useState<{ description: string } | null>(
    null
  );

  useEffect(() => {
    new TodoUseCases.GetAllTodo().execute().then(setTodoList);
  }, []);

  const handleCreateTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!todoForm) return;

    const newTodo = await new TodoUseCases.CreateTodo().execute({
      description: todoForm.description,
      state: "pending",
    });

    const todo = await new TodoUseCases.SaveTodo().execute(newTodo);

    setTodoList([...todoList, todo]);
    setTodoForm(null);
  };

  const handleRemove = async (todoToRemove: ITodo) => {
    if (todoToRemove.id)
      await new TodoUseCases.RemoveTodo().execute(todoToRemove.id);

    const newTodoList = todoList.filter((todo) => todo.id !== todoToRemove.id);
    setTodoList(newTodoList);
  };

  const handleCompletTodo = async (todoToComplete: ITodo) => {
    if (todoToComplete.id) {
      const x = await new TodoUseCases.CompleteTodo().execute(todoToComplete);
      const newList = await new TodoUseCases.GetAllTodo().execute();
      setTodoList(newList);
    }
  };

  return (
    <main className="App">
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
          <div
            style={{ display: "flex", justifyContent: "center" }}
            key={todo.id}
          >
            <p>
              {todo.state === "completed" ? (
                <s>{todo.description}</s>
              ) : (
                todo.description
              )}
            </p>
            <button onClick={() => handleCompletTodo(todo)}>✓</button>
            <button onClick={() => handleRemove(todo)}>×</button>
          </div>
        ))}
      </div>
    </main>
  );
}
