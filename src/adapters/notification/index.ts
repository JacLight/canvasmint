import { NotificationAdapter } from './types';

/**
 * Create a default notification adapter
 * @param overrides Optional overrides for the default adapter
 * @returns Notification adapter
 */
export const createDefaultNotificationAdapter = (overrides?: Partial<NotificationAdapter>): NotificationAdapter => {
    // Default implementation using console
    const defaultAdapter: NotificationAdapter = {
        notify: (message: string, type: 'success' | 'error' | 'info' | 'warning', _duration?: number) => {
            switch (type) {
                case 'success':
                    console.log(`%c✓ ${message}`, 'color: green; font-weight: bold;');
                    break;
                case 'error':
                    console.error(`✗ ${message}`);
                    break;
                case 'warning':
                    console.warn(`⚠ ${message}`);
                    break;
                case 'info':
                default:
                    console.info(`ℹ ${message}`);
                    break;
            }
        },
    };

    // Merge with overrides
    return { ...defaultAdapter, ...overrides };
};
