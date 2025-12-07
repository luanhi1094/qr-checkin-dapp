'use client';

import React from 'react';
import Link from 'next/link';
import { useCurrentAccount } from '@iota/dapp-kit';
import { IotaConnectButton } from '@/components/IotaConnectButton';

export default function Home() {
  const account = useCurrentAccount();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b border-blue-200 bg-white/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">📍 QR Check-in DApp</h1>
          <IotaConnectButton />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Hệ thống Check-in Phi tập trung
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tạo sự kiện và check-in trên blockchain bằng QR code. 
            Dữ liệu bạn kiểm soát, công khai và an toàn.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Create Event Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition">
            <div className="text-4xl mb-4">📋</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Tạo Sự Kiện</h3>
            <p className="text-gray-600 mb-6">
              Quản trị viên tạo sự kiện mới và nhận QR code
            </p>
            {account ? (
              <Link
                href="/admin"
                className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Vào Admin →
              </Link>
            ) : (
              <button className="px-4 py-2 bg-gray-300 text-gray-600 rounded-lg cursor-not-allowed">
                Kết nối ví trước
              </button>
            )}
          </div>

          {/* Scan QR Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Quét QR Code</h3>
            <p className="text-gray-600 mb-6">
              Người dùng quét QR code để check-in sự kiện
            </p>
            <Link
              href="/scan"
              className="inline-block px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              Mở Scanner →
            </Link>
          </div>

          {/* Check Status Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition">
            <div className="text-4xl mb-4">✅</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Kiểm Tra Trạng Thái</h3>
            <p className="text-gray-600 mb-6">
              Xem trạng thái check-in của bạn cho mỗi sự kiện
            </p>
            {account ? (
              <Link
                href="/event"
                className="inline-block px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
              >
                Xem Sự Kiện →
              </Link>
            ) : (
              <button className="px-4 py-2 bg-gray-300 text-gray-600 rounded-lg cursor-not-allowed">
                Kết nối ví trước
              </button>
            )}
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Cách Hoạt Động</h3>
          <ol className="space-y-4">
            <li className="flex gap-4">
              <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                1
              </span>
              <div>
                <p className="font-semibold text-gray-800">Admin tạo sự kiện</p>
                <p className="text-gray-600">Truy cập trang Admin, nhập tên và mô tả sự kiện</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                2
              </span>
              <div>
                <p className="font-semibold text-gray-800">QR code được tạo</p>
                <p className="text-gray-600">Hệ thống tạo QR code chứa event ID</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                3
              </span>
              <div>
                <p className="font-semibold text-gray-800">Người dùng quét QR</p>
                <p className="text-gray-600">Hoặc nhập event ID thủ công</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                4
              </span>
              <div>
                <p className="font-semibold text-gray-800">Kết nối MetaMask và check-in</p>
                <p className="text-gray-600">Ký giao dịch blockchain để hoàn tất check-in</p>
              </div>
            </li>
          </ol>
        </div>

        {/* Tech Stack */}
        <div className="bg-indigo-50 rounded-xl p-8 border border-indigo-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4">🔧 Công Nghệ</h3>
          <div className="grid md:grid-cols-2 gap-4 text-gray-700">
            <div>
              <p className="font-semibold">Frontend:</p>
              <p className="text-sm">Next.js 16, React, Tailwind CSS</p>
            </div>
            <div>
              <p className="font-semibold">Blockchain:</p>
              <p className="text-sm">Solidity, Hardhat, Sepolia Testnet</p>
            </div>
            <div>
              <p className="font-semibold">Web3:</p>
              <p className="text-sm">Wagmi, Viem, Rainbow Kit</p>
            </div>
            <div>
              <p className="font-semibold">Features:</p>
              <p className="text-sm">QR Generation, QR Scanner, MetaMask</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-blue-200 bg-white/80 backdrop-blur mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-gray-600">
          <p>© 2025 QR Check-in DApp. Built with blockchain technology.</p>
        </div>
      </footer>
    </div>
  );
}
