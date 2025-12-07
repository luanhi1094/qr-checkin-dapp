'use client';

import { useState } from 'react';

interface ManualEventIdInputProps {
  onSubmit: (eventId: string) => void;
  loading?: boolean;
}

export function ManualEventIdInput({ onSubmit, loading = false }: ManualEventIdInputProps) {
  const [eventId, setEventId] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!eventId.trim()) {
      setError('Vui lòng nhập Event ID');
      return;
    }

    if (!/^\d+$/.test(eventId)) {
      setError('Event ID phải là số');
      return;
    }

    setError(null);
    onSubmit(eventId);
    setEventId('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Event ID
        </label>
        <input
          type="text"
          value={eventId}
          onChange={(e) => {
            setEventId(e.target.value);
            setError(null);
          }}
          placeholder="Nhập Event ID"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading || !eventId.trim()}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 font-medium"
      >
        {loading ? 'Đang xử lý...' : 'Tiếp tục'}
      </button>
    </form>
  );
}
