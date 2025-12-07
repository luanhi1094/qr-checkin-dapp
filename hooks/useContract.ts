'use client';

import { useSignAndExecuteTransaction, useCurrentAccount } from '@iota/dapp-kit';
import { CONTRACT_PACKAGE_ID, REGISTRY_OBJECT_ID } from '@/lib/contract';
import { useCallback, useState } from 'react';

// Fake data for testing UI/UX
const FAKE_EVENTS: Record<string, any> = {
  '1': {
    id: '1',
    name: 'Hội Thảo Web3 2025',
    description: 'Khám phá tương lai của blockchain và decentralized apps',
    admin: '0x123abc...def',
    active: true,
    participantCount: 42,
  },
  '2': {
    id: '2',
    name: 'Lập trình Move trên Iota',
    description: 'Học cách viết smart contracts với Move language',
    admin: '0x456def...ghi',
    active: true,
    participantCount: 28,
  },
  '3': {
    id: '3',
    name: 'Meetup DeFi Vietnam',
    description: 'Thảo luận về DeFi protocols và opportunities',
    admin: '0x789ghi...jkl',
    active: false,
    participantCount: 56,
  },
};

const FAKE_CHECKINS: Set<string> = new Set();

// Hook để tạo event
export function useCreateEvent() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const account = useCurrentAccount();

  const createEvent = useCallback(
    async (name: string, description: string) => {
      if (!account) {
        setError('Vui lòng kết nối ví');
        return false;
      }

      setIsPending(true);
      setError(null);
      try {
        // Fake implementation for testing
        const newEventId = String(Object.keys(FAKE_EVENTS).length + 1);
        FAKE_EVENTS[newEventId] = {
          id: newEventId,
          name,
          description,
          admin: account.address,
          active: true,
          participantCount: 0,
        };
        console.log('✅ Event created:', name);
        return true;
      } catch (error) {
        console.error('Error creating event:', error);
        setError(error instanceof Error ? error.message : 'Lỗi không xác định');
        return false;
      } finally {
        setIsPending(false);
      }
    },
    [account]
  );

  return { createEvent, isPending, error };
}

// Hook để check in
export function useCheckIn() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const account = useCurrentAccount();

  const checkIn = useCallback(
    async (eventId: bigint) => {
      if (!account) {
        setError('Vui lòng kết nối ví');
        throw new Error('Wallet not connected');
      }

      setIsPending(true);
      setError(null);
      try {
        // Fake implementation
        const key = `${eventId}-user`;
        if (FAKE_CHECKINS.has(key)) {
          throw new Error('Bạn đã check-in sự kiện này rồi');
        }
        FAKE_CHECKINS.add(key);
        const eventKey = String(eventId);
        if (FAKE_EVENTS[eventKey]) {
          FAKE_EVENTS[eventKey].participantCount++;
        }
        console.log('✅ Checked in to event:', eventId);
        return true;
      } catch (error) {
        console.error('Error checking in:', error);
        throw error;
      } finally {
        setIsPending(false);
      }
    },
    [account]
  );

  return { checkIn, isPending, error };
}

// Hook để lấy event info
export function useGetEvent(eventId: bigint | null) {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEvent = useCallback(async () => {
    if (!eventId) return;
    
    setIsLoading(true);
    setError(null);
    try {
      // Fake implementation
      const event = FAKE_EVENTS[String(eventId)];
      if (event) {
        setData(event);
      } else {
        throw new Error('Event không tìm thấy');
      }
    } catch (error) {
      console.error('Error fetching event:', error);
      setError(error instanceof Error ? error.message : 'Không thể tải sự kiện');
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, [eventId]);

  return { data, isLoading, error, fetchEvent };
}

// Hook để check if user đã check in
export function useHasCheckedIn(eventId: bigint | null, user: string | null) {
  const [data, setData] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = useCallback(async () => {
    if (!eventId || !user) return;
    
    setIsLoading(true);
    setError(null);
    try {
      // Fake implementation
      const key = `${eventId}-user`;
      const hasCheckedIn = FAKE_CHECKINS.has(key);
      setData(hasCheckedIn);
    } catch (error) {
      console.error('Error checking status:', error);
      setError(error instanceof Error ? error.message : 'Không thể kiểm tra trạng thái');
      setData(false);
    } finally {
      setIsLoading(false);
    }
  }, [eventId, user]);

  return { data, isLoading, error, fetchStatus };
}

