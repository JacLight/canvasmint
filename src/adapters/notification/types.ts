/**
 * Notification type
 */
export type NotificationType = 'success' | 'error' | 'info' | 'warning';

/**
 * Notification adapter interface
 * This adapter is used to display notifications
 */
export interface NotificationAdapter {
    /**
     * Display a notification
     * @param message Notification message
     * @param type Notification type
     * @param duration Optional duration in milliseconds
     */
    notify: (message: string, type: NotificationType, duration?: number) => void;
}
