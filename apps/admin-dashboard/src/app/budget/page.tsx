'use client';

import { useState, useEffect } from 'react';

interface BudgetItem {
  id: string;
  category: string;
  description: string;
  estimated: number;
  actual: number;
}

export default function BudgetPage() {
  const initialItems = [
    { id: '1', category: 'Venue', description: 'Wedding hall rental', estimated: 5000, actual: 5200 },
    { id: '2', category: 'Catering', description: 'Food & beverages for 200 guests', estimated: 8000, actual: 7800 },
    { id: '3', category: 'Photography', description: 'Professional photographer', estimated: 2000, actual: 2000 },
    { id: '4', category: 'Decoration', description: 'Flowers & decorations', estimated: 2500, actual: 2300 },
    { id: '5', category: 'Entertainment', description: 'DJ & Live band', estimated: 3000, actual: 0 },
  ];

  const [items, setItems] = useState<BudgetItem[]>(initialItems);
  const [totalWeddingBudget, setTotalWeddingBudget] = useState<number>(50000);
  const [newItem, setNewItem] = useState({ 
    category: '', 
    description: '', 
    estimated: '' 
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<BudgetItem | null>(null);
  const [editingBudgetGoal, setEditingBudgetGoal] = useState<boolean>(false);
  const [budgetGoalInput, setBudgetGoalInput] = useState<string>(totalWeddingBudget.toString());

  // Load budget data from localStorage on mount
  useEffect(() => {
    const savedBudget = localStorage.getItem('weddingBudget');
    if (savedBudget) {
      try {
        setItems(JSON.parse(savedBudget));
      } catch (e) {
        console.error('Failed to load budget from localStorage', e);
      }
    }
  }, []);

  // Save budget data to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('weddingBudget', JSON.stringify(items));
  }, [items]);

  const totalEstimated = items.reduce((sum, item) => sum + item.estimated, 0);
  const totalActual = items.reduce((sum, item) => sum + item.actual, 0);

  const addItem = () => {
    if (newItem.category && newItem.description && newItem.estimated) {
      setItems([
        ...items,
        {
          id: Date.now().toString(),
          category: newItem.category,
          description: newItem.description,
          estimated: parseFloat(newItem.estimated),
          actual: 0,
        },
      ]);
      setNewItem({ category: '', description: '', estimated: '' });
    }
  };

  const startEditing = (item: BudgetItem) => {
    setEditingId(item.id);
    setEditingItem({ ...item });
  };

  const saveItem = () => {
    if (editingItem) {
      setItems(items.map((i) => (i.id === editingItem.id ? editingItem : i)));
      setEditingId(null);
      setEditingItem(null);
    }
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingItem(null);
  };

  const deleteItem = (id: string) => {
    setItems(items.filter((i) => i.id !== id));
  };

  const saveBudgetGoal = () => {
    const newGoal = parseFloat(budgetGoalInput);
    if (!isNaN(newGoal) && newGoal > 0) {
      setTotalWeddingBudget(newGoal);
      setEditingBudgetGoal(false);
    }
  };

  const cancelBudgetGoal = () => {
    setBudgetGoalInput(totalWeddingBudget.toString());
    setEditingBudgetGoal(false);
  };

  const budgetUsage = (totalEstimated / totalWeddingBudget) * 100;

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Wedding Budget</h1>
          <a 
            href="/" 
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Back to Dashboard
          </a>
        </div>

        {/* Budget Summary */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Wedding Budget Goal */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-800 dark:to-slate-700 p-6 rounded-lg shadow border-2 border-purple-200 dark:border-purple-600">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-600 dark:text-gray-400 mb-1 font-semibold">Total Wedding Budget</p>
                {editingBudgetGoal ? (
                  <div className="flex gap-2 items-center">
                    <input
                      type="number"
                      value={budgetGoalInput}
                      onChange={(e) => setBudgetGoalInput(e.target.value)}
                      className="px-3 py-2 border border-purple-400 rounded-lg dark:bg-slate-600 text-2xl font-bold w-40"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={saveBudgetGoal}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelBudgetGoal}
                        className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <p className="text-4xl font-bold text-purple-600">${totalWeddingBudget.toLocaleString()}</p>
                    <button
                      onClick={() => {
                        setEditingBudgetGoal(true);
                        setBudgetGoalInput(totalWeddingBudget.toString());
                      }}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-6">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Budget Usage</p>
              <div className="w-full bg-gray-300 dark:bg-slate-600 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all ${
                    budgetUsage > 100 ? 'bg-red-600' : budgetUsage > 80 ? 'bg-orange-500' : 'bg-green-600'
                  }`}
                  style={{ width: `${Math.min(budgetUsage, 100)}%` }}
                />
              </div>
              <p className="text-sm mt-2 font-semibold">
                {budgetUsage > 100 ? (
                  <span className="text-red-600">Over budget by ${(totalEstimated - totalWeddingBudget).toLocaleString()}</span>
                ) : (
                  <span className="text-green-600">${(totalWeddingBudget - totalEstimated).toLocaleString()} remaining</span>
                )}
              </p>
            </div>
          </div>

          {/* Budget Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
              <p className="text-gray-600 dark:text-gray-400">Total Estimated</p>
              <p className="text-3xl font-bold text-blue-600">${totalEstimated.toLocaleString()}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{((totalEstimated / totalWeddingBudget) * 100).toFixed(1)}% of budget</p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
              <p className="text-gray-600 dark:text-gray-400">Total Spent</p>
              <p className="text-3xl font-bold text-pink-600">${totalActual.toLocaleString()}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{((totalActual / totalEstimated) * 100).toFixed(1)}% invoiced</p>
            </div>
          </div>
        </div>

        {/* Add Budget Item */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow mb-8">
          <h2 className="text-2xl font-bold mb-4">Add Budget Item</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Category"
              value={newItem.category}
              onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-slate-700"
            />
            <input
              type="text"
              placeholder="Description"
              value={newItem.description}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-slate-700"
            />
            <input
              type="number"
              placeholder="Estimated amount"
              value={newItem.estimated}
              onChange={(e) => setNewItem({ ...newItem, estimated: e.target.value })}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-slate-700"
            />
            <button
              onClick={addItem}
              className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
            >
              Add
            </button>
          </div>
        </div>

        {/* Budget Items Table */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 dark:bg-slate-700">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Category</th>
                <th className="px-6 py-3 text-left font-semibold">Description</th>
                <th className="px-6 py-3 text-right font-semibold">Estimated</th>
                <th className="px-6 py-3 text-right font-semibold">Actual</th>
                <th className="px-6 py-3 text-right font-semibold">Difference</th>
                <th className="px-6 py-3 text-left font-semibold">Status</th>
                <th className="px-6 py-3 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                const diff = item.estimated - item.actual;
                return editingId === item.id && editingItem ? (
                  <tr key={item.id} className="border-t dark:border-slate-700 bg-blue-50 dark:bg-slate-700">
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={editingItem.category}
                        onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                        className="px-3 py-1 border rounded dark:bg-slate-600 w-full"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={editingItem.description}
                        onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                        className="px-3 py-1 border rounded dark:bg-slate-600 w-full"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        value={editingItem.estimated}
                        onChange={(e) => setEditingItem({ ...editingItem, estimated: parseFloat(e.target.value) })}
                        className="px-3 py-1 border rounded dark:bg-slate-600 w-full text-right"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        value={editingItem.actual}
                        onChange={(e) => setEditingItem({ ...editingItem, actual: parseFloat(e.target.value) })}
                        className="px-3 py-1 border rounded dark:bg-slate-600 w-full text-right"
                      />
                    </td>
                    <td className="px-6 py-4 text-right font-semibold">
                      ${(editingItem.estimated - editingItem.actual).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-sm font-semibold bg-gray-200 dark:bg-slate-600">
                        Editing...
                      </span>
                    </td>
                    <td className="px-6 py-4 space-x-2">
                      <button
                        onClick={saveItem}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ) : (
                  <tr key={item.id} className="border-t dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700">
                    <td className="px-6 py-4 font-semibold">{item.category}</td>
                    <td className="px-6 py-4">{item.description}</td>
                    <td className="px-6 py-4 text-right">${item.estimated.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right">${item.actual.toLocaleString()}</td>
                    <td className={`px-6 py-4 text-right font-semibold ${diff >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ${diff.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        item.actual === 0 ? 'bg-yellow-100 text-yellow-800' :
                        diff >= 0 ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {item.actual === 0 ? 'Not Started' : diff >= 0 ? 'On Budget' : 'Over Budget'}
                      </span>
                    </td>
                    <td className="px-6 py-4 space-x-2">
                      <button
                        onClick={() => startEditing(item)}
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
