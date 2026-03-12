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
    <div className="min-h-screen p-8 bg-[#F8F6F1]">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-display text-5xl font-bold text-[#2F2F2F] mb-2">Guest Management</h1>
        <p className="text-[#6B6B6B] mb-8">Manage RSVPs and seating arrangements</p>

        <>
      {/* Tabs */}
      <div className="space-y-6">
        <div className="flex gap-4 border-b border-[#F1ECE6]">
          <button
            onClick={() => setActiveTab('guests')}
            className={`px-6 py-4 font-semibold text-lg border-b-2 transition-colors ${
              activeTab === 'guests'
                ? 'border-[#8FAF9A] text-[#8FAF9A]'
                : 'border-transparent text-[#6B6B6B] hover:text-[#8FAF9A]'
            }`}
          >
            👥 Guest List
          </button>
          <button
            onClick={() => setActiveTab('seating')}
            className={`px-6 py-4 font-semibold text-lg border-b-2 transition-colors ${
              activeTab === 'seating'
                ? 'border-[#8FAF9A] text-[#8FAF9A]'
                : 'border-transparent text-[#6B6B6B] hover:text-[#8FAF9A]'
            }`}
          >
            🪑 Seating Arrangement
          </button>
        </div>

        {/* Add Guest Form */}
        {activeTab === 'guests' && (
          <>
            <div className="wedding-card space-y-4">
              <h3 className="font-display text-xl font-semibold text-[#2F2F2F]">Add New Guest</h3>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Guest name"
                  value={newGuest.name}
                  onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })}
                  className="flex-1 px-4 py-2 border border-[#F1ECE6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8FAF9A] text-[#2F2F2F]"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newGuest.email}
                  onChange={(e) => setNewGuest({ ...newGuest, email: e.target.value })}
                  className="flex-1 px-4 py-2 border border-[#F1ECE6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8FAF9A] text-[#2F2F2F]"
                />
                <button
                  onClick={addGuest}
                  className="wedding-button-primary"
                >
                  Add Guest
                </button>
              </div>
            </div>

            {/* Guests Table */}
            <div className="wedding-card overflow-hidden">
              <table className="w-full text-sm">
                <thead className="border-b border-[#F1ECE6] bg-[#FAF8F4]">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-[#2F2F2F]">Name</th>
                    <th className="px-6 py-4 text-left font-semibold text-[#2F2F2F]">Email</th>
                    <th className="px-6 py-4 text-left font-semibold text-[#2F2F2F]">RSVP Status</th>
                    <th className="px-6 py-4 text-left font-semibold text-[#2F2F2F]">Plus Ones</th>
                    <th className="px-6 py-4 text-left font-semibold text-[#2F2F2F]">Dietary</th>
                    <th className="px-6 py-4 text-left font-semibold text-[#2F2F2F]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {guests.map((guest) => (
                    editingId === guest.id && editingGuest ? (
                      <tr key={guest.id} className="border-t border-[#F1ECE6] bg-[#F1ECE6] bg-opacity-20">
                        <td className="px-6 py-4">
                          <input
                            type="text"
                            value={editingGuest.name}
                            onChange={(e) => setEditingGuest({ ...editingGuest, name: e.target.value })}
                            className="px-3 py-1 border border-[#F1ECE6] rounded text-[#2F2F2F] focus:outline-none focus:ring-2 focus:ring-[#8FAF9A]"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="email"
                            value={editingGuest.email}
                            onChange={(e) => setEditingGuest({ ...editingGuest, email: e.target.value })}
                            className="px-3 py-1 border border-[#F1ECE6] rounded text-[#2F2F2F] focus:outline-none focus:ring-2 focus:ring-[#8FAF9A]"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={editingGuest.rsvpStatus}
                            onChange={(e) => setEditingGuest({ ...editingGuest, rsvpStatus: e.target.value as any })}
                            className="px-3 py-1 border border-[#F1ECE6] rounded text-[#2F2F2F] focus:outline-none focus:ring-2 focus:ring-[#8FAF9A]"
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
                            className="w-16 px-3 py-1 border border-[#F1ECE6] rounded text-[#2F2F2F] focus:outline-none focus:ring-2 focus:ring-[#8FAF9A]"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="text"
                            value={editingGuest.dietary}
                            onChange={(e) => setEditingGuest({ ...editingGuest, dietary: e.target.value })}
                            className="px-3 py-1 border border-[#F1ECE6] rounded text-[#2F2F2F] focus:outline-none focus:ring-2 focus:ring-[#8FAF9A]"
                          />
                        </td>
                        <td className="px-6 py-4 space-x-2">
                          <button
                            onClick={saveGuest}
                            className="px-3 py-1 bg-[#8FAF9A] text-white rounded text-sm font-medium hover:bg-[#7A9988]"
                          >
                            Save
                          </button>
                          <button
                            onClick={cancelEditing}
                            className="px-3 py-1 bg-[#6B6B6B] text-white rounded text-sm font-medium hover:bg-[#5A5A5A]"
                          >
                            Cancel
                          </button>
                        </td>
                      </tr>
                    ) : (
                      <tr key={guest.id} className="border-t border-[#F1ECE6] hover:bg-[#FAF8F4]">
                        <td className="px-6 py-4 text-[#2F2F2F]">{guest.name}</td>
                        <td className="px-6 py-4 text-[#6B6B6B]">{guest.email}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            guest.rsvpStatus === 'confirmed' ? 'bg-green-50 text-green-700' :
                            guest.rsvpStatus === 'declined' ? 'bg-red-50 text-red-700' :
                            'bg-yellow-50 text-yellow-700'
                          }`}>
                            {guest.rsvpStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-[#2F2F2F]">{guest.plusOnes}</td>
                        <td className="px-6 py-4 text-[#2F2F2F]">{guest.dietary}</td>
                        <td className="px-6 py-4 space-x-2">
                          <button
                            onClick={() => startEditing(guest)}
                            className="px-3 py-1 bg-[#8FAF9A] text-white rounded text-sm font-medium hover:bg-[#7A9988]"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteGuest(guest.id)}
                            className="px-3 py-1 bg-[#D8A7A1] text-white rounded text-sm font-medium hover:bg-[#C89691]"
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
              <div className="stat-card">
                <div className="stat-card-header">Total Guests</div>
                <div className="stat-card-value">{guests.length}</div>
              </div>
              <div className="stat-card">
                <div className="stat-card-header">RSVP Confirmed</div>
                <div className="stat-card-value">{guests.filter((g) => g.rsvpStatus === 'confirmed').length}</div>
              </div>
              <div className="stat-card">
                <div className="stat-card-header">Plus Ones</div>
                <div className="stat-card-value">{guests.reduce((sum, g) => sum + g.plusOnes, 0)}</div>
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
                className="wedding-button-primary"
              >
                + Add Table
              </button>
            </div>

            {/* Tables Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {tables.map((table) => (
                <div
                  key={table.id}
                  className="wedding-card border-2 border-dashed border-[#F1ECE6] cursor-pointer"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDropOnTable(e, table.id)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-display text-2xl font-semibold text-[#2F2F2F]">Table {table.tableNumber}</h3>
                    {editingTableId === table.id ? (
                      <div className="flex gap-2 items-center">
                        <input
                          type="number"
                          min="1"
                          value={editingTableCapacity}
                          onChange={(e) => setEditingTableCapacity(parseInt(e.target.value))}
                          className="w-16 px-2 py-1 border border-[#F1ECE6] rounded text-center text-[#2F2F2F] focus:outline-none focus:ring-2 focus:ring-[#8FAF9A]"
                        />
                        <button
                          onClick={() => saveTableCapacity(table.id)}
                          className="px-2 py-1 bg-[#8FAF9A] text-white rounded text-sm font-medium"
                        >
                          ✓
                        </button>
                        <button
                          onClick={cancelEditingTable}
                          className="px-2 py-1 bg-[#6B6B6B] text-white rounded text-sm font-medium"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2 items-center text-sm">
                        <span className="font-semibold text-[#2F2F2F] cursor-pointer hover:text-[#8FAF9A]" onClick={() => startEditingTableCapacity(table)}>
                          {table.guests.length}/{table.capacity}
                        </span>
                        <button
                          onClick={() => startEditingTableCapacity(table)}
                          className="text-xs text-[#8FAF9A] hover:text-[#7A9988] font-medium"
                        >
                          edit
                        </button>
                        <button
                          onClick={() => removeTable(table.id)}
                          className="text-xs text-[#D8A7A1] hover:text-[#C89691] font-medium"
                        >
                          remove
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Capacity Bar */}
                  <div className="w-full bg-[#F1ECE6] rounded-full h-2 mb-4">
                    <div
                      className="bg-[#8FAF9A] h-2 rounded-full transition-all"
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
                        className="flex justify-between items-center bg-[#F1ECE6] bg-opacity-50 p-3 rounded cursor-move hover:bg-opacity-75 transition-all"
                      >
                        <span className="font-medium text-[#2F2F2F]">{guest}</span>
                        <button
                          onClick={() => removeGuestFromTable(table.id, guest)}
                          className="text-[#D8A7A1] hover:text-[#C89691] font-semibold text-sm"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                    {table.guests.length === 0 && (
                      <p className="text-[#6B6B6B] italic text-center py-4">
                        Drag guests here
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Unassigned Guests */}
            <div className="wedding-card">
              <h3 className="font-display text-xl font-semibold text-[#2F2F2F] mb-4">Unassigned Guests</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {guests
                  .map((g) => g.name)
                  .filter((name) => !tables.some((t) => t.guests.includes(name)))
                  .map((guestName) => (
                    <div
                      key={guestName}
                      draggable
                      onDragStart={(e) => handleDragStart(e, guestName)}
                      className="bg-[#FAF8F4] border border-[#F1ECE6] p-3 rounded cursor-move hover:bg-[#F1ECE6] transition-colors text-center font-medium text-[#2F2F2F]"
                    >
                      {guestName}
                    </div>
                  ))}
              </div>
              {guests.filter((g) => !tables.some((t) => t.guests.includes(g.name))).length === 0 && (
                <p className="text-[#6B6B6B] italic">All guests assigned to tables</p>
              )}
            </div>
          </>
        )}
      </div>
        </>
      </div>
    </div>
  );
}
