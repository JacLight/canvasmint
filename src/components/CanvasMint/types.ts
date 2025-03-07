import { StorageAdapter } from '../../adapters/storage/types';
import { FileAdapter } from '../../adapters/file/types';
import { NotificationAdapter } from '../../adapters/notification/types';

/**
 * Theme configuration for CanvasMint
 */
export interface ThemeConfig {
    primary?: string;
    secondary?: string;
    background?: string;
    text?: string;
    border?: string;
}

/**
 * Toolbar configuration for CanvasMint
 */
export interface ToolbarConfig {
    showShapes?: boolean;
    showText?: boolean;
    showImages?: boolean;
    showDraw?: boolean;
    showExport?: boolean;
    showSave?: boolean;
}

/**
 * Canvas configuration for CanvasMint
 */
export interface CanvasConfig {
    width?: number;
    height?: number;
    background?: string;
}

/**
 * Props for the CanvasMint component
 */
export interface CanvasMintProps {
    /**
     * ID of the design to load
     */
    id?: string;

    /**
     * Initial data to load
     */
    initialData?: string | object;

    /**
     * Theme configuration
     */
    theme?: ThemeConfig;

    /**
     * Toolbar configuration
     */
    toolbarConfig?: ToolbarConfig;

    /**
     * Canvas configuration
     */
    canvasConfig?: CanvasConfig;

    /**
     * Storage adapter for saving/loading designs
     */
    storageAdapter?: StorageAdapter;

    /**
     * File adapter for file operations
     */
    fileAdapter?: FileAdapter;

    /**
     * Notification adapter for notifications
     */
    notificationAdapter?: NotificationAdapter;

    /**
     * Callback when the design is saved
     */
    onSave?: (id: string, data: object) => void;

    /**
     * Callback when the design is exported
     */
    onExport?: (format: string, data: string) => void;

    /**
     * Callback when an error occurs
     */
    onError?: (error: Error) => void;

    /**
     * Callback when the design is changed
     */
    onChange?: (data: object) => void;

    /**
     * Class name for the container
     */
    className?: string;

    /**
     * Style for the container
     */
    style?: React.CSSProperties;
}
