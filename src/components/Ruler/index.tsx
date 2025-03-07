import React, { useEffect, useRef } from 'react';
import { useCanvasStore } from '../../store/canvas-store';

interface RulerProps {
    showRulers?: boolean;
    rulerColor?: string;
    backgroundColor?: string;
}

/**
 * Ruler component for CanvasMint
 * This component provides horizontal and vertical rulers for the canvas
 */
export const Ruler: React.FC<RulerProps> = ({
    showRulers = true,
    rulerColor = '#333',
    backgroundColor = '#f0f0f0',
}) => {
    const { canvasWidth, canvasHeight, zoom } = useCanvasStore(state => state);
    const horizontalRulerRef = useRef<HTMLCanvasElement>(null);
    const verticalRulerRef = useRef<HTMLCanvasElement>(null);

    // Constants
    const RULER_SIZE = 20; // Width/height of the ruler
    const TICK_INTERVAL = 10; // Interval between small ticks
    const MAJOR_TICK_INTERVAL = 100; // Interval between major ticks

    // Draw horizontal ruler
    const drawHorizontalRuler = () => {
        const canvas = horizontalRulerRef.current;
        if (!canvas || !canvasWidth) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        canvas.width = canvasWidth * (zoom || 1) + RULER_SIZE;
        canvas.height = RULER_SIZE;

        // Clear canvas
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw ruler
        ctx.fillStyle = rulerColor;
        ctx.font = '9px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Draw ticks and labels
        for (let i = 0; i <= canvasWidth; i += TICK_INTERVAL) {
            const x = i * (zoom || 1) + RULER_SIZE;
            const isMajorTick = i % MAJOR_TICK_INTERVAL === 0;
            const tickHeight = isMajorTick ? RULER_SIZE / 2 : RULER_SIZE / 4;

            // Draw tick
            ctx.beginPath();
            ctx.moveTo(x, RULER_SIZE);
            ctx.lineTo(x, RULER_SIZE - tickHeight);
            ctx.stroke();

            // Draw label for major ticks
            if (isMajorTick) {
                ctx.fillText(i.toString(), x, RULER_SIZE / 2);
            }
        }

        // Draw origin marker
        ctx.fillStyle = rulerColor;
        ctx.fillRect(0, 0, RULER_SIZE, RULER_SIZE);
    };

    // Draw vertical ruler
    const drawVerticalRuler = () => {
        const canvas = verticalRulerRef.current;
        if (!canvas || !canvasHeight) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        canvas.width = RULER_SIZE;
        canvas.height = canvasHeight * (zoom || 1) + RULER_SIZE;

        // Clear canvas
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw ruler
        ctx.fillStyle = rulerColor;
        ctx.font = '9px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Draw ticks and labels
        for (let i = 0; i <= canvasHeight; i += TICK_INTERVAL) {
            const y = i * (zoom || 1) + RULER_SIZE;
            const isMajorTick = i % MAJOR_TICK_INTERVAL === 0;
            const tickWidth = isMajorTick ? RULER_SIZE / 2 : RULER_SIZE / 4;

            // Draw tick
            ctx.beginPath();
            ctx.moveTo(RULER_SIZE, y);
            ctx.lineTo(RULER_SIZE - tickWidth, y);
            ctx.stroke();

            // Draw label for major ticks
            if (isMajorTick) {
                // Save context to rotate text
                ctx.save();
                ctx.translate(RULER_SIZE / 2, y);
                ctx.rotate(-Math.PI / 2);
                ctx.fillText(i.toString(), 0, 0);
                ctx.restore();
            }
        }
    };

    // Draw rulers when component mounts or when canvas size or zoom changes
    useEffect(() => {
        if (showRulers) {
            drawHorizontalRuler();
            drawVerticalRuler();
        }
    }, [canvasWidth, canvasHeight, zoom, showRulers]);

    if (!showRulers) {
        return null;
    }

    return (
        <>
            {/* Horizontal Ruler */}
            <div
                className="canvasmint-ruler-horizontal"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: RULER_SIZE,
                    height: RULER_SIZE,
                    zIndex: 100,
                    overflow: 'hidden',
                }}
            >
                <canvas ref={horizontalRulerRef} />
            </div>

            {/* Vertical Ruler */}
            <div
                className="canvasmint-ruler-vertical"
                style={{
                    position: 'absolute',
                    top: RULER_SIZE,
                    left: 0,
                    width: RULER_SIZE,
                    zIndex: 100,
                    overflow: 'hidden',
                }}
            >
                <canvas ref={verticalRulerRef} />
            </div>
        </>
    );
};
