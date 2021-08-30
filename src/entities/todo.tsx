export interface ITodo {
  description: string;
  state: "completed" | "pending";
  id?: string | null;
  completedDate?: Date;
}

const Todo = (data: ITodo) => ({
  id: data.id || null,
  description: data.description,
  state: data.state,
  completedDate: data.completedDate || undefined,
});

export default Todo;
