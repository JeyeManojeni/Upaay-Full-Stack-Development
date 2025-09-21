import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Plus } from 'lucide-react';
import { Task } from '../types';
import TaskCard from './TaskCard';

interface TaskColumnProps {
  title: string;
  status: Task['status'];
  tasks: Task[];
  onAddTask: (status: Task['status']) => void;
  onDeleteTask: (taskId: string) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({ 
  title, 
  status, 
  tasks, 
  onAddTask, 
  onDeleteTask 
}) => {
  const getColumnColor = () => {
    switch (status) {
      case 'todo': return 'border-blue-200 bg-blue-50';
      case 'inProgress': return 'border-yellow-200 bg-yellow-50';
      case 'done': return 'border-green-200 bg-green-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getHeaderColor = () => {
    switch (status) {
      case 'todo': return 'text-blue-700 bg-blue-100';
      case 'inProgress': return 'text-yellow-700 bg-yellow-100';
      case 'done': return 'text-green-700 bg-green-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  return (
    <div className={`flex-1 min-w-0 border-2 border-dashed rounded-lg p-4 ${getColumnColor()}`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${getHeaderColor()}`}>
          <h2 className="font-semibold text-lg">{title}</h2>
          <span className="bg-white bg-opacity-60 px-2 py-1 rounded-full text-sm font-medium">
            {tasks.length}
          </span>
        </div>
        <button
          onClick={() => onAddTask(status)}
          className="flex items-center gap-1 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-white rounded-lg transition-colors"
        >
          <Plus size={16} />
          <span className="hidden sm:inline">Add</span>
        </button>
      </div>

      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`min-h-96 space-y-3 ${
              snapshot.isDraggingOver ? 'bg-white bg-opacity-60 rounded-lg' : ''
            }`}
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TaskCard 
                      task={task} 
                      onDelete={onDeleteTask}
                      isDragging={snapshot.isDragging}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskColumn;