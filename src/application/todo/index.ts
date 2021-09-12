import TodoFactory, { ITodo } from "entities/todo";
import * as TodoRepository from "frameworks/repositories/todo";

interface Repository {
  persist: (todo: ITodo) => Promise<ITodo>;
}

export class CreateTodo {
  async execute(todo: ITodo) {
    return Object.freeze(TodoFactory(todo));
  }
}

export class SaveTodo {
  repositories: { persist: Repository["persist"] };

  constructor(
    repositories: { persist: Repository["persist"] } = {
      persist: TodoRepository.persist,
    }
  ) {
    this.repositories = repositories;
  }

  async execute(todo: ITodo) {
    return this.repositories.persist(todo);
  }
}

export class UpdateTodo {
  async execute(todo: ITodo, update: Partial<ITodo>) {
    const todoUpdated = { ...todo, ...update };
    return Object.freeze(TodoFactory(todoUpdated));
  }
}

export class CompleteTodo {
  repositories: {
    update: (id: string, data: Partial<ITodo>) => Promise<ITodo | undefined>;
  };

  constructor(
    repositories: {
      update: (id: string, data: Partial<ITodo>) => Promise<ITodo | undefined>;
    } = { update: TodoRepository.update }
  ) {
    this.repositories = repositories;
  }

  async execute(todo: ITodo) {
    const update = { state: "completed" } as { state: "completed" };

    if (todo.id) return this.repositories.update(todo.id, update);
    else return todo;
  }
}

export class RemoveTodo {
  repositories: { remove: (id: string) => Promise<ITodo | undefined> };

  constructor(
    repositories: { remove: (id: string) => Promise<ITodo | undefined> } = {
      remove: TodoRepository.remove,
    }
  ) {
    this.repositories = repositories;
  }

  async execute(id: string) {
    if (id) return this.repositories.remove(id);
  }
}

export class GetAllTodo {
  repositories: { getAll: () => Promise<ITodo[]> };

  constructor(
    repositories: { getAll: () => Promise<ITodo[]> } = {
      getAll: TodoRepository.getAll,
    }
  ) {
    this.repositories = repositories;
  }

  async execute() {
    return this.repositories.getAll();
  }
}
