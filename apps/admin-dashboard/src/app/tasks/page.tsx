'use client';

import { useState } from 'react';

interface Task {
  id: string;
  title: string;
  dueDate: string;
  assignedTo: 'bride' | 'groom' | 'both';
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Book venue',
      dueDate: '2027-01-15',
      assignedTo: 'both',
      priority: 'high',
      completed: true,
    },
    {
      id: '2',
      title: 'Send invitations',
      dueDate: '2027-02-01',
      assignedTo: 'bride',
      priority: 'high',
      completed: true,
    },
    {
      id: '3',
      title: 'Order wedding dress',
      dueDate: '2027-03-01',
      assignedTo: 'bride',
      priority: 'high',
      completed: false,
    },
    {
      id: '4',
      title: 'Book photographer',
      dueDate: '2027-01-30',
      assignedTo: 'groom',
      priority: 'medium',
      completed: false,
    },
    {
      id: '5',
      title: 'Finalize menu',
      dueDate: '2027-05-01',
      assignedTo: 'both',
      priority: 'medium',
      completed: false,
    },
  ]);

  const [newTask, setNewTask] = useState({ title: '', dueDate: '', assignedTo: 'both', priority: 'medium' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const addTask = () => {
    if (newTask.title && newTask.dueDate) {
      setTasks([
        ...tasks,
        {
          id: Date.now().toString(),
          title: newTask.title,
          dueDate: newTask.dueDate,
          assignedTo: newTask.assignedTo as 'bride' | 'groom' | 'both',
          priority: newTask.priority as 'low' | 'medium' | 'high',
          completed: false,
        },
      ]);
      setNewTask({ title: '', dueDate: '', assignedTo: 'both', priority: 'medium' });
    }
  };

  const startEditing = (task: Task) => {
    setEditingId(task.id);
    setEditingTask({ ...task });
  };

  const saveTask = () => {
    if (editingTask) {
      setTasks(tasks.map((t) => (t.id === editingTask.id ? editingTask : t)));
      setEditingId(null);
      setEditingTask(null);
    }
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingTask(null);
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen p-8 bg-[#F8F6F1]">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-display text-5xl font-bold text-[#2F2F2F] mb-2">Wedding Tasks</h1>
        <p className="text-[#6B6B6B] mb-8">Keep track of all wedding planning tasks</p>

        {/* Progress */}
        <div className="wedding-card p-6 rounded-lg shadow mb-8">
          <p className="text-[#6B6B6B] mb-2">Overall Progress</p>
          <div className="w-full bg-[#F1ECE6] rounded-full h-4">
            <div
              className="bg-gradient-to-r from-[#8FAF9A] to-[#2F2F2F] h-4 rounded-full transition-all"
              style={{ width: `${(completedCount / tasks.length) * 100}%` }}
            />
          </div>
          <p className="mt-2 font-semibold">{completedCount} of {tasks.length} tasks completed</p>
        </div>

        {/* Add Task */}
        <div className="wedding-card p-6 rounded-lg shadow mb-8">
          <h2 className="font-display text-2xl font-semibold text-[#2F2F2F] mb-4">Add Task</h2>
          <div className="grid md:grid-cols-5 gap-4">
            <input
              type="text"
              placeholder="Task title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="px-4 py-2 border border-[#F1ECE6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8FAF9A] text-[#2F2F2F]"
            />
            <input
              type="date"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
              className="px-4 py-2 border border-[#F1ECE6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8FAF9A] text-[#2F2F2F]"
            />
            <select
              value={newTask.assignedTo}
              onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
              className="px-4 py-2 border border-[#F1ECE6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8FAF9A] text-[#2F2F2F]"
            >
              <option value="bride">Bride</option>
              <option value="groom">Groom</option>
              <option value="both">Both</option>
            </select>
            <select
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
              className="px-4 py-2 border border-[#F1ECE6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8FAF9A] text-[#2F2F2F]"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <button
              onClick={addTask}
              className="px-6 py-2 bg-[#8FAF9A] text-white rounded-lg hover:bg-[#7A9988] font-display"
            >
              Add Task
            </button>
          </div>
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          {tasks.sort((a, b) => {
            const priorityOrder = { high: 0, medium: 1, low: 2 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
          }).map((task) => (
            editingId === task.id && editingTask ? (
              <div key={task.id} className="wedding-card p-6 rounded-lg shadow mb-4">
                <h3 className="text-lg font-semibold mb-4">Edit Task</h3>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    value={editingTask.title}
                    onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                    placeholder="Task title"
                    className="px-4 py-2 border border-[#F1ECE6] rounded-lg"
                  />
                  <input
                    type="date"
                    value={editingTask.dueDate}
                    onChange={(e) => setEditingTask({ ...editingTask, dueDate: e.target.value })}
                    className="px-4 py-2 border border-[#F1ECE6] rounded-lg"
                  />
                  <select
                    value={editingTask.priority}
                    onChange={(e) => setEditingTask({ ...editingTask, priority: e.target.value as any })}
                    className="px-4 py-2 border border-[#F1ECE6] rounded-lg"
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>
                  <select
                    value={editingTask.assignedTo}
                    onChange={(e) => setEditingTask({ ...editingTask, assignedTo: e.target.value as any })}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-slate-600"
                  >
                    <option value="bride">Bride</option>
                    <option value="groom">Groom</option>
                    <option value="both">Both</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={saveTask}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div
                key={task.id}
                className={`wedding-card p-6 rounded-lg shadow flex items-center gap-4 ${
                  task.completed ? 'opacity-70' : ''
                }`}
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="w-6 h-6"
                />
                <div className="flex-1">
                  <p className={`text-lg font-semibold ${task.completed ? 'line-through text-gray-500' : ''}`}>
                    {task.title}
                  </p>
                  <p className="text-sm text-[#6B6B6B]">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  task.priority === 'high' ? 'bg-red-50 text-red-700' :
                  task.priority === 'medium' ? 'bg-yellow-50 text-yellow-700' :
                  'bg-green-50 text-green-700'
                }`}>
                  {task.priority}
                </span>
                <span className="text-sm font-semibold text-[#6B6B6B]">
                  {task.assignedTo === 'both' ? '👰🤵' : task.assignedTo === 'bride' ? '👰' : '🤵'}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEditing(task)}
                    className="px-3 py-1 bg-[#8FAF9A] text-white rounded text-sm font-medium hover:bg-[#7A9988] text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded text-sm font-medium hover:bg-red-700 text-sm font-display"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
}
