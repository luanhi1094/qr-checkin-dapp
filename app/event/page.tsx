'use client';

import React, { useState, useEffect } from 'react';
import { useCurrentAccount } from '@iota/dapp-kit';
import { qrCheckInAPI } from '@/lib/api';
import Link from 'next/link';

interface EventData {
  eventId: string;
  name: string;
  description?: string;
  location?: string;
  participants: Array<{
    walletAddress: string;
    checkedInAt: string;
  }>;
}

export default function EventPage() {
  const account = useCurrentAccount();
  const [eventId, setEventId] = useState<string>('');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (eventId.trim()) {
      setSelectedEventId(eventId);
    }
  };

  // Load event data
  useEffect(() => {
    const loadEvent = async () => {
      if (!selectedEventId) {
        setEvent(null);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await qrCheckInAPI.getEvent(selectedEventId);
        setEvent(data);
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Failed to load event';
        setError(errorMsg);
        setEvent(null);
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
  }, [selectedEventId]);

  if (!account) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h2 className="text-lg font-bold text-yellow-800 mb-2">⚠️ Kết nối ví Iota</h2>
            <p className="text-yellow-700">
              Vui lòng kết nối ví Iota Firefly của bạn để kiểm tra trạng thái check-in.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">✅ Kiểm Tra Check-in</h1>
          <Link
            href="/"
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
          >
            ← Quay lại
          </Link>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Tìm Sự Kiện</h2>
          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event ID
              </label>
              <input
                type="text"
                value={eventId}
                onChange={(e) => setEventId(e.target.value)}
                placeholder="Nhập Event ID"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium transition"
            >
              🔍 Tìm Sự Kiện
            </button>
          </form>
        </div>

        {/* Event Status */}
        {selectedEventId && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Chi Tiết Sự Kiện</h2>

            {loading ? (
              <div className="text-center py-8">
                <p className="text-gray-600">⏳ Đang tải...</p>
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <p className="text-red-700">❌ {error}</p>
              </div>
            ) : event ? (
              <div className="space-y-6">
                {/* Event Info */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">{event.name}</h3>
                  <p className="text-gray-600 text-sm mb-1">📍 {event.location || 'Không có địa điểm'}</p>
                  <p className="text-gray-600 text-sm">📝 {event.description || 'Không có mô tả'}</p>
                </div>

                {/* Participants List */}
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    👥 Danh Sách Check-in ({event.participants?.length || 0} người)
                  </h3>
                  {event.participants && event.participants.length > 0 ? (
                    <div className="space-y-2">
                      {event.participants.map((participant, index) => (
                        <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                          <p className="font-mono text-sm text-gray-700">
                            {participant.walletAddress?.slice(0, 10)}...{participant.walletAddress?.slice(-8)}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            ✅ {new Date(participant.checkedInAt).toLocaleString('vi-VN')}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600 text-center py-4">Chưa có ai check-in sự kiện này</p>
                  )}
                </div>

                <button
                  onClick={() => {
                    setSelectedEventId(null);
                    setEventId('');
                  }}
                  className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 font-medium transition"
                >
                  Tìm Sự Kiện Khác
                </button>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-red-600 font-semibold">❌ Không tìm thấy sự kiện</p>
                <p className="text-gray-600 text-sm mt-2">Vui lòng kiểm tra Event ID và thử lại</p>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!selectedEventId && (
          <div className="bg-gray-100 rounded-lg p-12 text-center">
            <p className="text-gray-600 text-lg">
              Nhập Event ID để kiểm tra trạng thái check-in
            </p>
          </div>
        )}

        {/* Info Card */}
        <div className="mt-8 bg-indigo-50 rounded-lg p-6 border border-indigo-200">
          <h3 className="font-bold text-indigo-900 mb-2">ℹ️ Lưu ý</h3>
          <ul className="text-sm text-indigo-800 space-y-1">
            <li>• Địa chỉ ví của bạn: <code className="bg-white px-2 py-1 rounded">{account?.address?.slice(0, 10)}...</code></li>
            <li>• Mỗi ví chỉ có thể check-in một lần cho mỗi sự kiện</li>
            <li>• Dữ liệu check-in được lưu trữ trên blockchain Iota</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
