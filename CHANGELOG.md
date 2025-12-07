# QR Check-in dApp - Changelog

## Commit History

### 1. Initial project setup with Next.js 16 and TypeScript
- Set up Next.js 16.0.7 with Turbopack
- Configured TypeScript and Tailwind CSS 4
- Created project structure with app router

### 2. Iota blockchain integration setup
- Added @iota/dapp-kit and @iota/iota-sdk packages
- Created Iota network configuration
- Set up provider with IotaClientProvider and WalletProvider
- Configured testnet endpoint: https://testnet.iota.cafe/api

### 3. Create Move smart contract for check-in registry
- Implemented checkin_registry.move with Move language
- Defined Event, CheckinRegistry, and Participant objects
- Created functions: create_event, check_in, get_event, has_user_checked_in
- Contract deployed to Iota testnet

### 4. Deploy Move contract to Iota testnet
- Successfully published contract to Iota testnet
- Package ID: 0xd3b09e164b000d53349caf1a4745c4477cb486b10c7bd33c388d0d2e97539c96
- Registry Object ID: 0xf88879388ce98a9527378db11079a3571afda2c6a36f8d2ab8d9ff49a6c7b1c3

### 5. Implement custom IotaConnectButton component
- Created custom wallet connection button with useConnectWallet hook
- Added wallet selector dropdown for Iota Wallet and Firefly
- Displays connected wallet address when authenticated

### 6. Create admin dashboard page for event creation
- Built /admin page with event creation form
- Added form for event name and description
- Implemented event list display
- Added QR code generation and download functionality

### 7. Create event details and check-in verification page
- Built /event page for checking event status
- Implemented event ID input for searching events
- Shows check-in participation status per user address
- Displays event details and participant count

### 8. Create QR scan page for check-in
- Built /scan page with QR code scanner integration
- Added manual event ID input as fallback
- Implemented check-in functionality with success/error handling
- Added navigation between tabs (QR scan vs manual input)

### 9. Implement home page with feature overview
- Created landing page with feature highlights
- Added links to admin, scan, and event pages
- Conditional button rendering based on wallet connection
- Educational content about decentralized check-ins

### 10. Create QR code generator component
- Implemented QR code generation using qrcode.react
- Generates QR code from event ID
- Added download functionality for QR code images
- Styled QR code display with proper dimensions

### 11. Create QR scanner component
- Implemented QR code scanner using jsqr and html5-qrcode
- Added camera stream handling
- Supports both file upload and camera capture
- Returns scanned event ID for check-in processing

### 12. Implement useContract hooks with fake data
- Created useCreateEvent hook for event creation
- Implemented useCheckIn hook for participant check-ins
- Added useGetEvent hook for event detail retrieval
- Implemented useHasCheckedIn hook for participation status
- Used fake data objects for UI testing without blockchain interaction

### 13. Update UI styling for better readability
- Increased font sizes across all pages
- Enhanced input/textarea styling with better contrast
- Added font weight (semibold) to text inputs
- Improved label styling with larger text
- Better border styling with border-2 thickness
- Added placeholder text styling for clarity

### 14. Fix TypeScript errors and component imports
- Fixed undefined address variable in event page (use account?.address)
- Corrected import statements for hooks and components
- Updated blockchain reference from Sepolia to Iota
- Ensured proper React imports across all pages

### 15. Configure Iota network endpoint and wallet preferences
- Updated network configuration to use correct Iota testnet URL
- Added wallet preference list (Iota Wallet, Firefly)
- Configured IotaClientProvider with proper network settings
- Ensured compatibility with Iota Wallet browser extension
