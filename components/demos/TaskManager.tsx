import React, { useState, useEffect } from 'react';
import { Plus, Trash2, CheckSquare, Square } from 'lucide-react';
import { Task } from '../../types';

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState('');

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('dd-demo-tasks');
    if (saved) {
      try {
        setTasks(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load tasks', e);
      }
    } else {
      // Default tasks if empty
      setTasks([
        { id: '1', text: 'Review security audit', completed: true },
        { id: '2', text: 'Deploy to staging', completed: false },
        { id: '3', text: 'Update chart components', completed: false },
      ]);
    }
  }, []);

  // Save to local storage on change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('dd-demo-tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newTask: Task = {
      id: Date.now().toString(),
      text: input.trim(),
      completed: false
    };

    setTasks([...tasks, newTask]);
    setInput('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-primary p-6 text-white flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold">Project Tasks</h3>
            <p className="text-primary-foreground/70 text-sm mt-1">
              {tasks.length} tasks • {completedCount} completed
            </p>
          </div>
          <div className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center">
            <CheckSquare className="h-6 w-6 text-white" />
          </div>
        </div>

        <div className="p-6">
          <form onSubmit={addTask} className="flex gap-2 mb-6">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Add a new task..."
              className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
            />
            <button
              type="submit"
              className="bg-secondary hover:bg-orange-500 text-white px-4 py-3 rounded-lg transition-colors flex items-center gap-2 font-medium"
            >
              <Plus className="h-5 w-5" />
              <span className="hidden sm:inline">Add</span>
            </button>
          </form>

          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {tasks.length === 0 && (
              <div className="text-center py-8 text-gray-400 italic">
                No tasks yet. Add one above!
              </div>
            )}
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`group flex items-center justify-between p-4 rounded-lg border transition-all ${
                  task.completed 
                    ? 'bg-gray-50 border-gray-100' 
                    : 'bg-white border-gray-200 hover:border-primary/30 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-3 flex-1">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`flex-shrink-0 transition-colors ${task.completed ? 'text-green-500' : 'text-gray-300 hover:text-primary'}`}
                  >
                    {task.completed ? <CheckSquare className="h-6 w-6" /> : <Square className="h-6 w-6" />}
                  </button>
                  <span className={`text-gray-700 font-medium ${task.completed ? 'line-through text-gray-400' : ''}`}>
                    {task.text}
                  </span>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-gray-300 hover:text-red-500 transition-colors p-2 opacity-0 group-hover:opacity-100"
                  aria-label="Delete task"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskManager;