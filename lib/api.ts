const API_BASE = 'http://localhost:5000/api';

export const qrCheckInAPI = {
  // Get all events
  getEvents: async () => {
    const res = await fetch(`${API_BASE}/events`);
    if (!res.ok) throw new Error('Failed to fetch events');
    return res.json();
  },

  // Get event by ID
  getEvent: async (eventId: string) => {
    const res = await fetch(`${API_BASE}/events/${eventId}`);
    if (!res.ok) throw new Error('Event not found');
    return res.json();
  },

  // Create event
  createEvent: async (
    eventId: string,
    name: string,
    description?: string,
    location?: string,
    createdBy?: string
  ) => {
    const res = await fetch(`${API_BASE}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventId,
        name,
        description: description || '',
        location: location || '',
        createdBy: createdBy || 'admin'
      })
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Failed to create event');
    }
    return res.json();
  },

  // Record check-in
  checkIn: async (eventId: string, walletAddress: string, txHash?: string) => {
    const res = await fetch(`${API_BASE}/events/${eventId}/checkin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ walletAddress, txHash })
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Failed to check in');
    }
    return res.json();
  },

  // Get participants
  getParticipants: async (eventId: string) => {
    const res = await fetch(`${API_BASE}/events/${eventId}/participants`);
    if (!res.ok) throw new Error('Failed to fetch participants');
    return res.json();
  },

  // Delete event
  deleteEvent: async (eventId: string) => {
    const res = await fetch(`${API_BASE}/events/${eventId}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('Failed to delete event');
    return res.json();
  }
};
