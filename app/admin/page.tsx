'use client';

import React, { useState, useEffect } from 'react';
import { useCurrentAccount } from '@iota/dapp-kit';
import { qrCheckInAPI } from '@/lib/api';
import { QRGenerator } from '@/components/QRGenerator';
import Link from 'next/link';

interface Event {
  _id?: string;
  eventId: string;
  name: string;
  description?: string;
  createdBy?: string;
  createdAt?: string;
  participants?: any[];
}

export default function AdminPage() {
  const account = useCurrentAccount();
  const [formData, setFormData] = useState({ name: '', description: '', location: '' });
  const [events, setEvents] = useState<Event[]>([]);
  const [createdEventId, setCreatedEventId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load events on mount
  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const data = await qrCheckInAPI.getEvents();
      setEvents(data);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to load events';
      setError(errorMsg);
      console.error('Error loading events:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert('Vui lòng nhập tên sự kiện');
      return;
    }

    if (!account?.address) {
      alert('Vui lòng kết nối ví trước');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Generate unique event ID
      const newEventId = Date.now().toString();

      // Create event via API
      const result = await qrCheckInAPI.createEvent(
        newEventId,
        formData.name,
        formData.description,
        formData.location,
        account.address
      );

      setEvents([result, ...events]);
      setCreatedEventId(newEventId);
      setFormData({ name: '', description: '', location: '' });
      alert('✅ Sự kiện được tạo thành công!');
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to create event';
      setError(errorMsg);
      alert(`❌ Lỗi: ${errorMsg}`);    }
  };

  if (!account) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h2 className="text-lg font-bold text-yellow-800 mb-2">⚠️ Kết nối ví Iota</h2>
            <p className="text-yellow-700">
              Vui lòng kết nối ví Iota Firefly của bạn để truy cập trang Admin.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">📋 Admin Dashboard</h1>
          <Link
            href="/"
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
          >
            ← Quay lại
          </Link>
        </div>

        {/* Create Event Form */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Tạo Sự Kiện Mới</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-base font-bold text-gray-700 mb-3">
                Tên Sự Kiện *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })}
                placeholder="VD: Hội Thảo Web3 2025"
                className="w-full px-4 py-3 text-lg text-gray-900 font-semibold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-base font-bold text-gray-700 mb-3">
                Mô Tả
              </label>
              <textarea
                value={formData.description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Nhập mô tả sự kiện"
                className="w-full px-4 py-3 text-lg text-gray-900 font-semibold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-32 placeholder:text-gray-400"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-base font-bold text-gray-700 mb-3">
                Địa Điểm
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, location: e.target.value })}
                placeholder="VD: Hà Nội, Việt Nam"
                className="w-full px-4 py-3 text-lg text-gray-900 font-semibold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 font-medium transition text-lg"
            >
              {loading ? '⏳ Đang tạo...' : '✨ Tạo Sự Kiện'}
            </button>
          </form>
        </div>

        {/* QR Code Display */}
        {createdEventId && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">📱 QR Code Sự Kiện</h2>
            <div className="flex flex-col items-center gap-4">
              <div className="bg-gray-50 p-8 rounded-lg border-2 border-gray-200">
                <QRGenerator eventId={createdEventId ? parseInt(createdEventId) : 0} />
              </div>
              <p className="text-gray-600 text-center">
                Chia sẻ QR code này để mọi người có thể check-in sự kiện
              </p>
              <button
                onClick={() => {
                  const link = document.querySelector('canvas') as HTMLCanvasElement;
                  if (link) {
                    const url = link.toDataURL('image/png');
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `qr-event-${createdEventId}.png`;
                    a.click();
                  }
                }}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                ⬇️ Tải QR Code
              </button>
            </div>
          </div>
        )}

        {/* Events List */}
        {events.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Danh Sách Sự Kiện</h2>

            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.eventId} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                  <h3 className="font-semibold text-lg text-gray-800">{event.name}</h3>
                  <p className="text-gray-600 text-sm">{event.description || 'Không có mô tả'}</p>
                  <p className="text-gray-500 text-xs mt-2">
                    ID: {event.eventId} | Tạo: {event.createdAt || new Date().toLocaleString('vi-VN')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {events.length === 0 && !createdEventId && (
          <div className="bg-gray-100 rounded-lg p-12 text-center">
            <p className="text-gray-600 text-lg">
              Chưa có sự kiện nào. Tạo một sự kiện mới ở trên!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
