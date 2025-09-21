
import React, { useState, useMemo } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import store from './redux/store';
import { RootState, Task } from './types';
import { addTask, deleteTask, moveTask, setFilter, reorderTasks } from './redux/actions/taskActions';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import TaskColumn from './components/TaskColumn';
import AddTaskModal from './components/AddTaskModal';
import { filterTasks, groupTasksByStatus } from './utils/taskUtils';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { tasks, filter } = useSelector((state: RootState) => state.tasks);
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [modalInitialStatus, setModalInitialStatus] = useState<Task['status']>('todo');

  // Filter and group tasks
  const filteredTasks = useMemo(() => filterTasks(tasks, filter), [tasks, filter]);
  const groupedTasks = useMemo(() => groupTasksByStatus(filteredTasks), [filteredTasks]);

  const handleAddTask = (status: Task['status']) => {
    setModalInitialStatus(status);
    setIsAddModalOpen(true);
  };

  const handleSubmitTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
    dispatch(addTask(newTask));
  };

  const handleDeleteTask = (taskId: string) => {
    dispatch(deleteTask(taskId));
  };

  const handleFilterChange = (filterType: 'category' | 'priority' | 'search', value: string) => {
    dispatch(setFilter(filterType, value));
  };

  const handleClearFilters = () => {
    dispatch(setFilter('category', ''));
    dispatch(setFilter('priority', ''));
    dispatch(setFilter('search', ''));
  };

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Moving to different column
    if (destination.droppableId !== source.droppableId) {
      dispatch(moveTask(draggableId, destination.droppableId as Task['status']));
    } else {
      // Reordering within same column
      const columnTasks = groupedTasks[source.droppableId as Task['status']];
      const reorderedTasks = Array.from(columnTasks);
      const [removed] = reorderedTasks.splice(source.index, 1);
      reorderedTasks.splice(destination.index, 0, removed);

      // Update the full tasks array with reordered tasks
      const otherTasks = tasks.filter(task => task.status !== source.droppableId);
      const updatedTasks = [...otherTasks, ...reorderedTasks];
      dispatch(reorderTasks(updatedTasks));
    }
  };

  // Add some demo tasks on first load
  React.useEffect(() => {
    if (tasks.length === 0) {
      const demoTasks: Task[] = [
        {
          id: uuidv4(),
          title: "Design System Implementation",
          description: "Create a comprehensive design system for the Creative Upaay dashboard with consistent components and styling.",
          category: "Work",
          priority: "High",
          status: "todo",
          dueDate: "2025-01-30",
          createdAt: new Date().toISOString(),
        },
        {
          id: uuidv4(),
          title: "User Research Analysis",
          description: "Analyze user feedback from recent surveys and create actionable insights for product improvements.",
          category: "Work",
          priority: "Medium",
          status: "inProgress",
          dueDate: "2025-01-25",
          createdAt: new Date().toISOString(),
        },
        {
          id: uuidv4(),
          title: "Team Standup Meeting",
          description: "Weekly team standup to discuss progress, blockers, and upcoming priorities.",
          category: "Work",
          priority: "Low",
          status: "done",
          dueDate: "2025-01-20",
          createdAt: new Date().toISOString(),
        },
        {
          id: uuidv4(),
          title: "Personal Portfolio Update",
          description: "Update personal portfolio with latest projects and achievements.",
          category: "Personal",
          priority: "Medium",
          status: "todo",
          dueDate: "2025-02-01",
          createdAt: new Date().toISOString(),
        },
      ];
      
      demoTasks.forEach(task => dispatch(addTask(task)));
    }
  }, [tasks.length, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="p-6 max-w-7xl mx-auto">
        <div className="mb-6">
          <FilterBar
            filters={filter}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            taskCounts={{
              total: tasks.length,
              filtered: filteredTasks.length,
            }}
          />
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <TaskColumn
              title="To Do"
              status="todo"
              tasks={groupedTasks.todo}
              onAddTask={handleAddTask}
              onDeleteTask={handleDeleteTask}
            />
            <TaskColumn
              title="In Progress"
              status="inProgress"
              tasks={groupedTasks.inProgress}
              onAddTask={handleAddTask}
              onDeleteTask={handleDeleteTask}
            />
            <TaskColumn
              title="Done"
              status="done"
              tasks={groupedTasks.done}
              onAddTask={handleAddTask}
              onDeleteTask={handleDeleteTask}
            />
          </div>
        </DragDropContext>

        <AddTaskModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleSubmitTask}
          initialStatus={modalInitialStatus}
        />
      </main>
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
}

export default App;