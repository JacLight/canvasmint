import { fabric } from 'fabric';

/**
 * DrawFree class for free drawing functionality
 * This is a standalone version of the drawFree functionality from creative-studio
 */
export class DrawFree {
    /**
     * Initialize the drawing tool
     * @param canvas Fabric canvas instance
     */
    static initialize(): void {
        // Initialize the drawing tool
        console.log('DrawFree initialized');
    }

    /**
     * Change the brush mode and style
     * @param brushMode Brush mode (Pencil, Circle, Spray, Pattern, etc.)
     * @param style Style object with stroke, strokeWidth, etc.
     * @param canvas Fabric canvas instance
     */
    static changeBrushMode(brushMode: string, style: any, canvas: fabric.Canvas): void {
        if (!canvas) return;

        // Set drawing mode
        canvas.isDrawingMode = true;

        // Create brush based on mode
        try {
            switch (brushMode) {
                case 'Pencil':
                    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas as any);
                    break;
                case 'Circle':
                    // Create CircleBrush without arguments
                    const circleBrush = new fabric.CircleBrush();
                    // Set canvas property manually
                    (circleBrush as any).canvas = canvas;
                    canvas.freeDrawingBrush = circleBrush;
                    break;
                case 'Spray':
                    // Create SprayBrush without arguments
                    const sprayBrush = new fabric.SprayBrush();
                    // Set canvas property manually
                    (sprayBrush as any).canvas = canvas;
                    canvas.freeDrawingBrush = sprayBrush;
                    break;
                case 'Pattern':
                    // Pattern brush requires a pattern
                    const patternBrush = new fabric.PatternBrush(canvas as any);
                    (patternBrush as any).source = DrawFree.createPattern();
                    canvas.freeDrawingBrush = patternBrush;
                    break;
                default:
                    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas as any);
                    break;
            }
        } catch (error) {
            console.error('Error creating brush:', error);
            // Fallback to pencil brush
            canvas.freeDrawingBrush = new fabric.PencilBrush(canvas as any);
        }

        // Apply styles
        DrawFree.changeBrushStyle(style, canvas);
    }

    /**
     * Change the brush style
     * @param style Style object with stroke, strokeWidth, etc.
     * @param canvas Fabric canvas instance
     */
    static changeBrushStyle(style: any, canvas: fabric.Canvas): void {
        if (!canvas || !canvas.freeDrawingBrush) return;

        // Apply stroke color
        if (style.stroke) {
            canvas.freeDrawingBrush.color = style.stroke;
        } else {
            canvas.freeDrawingBrush.color = '#000000';
        }

        // Apply stroke width
        if (style.strokeWidth) {
            canvas.freeDrawingBrush.width = parseInt(style.strokeWidth);
        } else {
            canvas.freeDrawingBrush.width = 1;
        }

        // Apply shadow if specified
        if (style.shadow) {
            const shadow = new fabric.Shadow({
                color: style.shadowColor || 'rgba(0,0,0,0.3)',
                blur: style.shadowBlur || 10,
                offsetX: style.shadowOffsetX || 5,
                offsetY: style.shadowOffsetY || 5,
            });
            (canvas.freeDrawingBrush as any).shadow = shadow;
        } else {
            // Remove shadow
            (canvas.freeDrawingBrush as any).shadow = undefined;
        }
    }

    /**
     * Create a pattern for the pattern brush
     * @returns Canvas element with pattern
     */
    private static createPattern(): HTMLCanvasElement {
        const patternCanvas = document.createElement('canvas');
        patternCanvas.width = 20;
        patternCanvas.height = 20;
        const ctx = patternCanvas.getContext('2d');

        if (ctx) {
            // Draw pattern
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, 20, 20);

            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, 10, 10);
            ctx.fillRect(10, 10, 10, 10);
        }

        return patternCanvas;
    }
}
