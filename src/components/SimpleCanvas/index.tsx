import React, { useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import { SimpleCanvasProps } from './types';

export const SimpleCanvas: React.FC<SimpleCanvasProps> = ({
    width = 800,
    height = 600,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const canvasInstanceRef = useRef<fabric.Canvas | null>(null);

    useEffect(() => {
        // Initialize canvas
        if (!canvasRef.current) return;

        // Create canvas instance
        const canvas = new fabric.Canvas(canvasRef.current);
        canvasInstanceRef.current = canvas;

        // Set dimensions
        canvas.setWidth(width);
        canvas.setHeight(height);

        // Set background color
        canvas.setBackgroundColor('#ffffff', canvas.renderAll.bind(canvas));

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

        canvas.add(rect);
        canvas.renderAll();
        console.log('SimpleCanvas: Rectangle added to canvas');

        // Cleanup
        return () => {
            canvas.dispose();
            canvasInstanceRef.current = null;
        };
    }, [width, height]);

    // Add rectangle button handler
    const handleAddRectangle = () => {
        if (!canvasInstanceRef.current) return;

        const canvas = canvasInstanceRef.current;
        const rect = new fabric.Rect({
            left: Math.random() * (width - 100) + 50,
            top: Math.random() * (height - 100) + 50,
            fill: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`,
            width: 100,
            height: 100,
            originX: 'center',
            originY: 'center',
            strokeWidth: 2,
            stroke: '#000000',
        });

        canvas.add(rect);
        canvas.renderAll();
        console.log('SimpleCanvas: Rectangle added via button');
    };

    // Add circle button handler
    const handleAddCircle = () => {
        if (!canvasInstanceRef.current) return;

        const canvas = canvasInstanceRef.current;
        const circle = new fabric.Circle({
            left: Math.random() * (width - 100) + 50,
            top: Math.random() * (height - 100) + 50,
            fill: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`,
            radius: 50,
            originX: 'center',
            originY: 'center',
            strokeWidth: 2,
            stroke: '#000000',
        });

        canvas.add(circle);
        canvas.renderAll();
        console.log('SimpleCanvas: Circle added via button');
    };

    // Clear canvas button handler
    const handleClearCanvas = () => {
        if (!canvasInstanceRef.current) return;

        const canvas = canvasInstanceRef.current;
        canvas.clear();
        canvas.setBackgroundColor('#ffffff', canvas.renderAll.bind(canvas));
        console.log('SimpleCanvas: Canvas cleared');
    };

    return (
        <div className="simple-canvas-container">
            <div className="simple-canvas-toolbar">
                <button onClick={handleAddRectangle}>Add Rectangle</button>
                <button onClick={handleAddCircle}>Add Circle</button>
                <button onClick={handleClearCanvas}>Clear Canvas</button>
            </div>
            <div
                className="simple-canvas-wrapper"
                style={{
                    border: '2px solid #ddd',
                    margin: '10px 0',
                    display: 'inline-block',
                }}
            >
                <canvas ref={canvasRef} width={width} height={height} />
            </div>
        </div>
    );
};
