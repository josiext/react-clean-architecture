export interface ITodo {
  description: string;
  state: "completed" | "pending";
  id?: string | null;
}

const Todo = (data: ITodo) => ({
  id: data.id || null,
  description: data.description,
  state: data.state,
});

export default Todo;
