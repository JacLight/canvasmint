import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { CanvasMintProps } from './types';
import { useCanvasStore } from '../../store/canvas-store';
import { CanvasEngine } from '../../engine/core';
import { MenuBar } from '../MenuBar';
import { Toolbox } from '../Toolbox';
import { Properties } from '../Properties';
import { createDefaultStorageAdapter } from '../../adapters/storage';
import { createDefaultFileAdapter } from '../../adapters/file';
import { createDefaultNotificationAdapter } from '../../adapters/notification';
// Import helpers without unused imports
import '../../utils/helpers';

/**
 * CanvasMint component
 * This is the main component for the CanvasMint canvas editor
 */
export const CanvasMint: React.FC<CanvasMintProps> = ({
    id,
    initialData,
    theme,
    toolbarConfig,
    canvasConfig,
    storageAdapter,
    fileAdapter,
    notificationAdapter,
    onSave,
    onExport,
    onError,
    onChange,
    className,
    style,
}) => {
    // Create refs
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Create state
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Get store
    const {
        engine,
        setStateItem,
        canvasHeight,
        canvasWidth,
        zoom,
    } = useCanvasStore();

    // Create adapters with defaults
    const storage = storageAdapter || createDefaultStorageAdapter();
    const notification = notificationAdapter || createDefaultNotificationAdapter();

    // Initialize canvas
    useEffect(() => {
        if (!canvasRef.current) {
            console.error('Canvas ref is null');
            return;
        }

        console.log('Canvas ref exists:', !!canvasRef.current);
        console.log('Canvas ID:', canvasRef.current.id);

        try {
            // Initialize fabric canvas directly
            const fabricCanvas = new fabric.Canvas(canvasRef.current.id);
            console.log('Fabric canvas created:', !!fabricCanvas);

            // Set canvas dimensions
            const width = canvasConfig?.width || 1200;
            const height = canvasConfig?.height || 800;
            fabricCanvas.setDimensions({ width, height });
            console.log('Canvas dimensions set:', width, height);

            // Set background color
            fabricCanvas.setBackgroundColor('#ffffff', fabricCanvas.renderAll.bind(fabricCanvas));
            console.log('Canvas background set to white');

            // Add a test rectangle
            const rect = new fabric.Rect({
                left: width / 2,
                top: height / 2,
                fill: '#ff0000',
                width: 200,
                height: 200,
                originX: 'center',
                originY: 'center',
                strokeWidth: 5,
                stroke: '#000000',
            });

            fabricCanvas.add(rect);
            fabricCanvas.renderAll();
            console.log('Test rectangle added to canvas');

            // Create a simple engine object that wraps the fabric canvas
            const _engine = {
                canvas: fabricCanvas,
                addRect: () => {
                    const newRect = new fabric.Rect({
                        left: width / 2,
                        top: height / 2,
                        fill: '#ff0000',
                        width: 200,
                        height: 200,
                        originX: 'center',
                        originY: 'center',
                        strokeWidth: 5,
                        stroke: '#000000',
                    });
                    fabricCanvas.add(newRect);
                    fabricCanvas.renderAll();
                    console.log('Rectangle added via engine');
                },
                addCircle: () => {
                    const circle = new fabric.Circle({
                        left: width / 2,
                        top: height / 2,
                        fill: '#26a69a',
                        radius: 50,
                        originX: 'center',
                        originY: 'center',
                        strokeWidth: 0,
                    });
                    fabricCanvas.add(circle);
                    fabricCanvas.renderAll();
                    console.log('Circle added via engine');
                },
                addTriangle: () => {
                    const triangle = new fabric.Triangle({
                        left: width / 2,
                        top: height / 2,
                        fill: '#78909c',
                        width: 100,
                        height: 100,
                        originX: 'center',
                        originY: 'center',
                        strokeWidth: 0,
                    });
                    fabricCanvas.add(triangle);
                    fabricCanvas.renderAll();
                    console.log('Triangle added via engine');
                },
                addText: (text?: string) => {
                    const textObj = new fabric.IText(text || 'Sample Text', {
                        left: width / 2,
                        top: height / 2,
                        fill: '#333',
                        fontFamily: 'sans-serif',
                        originX: 'center',
                        originY: 'center',
                    });
                    fabricCanvas.add(textObj);
                    fabricCanvas.renderAll();
                    console.log('Text added via engine');
                },
                remove: () => {
                    const activeObjects = fabricCanvas.getActiveObjects();
                    fabricCanvas.discardActiveObject();
                    if (activeObjects.length) {
                        fabricCanvas.remove(...activeObjects);
                        fabricCanvas.renderAll();
                        console.log('Objects removed via engine');
                    }
                },
                toJson: () => {
                    return fabricCanvas.toJSON();
                },
                loadFromJson: (json: string | object) => {
                    if (typeof json === 'string') {
                        json = JSON.parse(json);
                    }
                    fabricCanvas.loadFromJSON(json, fabricCanvas.renderAll.bind(fabricCanvas));
                },
                download: (format: string = 'png') => {
                    const dataURL = fabricCanvas.toDataURL({ format });
                    const link = document.createElement('a');
                    link.download = `canvasmint-${Date.now()}.${format}`;
                    link.href = dataURL;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                },
                setupKeyboardHandlers: () => {
                    // No-op for cleanup
                }
            };

            // Set engine in store
            if (setStateItem) {
                setStateItem({
                    engine: _engine,
                    canvasWidth: width,
                    canvasHeight: height,
                    timestamp: new Date().getTime(),
                });
            }

            // Load data if provided
            if (id) {
                loadDesign(id);
            } else if (initialData) {
                try {
                    _engine.loadFromJson(initialData);
                } catch (err) {
                    handleError(err as Error);
                }
            }

            // Cleanup
            return () => {
                fabricCanvas.dispose();
            };
        } catch (error) {
            console.error('Error initializing canvas:', error);
        }
    }, [canvasRef.current]);

    // Load design
    const loadDesign = async (designId: string) => {
        if (!engine) return;

        setIsLoading(true);
        setError(null);

        try {
            const data = await storage.load(designId);
            engine.loadFromJson(data);
            setIsLoading(false);
        } catch (err) {
            handleError(err as Error);
            setIsLoading(false);
        }
    };

    // Save design
    const saveDesign = async () => {
        if (!engine) return;

        setIsLoading(true);
        setError(null);

        try {
            const data = engine.toJson();
            const designId = id || `canvasmint-${Date.now()}`;
            await storage.save(designId, data);

            // Call onSave callback
            if (onSave) {
                onSave(designId, data);
            }

            // Show success notification
            notification.notify('Design saved successfully', 'success');

            setIsLoading(false);
        } catch (err) {
            handleError(err as Error);
            setIsLoading(false);
        }
    };

    // Export design
    const exportDesign = async (format: string = 'png') => {
        if (!engine) return;

        try {
            engine.download(format);

            // Call onExport callback
            if (onExport) {
                const data = engine.canvas.toDataURL({ format });
                onExport(format, data);
            }
        } catch (err) {
            handleError(err as Error);
        }
    };

    // Handle error
    const handleError = (err: Error) => {
        const errorMessage = err.message || 'An error occurred';
        setError(errorMessage);

        // Show error notification
        notification.notify(errorMessage, 'error');

        // Call onError callback
        if (onError) {
            onError(err);
        }
    };

    // Handle tool selection
    const handleToolSelect = (tool: string) => {
        console.log('handleToolSelect called with:', tool);
        console.log('Engine exists:', !!engine);

        if (!engine) {
            console.error('Engine is not initialized');
            return;
        }

        // Reset drawing mode
        engine.canvas.isDrawingMode = false;

        // Handle different tools
        switch (tool) {
            case 'select':
                console.log('Select tool selected');
                // Just disable drawing mode
                break;
            case 'rectangle':
                console.log('Adding rectangle');
                // Add a rectangle directly
                engine.addRect();
                console.log('Rectangle added');
                break;
            case 'circle':
                console.log('Adding circle');
                engine.addCircle();
                break;
            case 'triangle':
                console.log('Adding triangle');
                engine.addTriangle();
                break;
            case 'text':
                console.log('Adding text');
                engine.addText();
                break;
            case 'pencil':
                console.log('Enabling pencil drawing mode');
                // Enable drawing mode with pencil brush
                engine.canvas.isDrawingMode = true;
                if (engine.canvas.freeDrawingBrush) {
                    engine.canvas.freeDrawingBrush.color = '#000000';
                    engine.canvas.freeDrawingBrush.width = 2;
                }
                break;
            case 'delete':
                console.log('Removing selected objects');
                engine.remove();
                break;
            default:
                console.log('Unknown tool:', tool);
                break;
        }

        // Render canvas
        console.log('Rendering canvas');
        engine.canvas.renderAll();
    };

    // Calculate zoom dimensions
    const zoomWidth = (canvasWidth || 1200) * (zoom || 1);
    const zoomHeight = (canvasHeight || 800) * (zoom || 1);

    return (
        <div
            className={`canvasmint-container ${className || ''}`}
            style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                width: '100%',
                position: 'relative',
                ...style,
            }}
            ref={containerRef}
        >
            {/* Menu Bar */}
            <MenuBar
                onSave={saveDesign}
                onExport={exportDesign}
                toolbarConfig={toolbarConfig}
                theme={theme}
            />

            <div className="canvasmint-content" style={{ display: 'flex', flex: 1, position: 'relative' }}>
                {/* Toolbox */}
                <Toolbox
                    toolbarConfig={toolbarConfig}
                    theme={theme}
                    onToolSelect={handleToolSelect}
                />

                {/* Canvas */}
                <div
                    className="canvasmint-canvas-container"
                    style={{
                        flex: 1,
                        overflow: 'auto',
                        position: 'relative',
                    }}
                >
                    {isLoading && (
                        <div className="canvasmint-loading">
                            Loading...
                        </div>
                    )}

                    {error && (
                        <div className="canvasmint-error">
                            {error}
                        </div>
                    )}

                    <div
                        className="canvasmint-canvas-wrapper"
                        style={{
                            margin: '20px',
                            position: 'relative',
                            backgroundColor: '#f8f8f8',
                            border: '2px solid #ddd',
                            width: '100%',
                            height: '600px',
                            overflow: 'hidden',
                        }}
                    >
                        {/* The canvas element must have a fixed size, not percentage-based */}
                        <canvas
                            id="canvasmint-canvas"
                            ref={canvasRef}
                            width="1200"
                            height="800"
                            style={{
                                border: '2px solid #ff0000',
                            }}
                        />
                    </div>
                </div>

                {/* Properties */}
                <Properties theme={theme} />
            </div>
        </div>
    );
};
