




import { TaskState } from '../../types';
import { 
  TaskActionTypes, 
  ADD_TASK, 
  UPDATE_TASK, 
  DELETE_TASK, 
  MOVE_TASK, 
  SET_FILTER,
  REORDER_TASKS
} from '../actions/taskActions';

const initialState: TaskState = {
  tasks: [],
  filter: {
    category: '',
    priority: '',
    search: '',
  },
};

export const taskReducer = (
  state = initialState,
  action: TaskActionTypes
): TaskState => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };

    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? action.payload : task
        ),
      };

    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };

    case MOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.taskId
            ? { ...task, status: action.payload.newStatus }
            : task
        ),
      };

    case SET_FILTER:
      return {
        ...state,
        filter: {
          ...state.filter,
          [action.payload.filterType]: action.payload.value,
        },
      };

    case REORDER_TASKS:
      return {
        ...state,
        tasks: action.payload,
      };

    default:
      return state;
  }
};