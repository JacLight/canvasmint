import React, { useRef, useState } from 'react';
import { useCanvasStore } from '../../store/canvas-store';

interface DragDropProps {
    children: React.ReactNode;
    onFileDrop?: (files: File[]) => void;
}

/**
 * DragDrop component for CanvasMint
 * This component provides drag and drop functionality for the canvas
 */
export const DragDrop: React.FC<DragDropProps> = ({
    children,
    onFileDrop,
}) => {
    const { engine } = useCanvasStore(state => state);
    const [isDragging, setIsDragging] = useState(false);
    const dropZoneRef = useRef<HTMLDivElement>(null);

    // Handle drag enter
    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    // Handle drag over
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    // Handle drag leave
    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        // Check if the drag leave event is for the drop zone itself
        // and not for a child element
        if (e.currentTarget === dropZoneRef.current) {
            setIsDragging(false);
        }
    };

    // Handle drop
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        // Get the dropped files
        const files = Array.from(e.dataTransfer.files);

        // Filter for image files
        const imageFiles = files.filter(file => file.type.startsWith('image/'));

        // If there are image files, add them to the canvas
        if (imageFiles.length > 0) {
            // If onFileDrop is provided, call it
            if (onFileDrop) {
                onFileDrop(imageFiles);
            } else {
                // Otherwise, add the images to the canvas
                addImagesToCanvas(imageFiles);
            }
        }
    };

    // Add images to canvas
    const addImagesToCanvas = (files: File[]) => {
        if (!engine) return;

        // Convert files to URLs and add to canvas
        const images = files.map(file => {
            return {
                url: URL.createObjectURL(file),
            };
        });

        // Add images to canvas
        engine.addImage(images);
    };

    return (
        <div
            ref={dropZoneRef}
            className={`canvasmint-drag-drop ${isDragging ? 'dragging' : ''}`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
            }}
        >
            {/* Overlay when dragging */}
            {isDragging && (
                <div
                    className="canvasmint-drag-drop-overlay"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 120, 255, 0.1)',
                        border: '2px dashed rgba(0, 120, 255, 0.5)',
                        borderRadius: '4px',
                        zIndex: 1000,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        pointerEvents: 'none',
                    }}
                >
                    <div
                        className="canvasmint-drag-drop-message"
                        style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            padding: '20px',
                            borderRadius: '4px',
                            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                            textAlign: 'center',
                        }}
                    >
                        <h3>Drop Images Here</h3>
                        <p>Drop image files to add them to the canvas</p>
                    </div>
                </div>
            )}

            {/* Children */}
            {children}
        </div>
    );
};
