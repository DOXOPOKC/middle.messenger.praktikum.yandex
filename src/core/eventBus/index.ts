export default class EventBus {
    private static __instance: EventBus;

    listeners: Record<string, Function[]>;

    constructor() {
        if (EventBus.__instance) {
            return EventBus.__instance;
        }

        this.listeners = {};

        EventBus.__instance = this;
    }

    on(event: string, callback: Function): void {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);
    }

    off(event: string, callback: Function): void {
        if (this.listeners[event]) {
            this.listeners[event] = this.listeners[event]
                .filter(listener => listener !== callback);
        }
    }

    emit(event: string, ...args: unknown[]): void {
        if (this.listeners[event]) {
            this.listeners[event].forEach((listener) => {
                listener(...args);
            });
        }
    }
}
