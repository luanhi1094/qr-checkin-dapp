'use client';

import React from 'react';

import { useState } from 'react';
import { useCurrentAccount } from '@iota/dapp-kit';
import { qrCheckInAPI } from '@/lib/api';
import { QRScanner } from '@/components/QRScanner';
import { ManualEventIdInput } from '@/components/ManualEventIdInput';
import { IotaConnectButton } from '@/components/IotaConnectButton';
import Link from 'next/link';

interface EventInfo {
  eventId: string;
  name: string;
  description: string;
  location: string;
}

export default function ScanPage() {
  const account = useCurrentAccount();
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [eventInfo, setEventInfo] = useState<EventInfo | null>(null);
  const [tab, setTab] = useState<'qr' | 'manual'>('qr');
  const [loading, setLoading] = useState(false);
  const [checkInLoading, setCheckInLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleScanOrInput = async (eventId: string) => {
    setSelectedEventId(eventId);
    setError(null);
    setLoading(true);
    
    try {
      const data = await qrCheckInAPI.getEvent(eventId);
      setEventInfo(data);
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : 'Không tìm thấy sự kiện này';
      setError(errMsg);
      alert(`❌ ${errMsg}`);
      setSelectedEventId(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async () => {
    if (!selectedEventId || !account?.address) return;

    setCheckInLoading(true);
    setError(null);
    
    try {
      // Call backend API to record check-in
      await qrCheckInAPI.checkIn(selectedEventId, account.address, `tx_${Date.now()}`);
      alert('✅ Check-in thành công!');
      setSelectedEventId(null);
      setEventInfo(null);
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : 'Check-in thất bại';
      setError(errMsg);
      alert(`❌ ${errMsg}`);
    } finally {
      setCheckInLoading(false);
    }
  };

  if (!account) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h2 className="text-lg font-bold text-yellow-800 mb-2">⚠️ Kết nối ví Iota</h2>
            <p className="text-yellow-700 mb-4">
              Vui lòng kết nối ví Iota Firefly của bạn để check-in sự kiện.
            </p>
            <IotaConnectButton />
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
          <h1 className="text-3xl font-bold text-gray-800">📱 Quét QR Code</h1>
          <Link
            href="/"
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
          >
            ← Quay lại
          </Link>
        </div>

        {/* Tabs */}
        {!selectedEventId && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex gap-4 mb-6 border-b">
              <button
                onClick={() => setTab('qr')}
                className={`pb-2 px-4 font-medium transition ${
                  tab === 'qr'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                📷 Quét QR
              </button>
              <button
                onClick={() => setTab('manual')}
                className={`pb-2 px-4 font-medium transition ${
                  tab === 'manual'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                ✏️ Nhập Thủ Công
              </button>
            </div>

            {tab === 'qr' && (
              <div>
                <p className="text-gray-600 mb-4">
                  Hướng camera của bạn vào QR code để quét
                </p>
                <QRScanner
                  onScan={handleScanOrInput}
                  onError={(error) => console.error('Scanner error:', error)}
                />
              </div>
            )}

            {tab === 'manual' && (
              <div>
                <p className="text-gray-600 mb-4">
                  Hoặc nhập Event ID thủ công
                </p>
                <ManualEventIdInput
                  onSubmit={handleScanOrInput}
                  loading={loading}
                />
              </div>
            )}
          </div>
        )}

        {/* Event Info */}
        {selectedEventId && eventInfo && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Thông Tin Sự Kiện</h2>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-700">❌ {error}</p>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{eventInfo.name}</h3>
              <p className="text-gray-600 mb-2">{eventInfo.description}</p>
              <p className="text-gray-600 text-sm mb-2">📍 {eventInfo.location || 'Không có địa điểm'}</p>
              <p className="text-sm text-gray-500">Event ID: {eventInfo.eventId}</p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleCheckIn}
                disabled={checkInLoading}
                className="flex-1 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-400 font-bold text-lg transition"
              >
                {checkInLoading ? '⏳ Đang Check-in...' : '✅ Check-in Ngay'}
              </button>
              <button
                onClick={() => {
                  setSelectedEventId(null);
                  setEventInfo(null);
                  setError(null);
                }}
                className="px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 font-medium transition"
              >
                Hủy
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
