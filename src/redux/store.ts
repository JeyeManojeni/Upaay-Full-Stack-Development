
import { createStore, combineReducers, Store } from 'redux';
import { taskReducer } from './reducers/taskReducer';
import { RootState } from '../types';

const rootReducer = combineReducers({
  tasks: taskReducer,
});

// Local Storage helpers
const saveToLocalStorage = (state: RootState) => {
  try {
    localStorage.setItem('dashboardState', JSON.stringify(state));
  } catch (error) {
    console.warn('Could not save state to localStorage:', error);
  }
};

const loadFromLocalStorage = (): RootState | undefined => {
  try {
    const data = localStorage.getItem('dashboardState');
    return data ? JSON.parse(data) : undefined;
  } catch (error) {
    console.warn('Could not load state from localStorage:', error);
    return undefined;
  }
};

const store: Store<RootState> = createStore(
  rootReducer,
  loadFromLocalStorage()
);

// Save to localStorage on every state change
store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

export default store;