import TodoEntitie, { ITodo } from "entities/todo";

interface Repository {
  persist: (todo: ITodo) => Promise<ITodo>;
  update: (id: string, data: ITodo) => Promise<ITodo>;
  remove: (id: string) => Promise<void>;
}

interface Configs {
  todoRepository: Repository;
}

const DEFAULT_CONFIGS: Configs = {
  todoRepository: {
    persist: (todo: ITodo) => Promise.resolve(todo),
    update: (id: string, content: ITodo) => Promise.resolve(content),
    remove: (id: string) => Promise.resolve(),
  },
};

export default class Todo {
  content: ITodo;
  repository: Readonly<Repository>;

  constructor(content: ITodo, configs: Configs = DEFAULT_CONFIGS) {
    this.content = Object.freeze(TodoEntitie(content));
    this.repository = configs.todoRepository;
  }

  async save() {
    const newTodo = TodoEntitie(this.content);
    const todo = await this.repository.persist(newTodo);
    this.content = todo;
    return this.content;
  }

  async update(data: ITodo) {
    const newTodo = new Todo({ ...this.content, ...data });
    if (newTodo.content.id)
      return await this.repository.update(newTodo.content.id, data);
    else return newTodo;
  }

  async complete() {
    const newTodo = new Todo({ ...this.content, state: "completed" });

    if (!newTodo.content.id) return newTodo;

    return new Todo(
      await newTodo.repository.update(newTodo.content.id, newTodo.content)
    );
  }

  async remove() {
    if (this.content.id) return this.repository.remove(this.content.id);
  }
}
