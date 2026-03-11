'use client';

import { useState } from 'react';

interface Table {
  id: string;
  tableNumber: number;
  capacity: number;
  guests: string[];
}

export default function SeatingPage() {
  const [tables, setTables] = useState<Table[]>([
    { id: '1', tableNumber: 1, capacity: 8, guests: ['Maria Silva', 'João Santos', 'Ana Costa'] },
    { id: '2', tableNumber: 2, capacity: 8, guests: ['Pedro Oliveira', 'Lucia Ferreira'] },
    { id: '3', tableNumber: 3, capacity: 8, guests: [] },
  ]);

  const [newTableGuest, setNewTableGuest] = useState({ tableId: tables[0]?.id || '', guestName: '' });

  const addGuestToTable = () => {
    if (newTableGuest.tableId && newTableGuest.guestName) {
      setTables(
        tables.map((t) =>
          t.id === newTableGuest.tableId
            ? { ...t, guests: [...t.guests, newTableGuest.guestName] }
            : t
        )
      );
      setNewTableGuest({ tableId: newTableGuest.tableId, guestName: '' });
    }
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
          <h1 className="text-4xl font-bold">Seating Arrangement</h1>
          <a 
            href="/" 
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Back to Dashboard
          </a>
        </div>

        {/* Add Guest to Table */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow mb-8">
          <h2 className="text-2xl font-bold mb-4">Add Guest to Table</h2>
          <div className="flex gap-4">
            <select
              value={newTableGuest.tableId}
              onChange={(e) => setNewTableGuest({ ...newTableGuest, tableId: e.target.value })}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-slate-700"
            >
              {tables.map((t) => (
                <option key={t.id} value={t.id}>
                  Table {t.tableNumber} ({t.guests.length}/{t.capacity})
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Guest name"
              value={newTableGuest.guestName}
              onChange={(e) => setNewTableGuest({ ...newTableGuest, guestName: e.target.value })}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-slate-700"
            />
            <button
              onClick={addGuestToTable}
              className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
            >
              Add
            </button>
          </div>
        </div>

        {/* Tables Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {tables.map((table) => (
            <div key={table.id} className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold">Table {table.tableNumber}</h3>
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  {table.guests.length}/{table.capacity}
                </span>
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
                  <div key={guest} className="flex justify-between items-center bg-gray-100 dark:bg-slate-700 p-3 rounded">
                    <span>{guest}</span>
                    <button
                      onClick={() => removeGuestFromTable(table.id, guest)}
                      className="text-red-600 hover:text-red-700 font-semibold text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                {table.guests.length === 0 && (
                  <p className="text-gray-500 dark:text-gray-400 italic">No guests assigned</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
