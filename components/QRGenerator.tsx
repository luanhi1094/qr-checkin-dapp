'use client';

import { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

interface QRGeneratorProps {
  eventId: number;
  size?: number;
}

export function QRGenerator({ eventId, size = 300 }: QRGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current && eventId > 0) {
      // QR code sẽ chứa URL để scan
      const qrUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/scan?eventId=${eventId}`;

      QRCode.toCanvas(canvasRef.current, qrUrl, {
        width: size,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
      }).catch((error) => {
        console.error('Error generating QR code:', error);
      });
    }
  }, [eventId, size]);

  return (
    <div className="flex flex-col items-center gap-4">
      <canvas
        ref={canvasRef}
        className="border-2 border-gray-300 rounded-lg"
        style={{ width: size, height: size }}
      />
      <p className="text-sm text-gray-600">
        Scan để check-in sự kiện #{eventId}
      </p>
    </div>
  );
}
