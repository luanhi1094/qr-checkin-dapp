module qr_checkin_dapp::checkin_registry {
    use iota::object::{Self, UID};
    use iota::tx_context::{Self, TxContext};
    use iota::table::{Self, Table};
    use iota::event;
    use std::string::String;
    use std::vector;

    /// Event emitted when a new event is created
    public struct EventCreated has copy, drop {
        event_id: u64,
        name: String,
        admin: address,
        created_at: u64,
    }

    /// Event emitted when a user checks in
    public struct CheckinSuccess has copy, drop {
        event_id: u64,
        participant: address,
        timestamp: u64,
    }

    /// Represents an event
    public struct Event has store {
        id: u64,
        name: String,
        description: String,
        admin: address,
        created_at: u64,
        checkins_count: u64,
        active: bool,
        participants: vector<address>,
    }

    /// Represents a check-in record
    public struct Checkin has store {
        participant: address,
        timestamp: u64,
    }

    /// Main registry object
    public struct CheckinRegistry has key {
        id: UID,
        events: Table<u64, Event>,
        checkins: Table<u64, vector<Checkin>>,
        next_event_id: u64,
    }

    /// Initialize the registry
    fun init(ctx: &mut TxContext) {
        let registry = CheckinRegistry {
            id: object::new(ctx),
            events: table::new(ctx),
            checkins: table::new(ctx),
            next_event_id: 1,
        };
        iota::transfer::share_object(registry);
    }

    /// Create a new event
    public fun create_event(
        registry: &mut CheckinRegistry,
        name: String,
        description: String,
        ctx: &mut TxContext,
    ): u64 {
        let event_id = registry.next_event_id;
        let admin = tx_context::sender(ctx);

        let event = Event {
            id: event_id,
            name: name,
            description: description,
            admin: admin,
            created_at: tx_context::epoch(ctx),
            checkins_count: 0,
            active: true,
            participants: vector::empty(),
        };

        table::add(&mut registry.events, event_id, event);
        table::add(&mut registry.checkins, event_id, vector::empty());

        registry.next_event_id = event_id + 1;

        event::emit(EventCreated {
            event_id: event_id,
            name: name,
            admin: admin,
            created_at: tx_context::epoch(ctx),
        });

        event_id
    }

    /// Check in to an event
    public fun check_in(
        registry: &mut CheckinRegistry,
        event_id: u64,
        ctx: &mut TxContext,
    ) {
        let participant = tx_context::sender(ctx);
        let timestamp = tx_context::epoch(ctx);

        // Verify event exists and is active
        let event = table::borrow_mut(&mut registry.events, event_id);
        assert!(event.active, 1); // Event not active

        // Check if already checked in
        let checkins = table::borrow_mut(&mut registry.checkins, event_id);
        let mut i = 0;
        while (i < vector::length(checkins)) {
            let checkin = vector::borrow(checkins, i);
            assert!(checkin.participant != participant, 2); // Already checked in
            i = i + 1;
        };

        // Add check-in
        let checkin = Checkin {
            participant: participant,
            timestamp: timestamp,
        };
        vector::push_back(checkins, checkin);
        event.checkins_count = event.checkins_count + 1;
        vector::push_back(&mut event.participants, participant);

        event::emit(CheckinSuccess {
            event_id: event_id,
            participant: participant,
            timestamp: timestamp,
        });
    }

    /// Get event details
    public fun get_event(
        registry: &CheckinRegistry,
        event_id: u64,
    ): (String, String, address, u64, u64, bool) {
        let event = table::borrow(&registry.events, event_id);
        (
            event.name,
            event.description,
            event.admin,
            event.created_at,
            event.checkins_count,
            event.active,
        )
    }

    /// Check if user has checked in
    public fun has_user_checked_in(
        registry: &CheckinRegistry,
        event_id: u64,
        user: address,
    ): bool {
        let checkins = table::borrow(&registry.checkins, event_id);
        let mut i = 0;
        while (i < vector::length(checkins)) {
            let checkin = vector::borrow(checkins, i);
            if (checkin.participant == user) {
                return true
            };
            i = i + 1;
        };
        false
    }

    /// Get all participants of an event (admin only)
    public fun get_participants(
        registry: &CheckinRegistry,
        event_id: u64,
        ctx: &TxContext,
    ): vector<address> {
        let event = table::borrow(&registry.events, event_id);
        assert!(event.admin == tx_context::sender(ctx), 3); // Not event admin
        event.participants
    }

    /// Get total number of events
    public fun get_total_events(registry: &CheckinRegistry): u64 {
        registry.next_event_id - 1
    }

    /// Deactivate an event (admin only)
    public fun deactivate_event(
        registry: &mut CheckinRegistry,
        event_id: u64,
        ctx: &TxContext,
    ) {
        let event = table::borrow_mut(&mut registry.events, event_id);
        assert!(event.admin == tx_context::sender(ctx), 3); // Not event admin
        event.active = false;
    }
}
