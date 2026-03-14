'use client';

import { useEffect, useState } from 'react';

type VenueStatus =
  | 'researching'
  | 'contacted'
  | 'visited'
  | 'shortlisted'
  | 'booked'
  | 'declined';

type HostingType = 'indoor' | 'outdoor' | 'both';

interface Venue {
  id: string;
  name: string;
  status: VenueStatus;
  rating: number;
  cost: number;
  distance: string;
  package: string;
  availableDates: string;
  hosting: HostingType;
  address: string;
  visited: boolean;
  instagram: string;
  proposalFileName: string;
  notes: string;
  capacity: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  website: string;
}

const STORAGE_KEY = 'weddingVenues';

const STATUS_OPTIONS: { value: VenueStatus; label: string }[] = [
  { value: 'researching', label: 'Researching' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'visited', label: 'Visited' },
  { value: 'shortlisted', label: 'Shortlisted' },
  { value: 'booked', label: 'Booked' },
  { value: 'declined', label: 'Declined' },
];

const HOSTING_OPTIONS: { value: HostingType; label: string }[] = [
  { value: 'indoor', label: 'Indoor' },
  { value: 'outdoor', label: 'Outdoor' },
  { value: 'both', label: 'Indoor + Outdoor' },
];

const statusBadge = (status: VenueStatus) => {
  switch (status) {
    case 'booked':
      return 'bg-green-50 text-green-700';
    case 'shortlisted':
      return 'bg-amber-50 text-amber-700';
    case 'visited':
      return 'bg-blue-50 text-blue-700';
    case 'contacted':
      return 'bg-indigo-50 text-indigo-700';
    case 'declined':
      return 'bg-red-50 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export default function VenuesPage() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [costInput, setCostInput] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingVenue, setEditingVenue] = useState<Venue | null>(null);
  const [editingCostInput, setEditingCostInput] = useState('');
  const [newVenue, setNewVenue] = useState<Omit<Venue, 'id'>>({
    name: '',
    status: 'researching',
    rating: 3,
    cost: 0,
    distance: '',
    package: '',
    availableDates: '',
    hosting: 'indoor',
    address: '',
    visited: false,
    instagram: '',
    proposalFileName: '',
    notes: '',
    capacity: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    website: '',
  });

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

  const parseCurrency = (value: string) => {
    const normalized = value.replace(/[^0-9.]/g, '');
    const parsed = Number.parseFloat(normalized);
    return Number.isFinite(parsed) ? parsed : 0;
  };

  const updateBudgetWithBookedVenue = (venueCost: number) => {
    try {
      const savedBudget = (global as any).window?.localStorage?.getItem('weddingBudget');
      if (!savedBudget) return;
      const parsed = JSON.parse(savedBudget);
      if (!Array.isArray(parsed)) return;
      const updated = parsed.map((item: any) =>
        item?.category === 'Venue'
          ? { ...item, actual: venueCost }
          : item
      );
      (global as any).window?.localStorage?.setItem('weddingBudget', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to update budget with booked venue', e);
    }
  };

  useEffect(() => {
    try {
      const saved = (global as any).window?.localStorage?.getItem(STORAGE_KEY);
      if (saved) setVenues(JSON.parse(saved));
    } catch (e) {
      console.error('Failed to load venues from localStorage', e);
    }
  }, []);

  useEffect(() => {
    try {
      (global as any).window?.localStorage?.setItem(STORAGE_KEY, JSON.stringify(venues));
    } catch (e) {
      console.error('Failed to save venues to localStorage', e);
    }
  }, [venues]);

  const addVenue = () => {
    if (!newVenue.name.trim()) return;
    const isBooked = newVenue.status === 'booked';
    const nextVenues = [
      ...(isBooked
        ? venues.map((v) =>
            v.status === 'booked' ? { ...v, status: 'shortlisted' } : v
          )
        : venues),
      {
        ...newVenue,
        id: Date.now().toString(),
        name: newVenue.name.trim(),
      },
    ];
    setVenues(nextVenues);
    if (isBooked && newVenue.cost > 0) {
      updateBudgetWithBookedVenue(newVenue.cost);
    }
    setNewVenue({
      name: '',
      status: 'researching',
      rating: 3,
      cost: 0,
      distance: '',
      package: '',
      availableDates: '',
      hosting: 'indoor',
      address: '',
      visited: false,
      instagram: '',
      proposalFileName: '',
      notes: '',
      capacity: '',
      contactName: '',
      contactPhone: '',
      contactEmail: '',
      website: '',
    });
    setCostInput('');
  };

  const startEditing = (venue: Venue) => {
    setEditingId(venue.id);
    setEditingVenue({ ...venue });
    setEditingCostInput(venue.cost > 0 ? formatCurrency(venue.cost) : '');
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingVenue(null);
    setEditingCostInput('');
  };

  const saveEditing = () => {
    if (!editingVenue) return;
    const isBooked = editingVenue.status === 'booked';
    const updated = venues.map((v) =>
      v.id === editingVenue.id ? editingVenue : isBooked && v.status === 'booked' ? { ...v, status: 'shortlisted' } : v
    );
    setVenues(updated);
    if (isBooked && editingVenue.cost > 0) {
      updateBudgetWithBookedVenue(editingVenue.cost);
    }
    cancelEditing();
  };

  const deleteVenue = (id: string) => {
    setVenues(venues.filter((v) => v.id !== id));
  };

  return (
    <div className="min-h-screen p-8 bg-[#F8F6F1]">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-display text-5xl font-bold text-[#2F2F2F] mb-2">Venue Management</h1>
        <p className="text-[#6B6B6B] mb-8">Compare and manage potential wedding venues</p>

        <div className="space-y-8">
          {/* Add Venue */}
          <div className="wedding-card p-6 rounded-lg shadow">
            <h2 className="font-display text-2xl font-semibold text-[#2F2F2F] mb-4">Add Venue</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Venue Name"
                value={newVenue.name}
                onChange={(e) => setNewVenue({ ...newVenue, name: e.target.value })}
                className="px-4 py-2 border border-[#F1ECE6] rounded-lg bg-white text-[#2F2F2F] focus:outline-none focus:ring-2 focus:ring-[#8FAF9A]"
              />
              <select
                value={newVenue.status}
                onChange={(e) => setNewVenue({ ...newVenue, status: e.target.value as VenueStatus })}
                className="px-4 py-2 border border-[#F1ECE6] rounded-lg bg-white text-[#2F2F2F] focus:outline-none focus:ring-2 focus:ring-[#8FAF9A]"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <select
                value={newVenue.rating}
                onChange={(e) => setNewVenue({ ...newVenue, rating: Number(e.target.value) })}
                className="px-4 py-2 border border-[#F1ECE6] rounded-lg bg-white text-[#2F2F2F] focus:outline-none focus:ring-2 focus:ring-[#8FAF9A]"
              >
                {[1, 2, 3, 4, 5].map((r) => (
                  <option key={r} value={r}>{r} Star{r > 1 ? 's' : ''}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Cost (e.g. $12,000)"
                inputMode="decimal"
                value={costInput}
                onChange={(e) => {
                  const next = e.target.value;
                  setCostInput(next);
                  setNewVenue({ ...newVenue, cost: parseCurrency(next) });
                }}
                onBlur={() => {
                  if (newVenue.cost > 0) {
                    setCostInput(formatCurrency(newVenue.cost));
                  } else {
                    setCostInput('');
                  }
                }}
                className="px-4 py-2 border border-[#F1ECE6] rounded-lg bg-white text-[#2F2F2F] focus:outline-none focus:ring-2 focus:ring-[#8FAF9A]"
              />
              <input
                type="text"
                placeholder="Distance (e.g. 1h20m)"
                value={newVenue.distance}
                onChange={(e) => setNewVenue({ ...newVenue, distance: e.target.value })}
                className="px-4 py-2 border border-[#F1ECE6] rounded-lg bg-white text-[#2F2F2F] focus:outline-none focus:ring-2 focus:ring-[#8FAF9A]"
              />
              <input
                type="text"
                placeholder="Package (venue only, buffet, DJ...)"
                value={newVenue.package}
                onChange={(e) => setNewVenue({ ...newVenue, package: e.target.value })}
                className="px-4 py-2 border border-[#F1ECE6] rounded-lg bg-white text-[#2F2F2F] focus:outline-none focus:ring-2 focus:ring-[#8FAF9A]"
              />
              <input
                type="text"
                placeholder="Available Dates"
                value={newVenue.availableDates}
                onChange={(e) => setNewVenue({ ...newVenue, availableDates: e.target.value })}
                className="px-4 py-2 border border-[#F1ECE6] rounded-lg bg-white text-[#2F2F2F] focus:outline-none focus:ring-2 focus:ring-[#8FAF9A]"
              />
              <select
                value={newVenue.hosting}
                onChange={(e) => setNewVenue({ ...newVenue, hosting: e.target.value as HostingType })}
                className="px-4 py-2 border border-[#F1ECE6] rounded-lg bg-white text-[#2F2F2F] focus:outline-none focus:ring-2 focus:ring-[#8FAF9A]"
              >
                {HOSTING_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Address"
                value={newVenue.address}
                onChange={(e) => setNewVenue({ ...newVenue, address: e.target.value })}
                className="px-4 py-2 border border-[#F1ECE6] rounded-lg bg-white text-[#2F2F2F] focus:outline-none focus:ring-2 focus:ring-[#8FAF9A]"
              />
              <input
                type="text"
                placeholder="Capacity"
                value={newVenue.capacity}
                onChange={(e) => setNewVenue({ ...newVenue, capacity: e.target.value })}
                className="px-4 py-2 border border-[#F1ECE6] rounded-lg bg-white text-[#2F2F2F] focus:outline-none focus:ring-2 focus:ring-[#8FAF9A]"
              />
              <input
                type="text"
                placeholder="Instagram (link or @handle)"
                value={newVenue.instagram}
                onChange={(e) => setNewVenue({ ...newVenue, instagram: e.target.value })}
                className="px-4 py-2 border border-[#F1ECE6] rounded-lg bg-white text-[#2F2F2F] focus:outline-none focus:ring-2 focus:ring-[#8FAF9A]"
              />
              <input
                type="text"
                placeholder="Website"
                value={newVenue.website}
                onChange={(e) => setNewVenue({ ...newVenue, website: e.target.value })}
                className="px-4 py-2 border border-[#F1ECE6] rounded-lg bg-white text-[#2F2F2F] focus:outline-none focus:ring-2 focus:ring-[#8FAF9A]"
              />
              <input
                type="text"
                placeholder="Contact Name"
                value={newVenue.contactName}
                onChange={(e) => setNewVenue({ ...newVenue, contactName: e.target.value })}
                className="px-4 py-2 border border-[#F1ECE6] rounded-lg bg-white text-[#2F2F2F] focus:outline-none focus:ring-2 focus:ring-[#8FAF9A]"
              />
              <input
                type="text"
                placeholder="Contact Phone"
                value={newVenue.contactPhone}
                onChange={(e) => setNewVenue({ ...newVenue, contactPhone: e.target.value })}
                className="px-4 py-2 border border-[#F1ECE6] rounded-lg bg-white text-[#2F2F2F] focus:outline-none focus:ring-2 focus:ring-[#8FAF9A]"
              />
              <input
                type="email"
                placeholder="Contact Email"
                value={newVenue.contactEmail}
                onChange={(e) => setNewVenue({ ...newVenue, contactEmail: e.target.value })}
                className="px-4 py-2 border border-[#F1ECE6] rounded-lg bg-white text-[#2F2F2F] focus:outline-none focus:ring-2 focus:ring-[#8FAF9A]"
              />
              <label className="flex items-center gap-3 text-[#2F2F2F]">
                <input
                  type="checkbox"
                  checked={newVenue.visited}
                  onChange={(e) => setNewVenue({ ...newVenue, visited: e.target.checked })}
                  className="w-4 h-4 accent-[#8FAF9A]"
                />
                Visited
              </label>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-[#2F2F2F] mb-2">Proposal File</label>
                <input
                  type="file"
                  onChange={(e) =>
                    setNewVenue({
                      ...newVenue,
                      proposalFileName: e.target.files?.[0]?.name ?? '',
                    })
                  }
                  className="w-full text-sm text-[#2F2F2F]"
                />
                {newVenue.proposalFileName && (
                  <p className="text-sm text-[#6B6B6B] mt-1">
                    Selected: {newVenue.proposalFileName}
                  </p>
                )}
              </div>
              <textarea
                placeholder="Notes"
                value={newVenue.notes}
                onChange={(e) => setNewVenue({ ...newVenue, notes: e.target.value })}
                className="md:col-span-3 px-4 py-2 border border-[#F1ECE6] rounded-lg bg-white text-[#2F2F2F] focus:outline-none focus:ring-2 focus:ring-[#8FAF9A]"
                rows={3}
              />
            </div>
            <div className="mt-4">
              <button onClick={addVenue} className="wedding-button-primary">
                + Add Venue
              </button>
            </div>
          </div>

          {/* Venues List */}
          {venues.length === 0 ? (
            <div className="wedding-card text-center py-12">
              <div className="text-5xl mb-4">🏛️</div>
              <h3 className="font-display text-2xl font-light text-[#2F2F2F] mb-2">No Venues Added Yet</h3>
              <p className="text-[#6B6B6B]">Start adding venues to compare and track your options</p>
            </div>
          ) : (
            <div className="wedding-card rounded-lg shadow">
              <div className="overflow-x-auto">
                <table className="min-w-[1200px] w-full text-sm">
                <thead className="bg-white">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Venue</th>
                    <th className="px-4 py-3 text-left font-semibold">Status</th>
                    <th className="px-4 py-3 text-left font-semibold">Rating</th>
                    <th className="px-4 py-3 text-left font-semibold">Cost</th>
                    <th className="px-4 py-3 text-left font-semibold">Distance</th>
                    <th className="px-4 py-3 text-left font-semibold">Package</th>
                    <th className="px-4 py-3 text-left font-semibold">Dates</th>
                    <th className="px-4 py-3 text-left font-semibold">Hosting</th>
                    <th className="px-4 py-3 text-left font-semibold">Address</th>
                    <th className="px-4 py-3 text-left font-semibold">Visited</th>
                    <th className="px-4 py-3 text-left font-semibold">Instagram</th>
                    <th className="px-4 py-3 text-left font-semibold">Proposal</th>
                    <th className="px-4 py-3 text-left font-semibold">Notes</th>
                    <th className="px-4 py-3 text-left font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {venues.map((venue) =>
                    editingId === venue.id && editingVenue ? (
                      <tr key={venue.id} className="border-t border-[#F1ECE6]">
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={editingVenue.name}
                            onChange={(e) =>
                              setEditingVenue({ ...editingVenue, name: e.target.value })
                            }
                            className="px-3 py-1 border border-[#F1ECE6] rounded w-full bg-white text-[#2F2F2F] focus:outline-none focus:ring-2 focus:ring-[#8FAF9A]"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <select
                            value={editingVenue.status}
                            onChange={(e) =>
                              setEditingVenue({ ...editingVenue, status: e.target.value as VenueStatus })
                            }
                            className="px-3 py-1 border border-[#F1ECE6] rounded w-full bg-white text-[#2F2F2F] focus:outline-none focus:ring-2 focus:ring-[#8FAF9A]"
                          >
                            {STATUS_OPTIONS.map((opt) => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </select>
                        </td>
                        <td className="px-4 py-3">
                          <select
                            value={editingVenue.rating}
                            onChange={(e) =>
                              setEditingVenue({ ...editingVenue, rating: Number(e.target.value) })
                            }
                            className="px-3 py-1 border border-[#F1ECE6] rounded w-full bg-white text-[#2F2F2F] focus:outline-none focus:ring-2 focus:ring-[#8FAF9A]"
                          >
                            {[1, 2, 3, 4, 5].map((r) => (
                              <option key={r} value={r}>{r}</option>
                            ))}
                          </select>
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={editingCostInput}
                            onChange={(e) => {
                              const next = e.target.value;
                              setEditingCostInput(next);
                              setEditingVenue({ ...editingVenue, cost: parseCurrency(next) });
                            }}
                            onBlur={() => {
                              if (editingVenue.cost > 0) {
                                setEditingCostInput(formatCurrency(editingVenue.cost));
                              } else {
                                setEditingCostInput('');
                              }
                            }}
                            className="px-3 py-1 border border-[#F1ECE6] rounded w-full bg-white text-[#2F2F2F] focus:outline-none focus:ring-2 focus:ring-[#8FAF9A]"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={editingVenue.distance}
                            onChange={(e) =>
                              setEditingVenue({ ...editingVenue, distance: e.target.value })
                            }
                            className="px-3 py-1 border border-[#F1ECE6] rounded w-full bg-white text-[#2F2F2F] focus:outline-none focus:ring-2 focus:ring-[#8FAF9A]"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={editingVenue.package}
                            onChange={(e) =>
                              setEditingVenue({ ...editingVenue, package: e.target.value })
                            }
                            className="px-3 py-1 border border-[#F1ECE6] rounded w-full bg-white text-[#2F2F2F] focus:outline-none focus:ring-2 focus:ring-[#8FAF9A]"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={editingVenue.availableDates}
                            onChange={(e) =>
                              setEditingVenue({ ...editingVenue, availableDates: e.target.value })
                            }
                            className="px-3 py-1 border border-[#F1ECE6] rounded w-full bg-white text-[#2F2F2F] focus:outline-none focus:ring-2 focus:ring-[#8FAF9A]"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <select
                            value={editingVenue.hosting}
                            onChange={(e) =>
                              setEditingVenue({ ...editingVenue, hosting: e.target.value as HostingType })
                            }
                            className="px-3 py-1 border border-[#F1ECE6] rounded w-full bg-white text-[#2F2F2F] focus:outline-none focus:ring-2 focus:ring-[#8FAF9A]"
                          >
                            {HOSTING_OPTIONS.map((opt) => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </select>
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={editingVenue.address}
                            onChange={(e) =>
                              setEditingVenue({ ...editingVenue, address: e.target.value })
                            }
                            className="px-3 py-1 border border-[#F1ECE6] rounded w-full bg-white text-[#2F2F2F] focus:outline-none focus:ring-2 focus:ring-[#8FAF9A]"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <label className="flex items-center gap-2 text-[#2F2F2F]">
                            <input
                              type="checkbox"
                              checked={editingVenue.visited}
                              onChange={(e) =>
                                setEditingVenue({ ...editingVenue, visited: e.target.checked })
                              }
                              className="w-4 h-4 accent-[#8FAF9A]"
                            />
                            Visited
                          </label>
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={editingVenue.instagram}
                            onChange={(e) =>
                              setEditingVenue({ ...editingVenue, instagram: e.target.value })
                            }
                            className="px-3 py-1 border border-[#F1ECE6] rounded w-full bg-white text-[#2F2F2F] focus:outline-none focus:ring-2 focus:ring-[#8FAF9A]"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={editingVenue.proposalFileName}
                            onChange={(e) =>
                              setEditingVenue({ ...editingVenue, proposalFileName: e.target.value })
                            }
                            placeholder="Filename"
                            className="px-3 py-1 border border-[#F1ECE6] rounded w-full bg-white text-[#2F2F2F] focus:outline-none focus:ring-2 focus:ring-[#8FAF9A]"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={editingVenue.notes}
                            onChange={(e) =>
                              setEditingVenue({ ...editingVenue, notes: e.target.value })
                            }
                            className="px-3 py-1 border border-[#F1ECE6] rounded w-full bg-white text-[#2F2F2F] focus:outline-none focus:ring-2 focus:ring-[#8FAF9A]"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={saveEditing}
                              className="px-3 py-1 bg-[#8FAF9A] text-white rounded text-xs font-medium hover:bg-[#7A9988]"
                            >
                              Save
                            </button>
                            <button
                              onClick={cancelEditing}
                              className="px-3 py-1 bg-[#6B6B6B] text-white rounded text-xs font-medium hover:bg-[#5A5A5A]"
                            >
                              Cancel
                            </button>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      <tr key={venue.id} className="border-t border-[#F1ECE6]">
                        <td className="px-4 py-3 font-semibold">{venue.name}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusBadge(venue.status)}`}>
                            {STATUS_OPTIONS.find((s) => s.value === venue.status)?.label}
                          </span>
                        </td>
                        <td className="px-4 py-3">{venue.rating}★</td>
                        <td className="px-4 py-3">
                          {venue.cost > 0 ? formatCurrency(venue.cost) : '-'}
                        </td>
                        <td className="px-4 py-3">{venue.distance}</td>
                        <td className="px-4 py-3">{venue.package}</td>
                        <td className="px-4 py-3">{venue.availableDates}</td>
                        <td className="px-4 py-3">{HOSTING_OPTIONS.find((h) => h.value === venue.hosting)?.label}</td>
                        <td className="px-4 py-3">{venue.address}</td>
                        <td className="px-4 py-3">{venue.visited ? 'Yes' : 'No'}</td>
                        <td className="px-4 py-3">{venue.instagram}</td>
                        <td className="px-4 py-3">{venue.proposalFileName || '-'}</td>
                        <td className="px-4 py-3">{venue.notes}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => startEditing(venue)}
                              className="px-3 py-1 bg-[#8FAF9A] text-white rounded text-xs font-medium hover:bg-[#7A9988]"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteVenue(venue.id)}
                              className="px-3 py-1 bg-red-600 text-white rounded text-xs font-medium hover:bg-red-700"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
