import React from 'react';

export interface SimpleCanvasProps {
    /**
     * Width of the canvas in pixels
     * @default 800
     */
    width?: number;

    /**
     * Height of the canvas in pixels
     * @default 600
     */
    height?: number;

    /**
     * Additional class name for the container
     */
    className?: string;

    /**
     * Additional inline styles for the container
     */
    style?: React.CSSProperties;

    /**
     * Callback when the canvas is initialized
     */
    onInit?: (canvas: fabric.Canvas) => void;

    /**
     * Callback when an object is added to the canvas
     */
    onObjectAdded?: (object: fabric.Object) => void;

    /**
     * Callback when an object is removed from the canvas
     */
    onObjectRemoved?: (object: fabric.Object) => void;

    /**
     * Callback when the canvas is cleared
     */
    onCanvasCleared?: () => void;
}
