export interface Task {
  id: string;
  title: string;
  description: string;
  category: 'Work' | 'Personal' | 'Urgent';
  priority: 'High' | 'Medium' | 'Low';
  status: 'todo' | 'inProgress' | 'done';
  dueDate: string;
  createdAt: string;
}

export interface TaskState {
  tasks: Task[];
  filter: {
    category: string;
    priority: string;
    search: string;
  };
}

export interface RootState {
  tasks: TaskState;
}