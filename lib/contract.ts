// Iota CheckinRegistry Contract Configuration
// Contract functions defined in Move smart contract

export const CONTRACT_FUNCTIONS = {
  createEvent: 'create_event',
  checkIn: 'check_in',
  getEvent: 'get_event',
  hasUserCheckedIn: 'has_user_checked_in',
  getParticipants: 'get_participants',
  getTotalEvents: 'get_total_events',
  deactivateEvent: 'deactivate_event',
};

// Contract package ID (set after deployment)
export const CONTRACT_PACKAGE_ID = process.env.NEXT_PUBLIC_IOTA_CONTRACT_ID || '0xd3b09e164b000d53349caf1a4745c4477cb486b10c7bd33c388d0d2e97539c96';

// Registry object ID (set after deployment)
export const REGISTRY_OBJECT_ID = process.env.NEXT_PUBLIC_REGISTRY_OBJECT_ID || '0xf88879388ce98a9527378db11079a3571afda2c6a36f8d2ab8d9ff49a6c7b1c3';
