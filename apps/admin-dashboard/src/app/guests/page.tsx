'use client';

import { useState } from 'react';

interface Guest {
  id: string;
  name: string;
  email: string;
  rsvpStatus: 'pending' | 'confirmed' | 'declined';
  plusOnes: number;
  dietary: string;
}

export default function GuestsPage() {
  const [guests, setGuests] = useState<Guest[]>([
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
  ]);

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

        {/* Add Guest Form */}
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
      </div>
    </main>
  );
}
