'use client';

import { useEffect, useRef, useState } from 'react';

interface QRScannerProps {
  onScan: (eventId: string) => void;
  onError?: (error: string) => void;
}

export function QRScanner({ onScan, onError }: QRScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const startScanning = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setIsScanning(true);
          setError(null);
        }

        return () => {
          stream.getTracks().forEach((track) => track.stop());
        };
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Camera access denied';
        setError(message);
        onError?.(message);
      }
    };

    startScanning();
  }, [onError]);

  const stopScanning = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      setIsScanning(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg max-w-md">
          {error}
        </div>
      )}

      {isScanning && (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full max-w-md rounded-lg border-2 border-gray-300"
          style={{ maxHeight: '400px' }}
        />
      )}

      <button
        onClick={stopScanning}
        disabled={!isScanning}
        className="px-4 py-2 bg-red-500 text-white rounded-lg disabled:bg-gray-400"
      >
        {isScanning ? 'Stop Camera' : 'Camera Stopped'}
      </button>

      <p className="text-sm text-gray-600 text-center">
        📝 Hoặc nhập eventId thủ công phía dưới
      </p>
    </div>
  );
}
