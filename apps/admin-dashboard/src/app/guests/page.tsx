'use client';

import { useState, useEffect } from 'react';

interface Guest {
  id: string;
  name: string;
  email: string;
  rsvpStatus: 'pending' | 'confirmed' | 'declined';
  plusOnes: number;
  dietary: string;
}

interface Table {
  id: string;
  tableNumber: number;
  capacity: number;
  guests: string[];
}

export default function GuestsPage() {
  const initialGuests = [
    {
      id: '1',
      name: 'Maria Silva',
      email: 'maria@email.com',
      rsvpStatus: 'confirmed',
      plusOnes: 1,
      dietary: 'Vegetarian',
    },
    {
      id: '2',
      name: 'João Santos',
      email: 'joao@email.com',
      rsvpStatus: 'confirmed',
      plusOnes: 0,
      dietary: 'None',
    },
    {
      id: '3',
      name: 'Ana Costa',
      email: 'ana@email.com',
      rsvpStatus: 'pending',
      plusOnes: 2,
      dietary: 'Vegan',
    },
  ];

  const [activeTab, setActiveTab] = useState<'guests' | 'seating'>('guests');
  const [guests, setGuests] = useState<Guest[]>(initialGuests);
  const [tables, setTables] = useState<Table[]>([
    { id: '1', tableNumber: 1, capacity: 8, guests: ['Maria Silva', 'João Santos'] },
    { id: '2', tableNumber: 2, capacity: 8, guests: ['Ana Costa'] },
    { id: '3', tableNumber: 3, capacity: 8, guests: [] },
  ]);
  const [draggedGuest, setDraggedGuest] = useState<{ name: string; sourceTableId?: string } | null>(null);
  const [newTableName, setNewTableName] = useState('');
  const [editingTableId, setEditingTableId] = useState<string | null>(null);
  const [editingTableCapacity, setEditingTableCapacity] = useState<number>(0);

  // Load guests from localStorage on mount
  useEffect(() => {
    const savedGuests = localStorage.getItem('weddingGuests');
    if (savedGuests) {
      try {
        setGuests(JSON.parse(savedGuests));
      } catch (e) {
        console.error('Failed to load guests from localStorage', e);
      }
    }

    const savedTables = localStorage.getItem('weddingSeating');
    if (savedTables) {
      try {
        setTables(JSON.parse(savedTables));
      } catch (e) {
        console.error('Failed to load tables from localStorage', e);
      }
    }
  }, []);

  // Save guests to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('weddingGuests', JSON.stringify(guests));
  }, [guests]);

  // Save tables to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('weddingSeating', JSON.stringify(tables));
  }, [tables]);

  const [newGuest, setNewGuest] = useState({ name: '', email: '' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingGuest, setEditingGuest] = useState<Guest | null>(null);

  const addGuest = () => {
    if (newGuest.name && newGuest.email) {
      setGuests([
        ...guests,
        {
          id: Date.now().toString(),
          name: newGuest.name,
          email: newGuest.email,
          rsvpStatus: 'pending',
          plusOnes: 0,
          dietary: 'None',
        },
      ]);
      setNewGuest({ name: '', email: '' });
    }
  };

  const startEditing = (guest: Guest) => {
    setEditingId(guest.id);
    setEditingGuest({ ...guest });
  };

  const saveGuest = () => {
    if (editingGuest) {
      setGuests(guests.map((g) => (g.id === editingGuest.id ? editingGuest : g)));
      setEditingId(null);
      setEditingGuest(null);
    }
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingGuest(null);
  };

  const deleteGuest = (id: string) => {
    setGuests(guests.filter((g) => g.id !== id));
  };

  // Seating (Table) functions
  const handleDragStart = (e: React.DragEvent, guestName: string, sourceTableId?: string) => {
    setDraggedGuest({ name: guestName, sourceTableId });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDropOnTable = (e: React.DragEvent, targetTableId: string) => {
    e.preventDefault();
    if (!draggedGuest) return;

    // Update tables in a single state change to avoid duplication
    setTables((prevTables) =>
      prevTables.map((t) => {
        // Remove from source table if it exists
        if (t.id === draggedGuest.sourceTableId) {
          return { ...t, guests: t.guests.filter((g) => g !== draggedGuest.name) };
        }
        // Add to target table (only if not already there)
        if (t.id === targetTableId && !t.guests.includes(draggedGuest.name)) {
          return { ...t, guests: [...t.guests, draggedGuest.name] };
        }
        return t;
      })
    );

    setDraggedGuest(null);
  };

  const addTable = () => {
    const newTableNumber = Math.max(...tables.map((t) => t.tableNumber), 0) + 1;
    const newTable: Table = {
      id: Date.now().toString(),
      tableNumber: newTableNumber,
      capacity: 8,
      guests: [],
    };
    setTables([...tables, newTable]);
  };

  const removeTable = (tableId: string) => {
    setTables(tables.filter((t) => t.id !== tableId));
  };

  const startEditingTableCapacity = (table: Table) => {
    setEditingTableId(table.id);
    setEditingTableCapacity(table.capacity);
  };

  const saveTableCapacity = (tableId: string) => {
    setTables(
      tables.map((t) =>
        t.id === tableId ? { ...t, capacity: editingTableCapacity } : t
      )
    );
    setEditingTableId(null);
    setEditingTableCapacity(0);
  };

  const cancelEditingTable = () => {
    setEditingTableId(null);
    setEditingTableCapacity(0);
  };

  const removeGuestFromTable = (tableId: string, guestName: string) => {
    setTables(
      tables.map((t) =>
        t.id === tableId
          ? { ...t, guests: t.guests.filter((g) => g !== guestName) }
          : t
      )
    );
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Manage Guests</h1>
          <a 
            href="/" 
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Back to Dashboard
          </a>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200 dark:border-slate-700">
          <button
            onClick={() => setActiveTab('guests')}
            className={`px-6 py-3 font-semibold text-lg border-b-2 ${
              activeTab === 'guests'
                ? 'border-pink-600 text-pink-600'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900'
            }`}
          >
            👥 Guest List
          </button>
          <button
            onClick={() => setActiveTab('seating')}
            className={`px-6 py-3 font-semibold text-lg border-b-2 ${
              activeTab === 'seating'
                ? 'border-pink-600 text-pink-600'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900'
            }`}
          >
            🪑 Seating Arrangement
          </button>
        </div>

        {/* Add Guest Form */}
        {activeTab === 'guests' && (
          <>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow mb-8">
          <h2 className="text-2xl font-bold mb-4">Add New Guest</h2>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Guest name"
              value={newGuest.name}
              onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-slate-700"
            />
            <input
              type="email"
              placeholder="Email"
              value={newGuest.email}
              onChange={(e) => setNewGuest({ ...newGuest, email: e.target.value })}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-slate-700"
            />
            <button
              onClick={addGuest}
              className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
            >
              Add Guest
            </button>
          </div>
        </div>

        {/* Guests Table */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 dark:bg-slate-700">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Name</th>
                <th className="px-6 py-3 text-left font-semibold">Email</th>
                <th className="px-6 py-3 text-left font-semibold">RSVP Status</th>
                <th className="px-6 py-3 text-left font-semibold">Plus Ones</th>
                <th className="px-6 py-3 text-left font-semibold">Dietary</th>
                <th className="px-6 py-3 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {guests.map((guest) => (
                editingId === guest.id && editingGuest ? (
                  <tr key={guest.id} className="border-t dark:border-slate-700 bg-blue-50 dark:bg-slate-700">
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={editingGuest.name}
                        onChange={(e) => setEditingGuest({ ...editingGuest, name: e.target.value })}
                        className="px-3 py-1 border rounded dark:bg-slate-600"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="email"
                        value={editingGuest.email}
                        onChange={(e) => setEditingGuest({ ...editingGuest, email: e.target.value })}
                        className="px-3 py-1 border rounded dark:bg-slate-600"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={editingGuest.rsvpStatus}
                        onChange={(e) => setEditingGuest({ ...editingGuest, rsvpStatus: e.target.value as any })}
                        className="px-3 py-1 border rounded dark:bg-slate-600"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="declined">Declined</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        value={editingGuest.plusOnes}
                        onChange={(e) => setEditingGuest({ ...editingGuest, plusOnes: parseInt(e.target.value) })}
                        className="w-16 px-3 py-1 border rounded dark:bg-slate-600"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={editingGuest.dietary}
                        onChange={(e) => setEditingGuest({ ...editingGuest, dietary: e.target.value })}
                        className="px-3 py-1 border rounded dark:bg-slate-600"
                      />
                    </td>
                    <td className="px-6 py-4 space-x-2">
                      <button
                        onClick={saveGuest}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ) : (
                  <tr key={guest.id} className="border-t dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700">
                    <td className="px-6 py-4">{guest.name}</td>
                    <td className="px-6 py-4">{guest.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        guest.rsvpStatus === 'confirmed' ? 'bg-green-100 text-green-800' :
                        guest.rsvpStatus === 'declined' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {guest.rsvpStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">{guest.plusOnes}</td>
                    <td className="px-6 py-4">{guest.dietary}</td>
                    <td className="px-6 py-4 space-x-2">
                      <button
                        onClick={() => startEditing(guest)}
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteGuest(guest.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
            <p className="text-gray-600 dark:text-gray-400">Total Guests</p>
            <p className="text-3xl font-bold">{guests.length}</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
            <p className="text-gray-600 dark:text-gray-400">RSVP Confirmed</p>
            <p className="text-3xl font-bold">{guests.filter((g) => g.rsvpStatus === 'confirmed').length}</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
            <p className="text-gray-600 dark:text-gray-400">Plus Ones</p>
            <p className="text-3xl font-bold">{guests.reduce((sum, g) => sum + g.plusOnes, 0)}</p>
          </div>
        </div>
          </>
        )}

        {/* Seating Tab */}
        {activeTab === 'seating' && (
          <>
        {/* Add Table Button */}
        <div className="mb-8 flex justify-end">
          <button
            onClick={addTable}
            className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
          >
            + Add Table
          </button>
        </div>

        {/* Tables Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {tables.map((table) => (
            <div
              key={table.id}
              className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 border-2 border-dashed border-gray-300 dark:border-slate-600"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDropOnTable(e, table.id)}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold">Table {table.tableNumber}</h3>
                {editingTableId === table.id ? (
                  <div className="flex gap-2 items-center">
                    <input
                      type="number"
                      min="1"
                      value={editingTableCapacity}
                      onChange={(e) => setEditingTableCapacity(parseInt(e.target.value))}
                      className="w-16 px-2 py-1 border rounded dark:bg-slate-700 text-center"
                    />
                    <button
                      onClick={() => saveTableCapacity(table.id)}
                      className="px-2 py-1 bg-green-600 text-white rounded text-sm"
                    >
                      ✓
                    </button>
                    <button
                      onClick={cancelEditingTable}
                      className="px-2 py-1 bg-gray-600 text-white rounded text-sm"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2 items-center">
                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 cursor-pointer hover:text-pink-600" onClick={() => startEditingTableCapacity(table)}>
                      {table.guests.length}/{table.capacity}
                    </span>
                    <button
                      onClick={() => startEditingTableCapacity(table)}
                      className="text-xs text-blue-600 hover:text-blue-700"
                    >
                      edit
                    </button>
                    <button
                      onClick={() => removeTable(table.id)}
                      className="text-xs text-red-600 hover:text-red-700"
                    >
                      remove
                    </button>
                  </div>
                )}
              </div>

              {/* Capacity Bar */}
              <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2 mb-4">
                <div
                  className="bg-pink-600 h-2 rounded-full transition-all"
                  style={{ width: `${(table.guests.length / table.capacity) * 100}%` }}
                />
              </div>

              {/* Guest List */}
              <div className="space-y-2">
                {table.guests.map((guest) => (
                  <div
                    key={guest}
                    draggable
                    onDragStart={(e) => handleDragStart(e, guest, table.id)}
                    className="flex justify-between items-center bg-pink-50 dark:bg-slate-700 p-3 rounded cursor-move hover:bg-pink-100 dark:hover:bg-slate-600 transition-colors"
                  >
                    <span className="font-medium">{guest}</span>
                    <button
                      onClick={() => removeGuestFromTable(table.id, guest)}
                      className="text-red-600 hover:text-red-700 font-semibold text-sm"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                {table.guests.length === 0 && (
                  <p className="text-gray-500 dark:text-gray-400 italic text-center py-4">
                    Drag guests here
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Unassigned Guests */}
        <div className="mt-8 bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Unassigned Guests</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {guests
              .map((g) => g.name)
              .filter((name) => !tables.some((t) => t.guests.includes(name)))
              .map((guestName) => (
                <div
                  key={guestName}
                  draggable
                  onDragStart={(e) => handleDragStart(e, guestName)}
                  className="bg-gray-100 dark:bg-slate-700 p-3 rounded cursor-move hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors text-center font-medium"
                >
                  {guestName}
                </div>
              ))}
          </div>
          {guests.filter((g) => !tables.some((t) => t.guests.includes(g.name))).length === 0 && (
            <p className="text-gray-500 dark:text-gray-400 italic">All guests assigned to tables</p>
          )}
        </div>
          </>
        )}
      </div>
    </main>
  );
}
