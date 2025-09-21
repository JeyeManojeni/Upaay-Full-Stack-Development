import { Task } from '../types';

export const filterTasks = (
  tasks: Task[],
  filters: { category: string; priority: string; search: string }
): Task[] => {
  return tasks.filter(task => {
    const matchesCategory = !filters.category || task.category === filters.category;
    const matchesPriority = !filters.priority || task.priority === filters.priority;
    const matchesSearch = !filters.search || 
      task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      task.description.toLowerCase().includes(filters.search.toLowerCase());
    
    return matchesCategory && matchesPriority && matchesSearch;
  });
};

export const groupTasksByStatus = (tasks: Task[]) => {
  return {
    todo: tasks.filter(task => task.status === 'todo'),
    inProgress: tasks.filter(task => task.status === 'inProgress'),
    done: tasks.filter(task => task.status === 'done'),
  };
};