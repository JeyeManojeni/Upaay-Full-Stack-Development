

import { Task } from '../../types';

export const ADD_TASK = 'ADD_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const MOVE_TASK = 'MOVE_TASK';
export const SET_FILTER = 'SET_FILTER';
export const REORDER_TASKS = 'REORDER_TASKS';

export interface AddTaskAction {
  type: typeof ADD_TASK;
  payload: Task;
}

export interface UpdateTaskAction {
  type: typeof UPDATE_TASK;
  payload: Task;
}

export interface DeleteTaskAction {
  type: typeof DELETE_TASK;
  payload: string;
}

export interface MoveTaskAction {
  type: typeof MOVE_TASK;
  payload: {
    taskId: string;
    newStatus: Task['status'];
  };
}

export interface SetFilterAction {
  type: typeof SET_FILTER;
  payload: {
    filterType: 'category' | 'priority' | 'search';
    value: string;
  };
}

export interface ReorderTasksAction {
  type: typeof REORDER_TASKS;
  payload: Task[];
}

export type TaskActionTypes = 
  | AddTaskAction 
  | UpdateTaskAction 
  | DeleteTaskAction 
  | MoveTaskAction 
  | SetFilterAction
  | ReorderTasksAction;

export const addTask = (task: Task): AddTaskAction => ({
  type: ADD_TASK,
  payload: task,
});

export const updateTask = (task: Task): UpdateTaskAction => ({
  type: UPDATE_TASK,
  payload: task,
});

export const deleteTask = (taskId: string): DeleteTaskAction => ({
  type: DELETE_TASK,
  payload: taskId,
});

export const moveTask = (taskId: string, newStatus: Task['status']): MoveTaskAction => ({
  type: MOVE_TASK,
  payload: { taskId, newStatus },
});

export const setFilter = (filterType: 'category' | 'priority' | 'search', value: string): SetFilterAction => ({
  type: SET_FILTER,
  payload: { filterType, value },
});

export const reorderTasks = (tasks: Task[]): ReorderTasksAction => ({
  type: REORDER_TASKS,
  payload: tasks,
});