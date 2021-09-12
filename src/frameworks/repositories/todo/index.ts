import { v4 as uuidv4 } from "uuid";

import { ITodo } from "entities/todo";

const TODO_STORAGE_KEY = "todos";

export const persist = async (todo: ITodo): Promise<ITodo> => {
  const todoList = await getAll();
  const newTodo = { ...todo, id: uuidv4() };
  const newTodoList = [...todoList, newTodo];
  localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify({ list: newTodoList }));
  return newTodo;
};

export const update = async (
  id: string,
  data: Partial<ITodo>
): Promise<ITodo | undefined> => {
  const todoList = await getAll();
  const todoToUpdate = todoList.find((item) => item.id === id);
  if (!todoToUpdate) return undefined;

  const todoUpdated = { ...todoToUpdate, ...data };
  const newTodoList = todoList.map((item) =>
    item.id === id ? todoUpdated : item
  );
  localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify({ list: newTodoList }));
  return todoUpdated;
};

export const remove = async (id: string): Promise<ITodo | undefined> => {
  const todoList = await getAll();
  const todoToRemove = todoList.find((item) => item.id === id);
  const newTodoList = todoList.filter((item) => item.id !== id);
  localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify({ list: newTodoList }));
  return todoToRemove;
};

export const getAll = async (): Promise<ITodo[]> => {
  const item = localStorage.getItem(TODO_STORAGE_KEY);
  const todoList = JSON.parse(item as any);
  return todoList?.list || [];
};
