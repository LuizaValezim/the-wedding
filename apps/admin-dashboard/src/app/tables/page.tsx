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
    <div className="min-h-screen p-8 bg-[#F8F6F1]">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-display text-5xl font-bold text-[#2F2F2F] mb-2">Seating Chart</h1>
        <p className="text-[#6B6B6B] mb-8">Manage table assignments</p>

        {/* Add Guest to Table */}
        <div className="wedding-card p-6 rounded-lg shadow mb-8">
          <h2 className="font-display text-2xl font-semibold text-[#2F2F2F] mb-4">Add Guest to Table</h2>
          <div className="flex gap-4">
            <select
              value={newTableGuest.tableId}
              onChange={(e) => setNewTableGuest({ ...newTableGuest, tableId: e.target.value })}
              className="flex-1 px-4 py-2 border border-[#F1ECE6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8FAF9A] text-[#2F2F2F]"
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
              className="flex-1 px-4 py-2 border border-[#F1ECE6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8FAF9A] text-[#2F2F2F]"
            />
            <button
              onClick={addGuestToTable}
              className="px-6 py-2 bg-[#8FAF9A] text-white rounded-lg hover:bg-[#7A9988] font-display"
            >
              Add
            </button>
          </div>
        </div>

        {/* Tables Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {tables.map((table) => (
            <div key={table.id} className="wedding-card rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-display text-2xl font-semibold text-[#2F2F2F]">Table {table.tableNumber}</h3>
                <span className="text-sm font-semibold text-[#6B6B6B]">
                  {table.guests.length}/{table.capacity}
                </span>
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
                  <div key={guest} className="wedding-card flex justify-between items-center p-3 rounded">
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
    </div>
  );
}
