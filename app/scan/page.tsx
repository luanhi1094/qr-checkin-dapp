'use client';

import React from 'react';

import { useState } from 'react';
import { useCurrentAccount } from '@iota/dapp-kit';
import { useCheckIn, useGetEvent } from '@/hooks/useContract';
import { QRScanner } from '@/components/QRScanner';
import { ManualEventIdInput } from '@/components/ManualEventIdInput';
import { IotaConnectButton } from '@/components/IotaConnectButton';
import Link from 'next/link';

interface EventInfo {
  id: string;
  name: string;
  description: string;
}

export default function ScanPage() {
  const account = useCurrentAccount();
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [eventInfo, setEventInfo] = useState<EventInfo | null>(null);
  const [tab, setTab] = useState<'qr' | 'manual'>('qr');

  const { data: event } = useGetEvent(selectedEventId);
  const { checkIn, isPending: isCheckingIn } = useCheckIn();

  const handleScanOrInput = async (eventId: string) => {
    setSelectedEventId(eventId);
    // Fetch event info from contract
    try {
      // In a real app, you'd fetch from the contract
      setEventInfo({
        id: eventId,
        name: `Event #${eventId}`,
        description: 'Event từ blockchain',
      });
    } catch (error) {
      alert('Không tìm thấy sự kiện này');
      setSelectedEventId(null);
    }
  };

  const handleCheckIn = async () => {
    if (!selectedEventId) return;

    try {
      await checkIn(selectedEventId);
      alert('✅ Check-in thành công!');
      setSelectedEventId(null);
      setEventInfo(null);
    } catch (error) {
      alert(`❌ Lỗi: ${error instanceof Error ? error.message : 'Không xác định'}`);
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
                  loading={false}
                />
              </div>
            )}
          </div>
        )}

        {/* Event Info */}
        {selectedEventId && eventInfo && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Thông Tin Sự Kiện</h2>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{eventInfo.name}</h3>
              <p className="text-gray-600 mb-4">{eventInfo.description}</p>
              <p className="text-sm text-gray-500">Event ID: {eventInfo.id}</p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleCheckIn}
                disabled={isCheckingIn}
                className="flex-1 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-400 font-bold text-lg transition"
              >
                {isCheckingIn ? '⏳ Đang Check-in...' : '✅ Check-in Ngay'}
              </button>
              <button
                onClick={() => {
                  setSelectedEventId(null);
                  setEventInfo(null);
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
