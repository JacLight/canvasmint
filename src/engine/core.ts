import { fabric } from 'fabric';
import { CanvasHistory } from './history';
import { getRandomString } from '../utils/helpers';

/**
 * Canvas Engine class
 * This is a standalone version of the CSEngine class from creative-studio
 */
export class CanvasEngine {
    canvas!: fabric.Canvas;
    history: any;
    activeObject: fabric.Object | null;
    autoWidth: boolean;

    constructor(
        private canvasId: string,
        width: number,
        height: number,
        private saveHistory: (data?: any) => void
    ) {
        this.initCanvas(width, height);
        // Only set active object if there is an item
        const firstItem = this.canvas.item(0);
        if (firstItem) {
            // Cast to any to avoid TypeScript error
            (this.canvas as any).setActiveObject(firstItem);
        }
        this.autoWidth = true;
        this.activeObject = null;
    }

    initCanvas = (width: number, height: number) => {
        console.log('Initializing canvas with ID:', this.canvasId);
        console.log('Canvas element exists:', !!document.getElementById(this.canvasId));

        try {
            this.canvas = new fabric.Canvas(this.canvasId);
            console.log('Canvas created successfully:', !!this.canvas);

            this.canvas.setDimensions({
                width: width,
                height: height,
            });
            console.log('Canvas dimensions set:', width, height);

            this.canvas.setBackgroundColor('#ffffff', this.canvas.renderAll.bind(this.canvas));
            console.log('Canvas background set to white');

            // Store original dimensions
            (this.canvas as any).originalW = this.canvas.width;
            (this.canvas as any).originalH = this.canvas.height;

            this.history = new CanvasHistory(this.canvas);
            console.log('Canvas history initialized');
        } catch (error) {
            console.error('Error initializing canvas:', error);
        }

        // Drawing settings
        (this.canvas as any).isDrawingLineMode = false;
        (this.canvas as any).isDrawingPolyMode = false;
        (this.canvas as any).isDrawingPathMode = false;
        (this.canvas as any).isDrawingTextMode = false;
        (this.canvas as any).isDrawingMode = false;
        (this.canvas as any).isDrawingCircleMode = false;
        (this.canvas as any).isDrawingEllipseMode = false;
        (this.canvas as any).isDrawingRectMode = false;

        // Set up selection style
        fabric.Object.prototype.transparentCorners = false;
        fabric.Object.prototype.cornerStyle = 'rect';
        fabric.Object.prototype.borderColor = '#6EE3F2';
        fabric.Object.prototype.cornerColor = '#6EE3F2';
        fabric.Object.prototype.cornerStrokeColor = '#FFF';
        fabric.Object.prototype.padding = 0;

        // Extra canvas settings
        this.canvas.preserveObjectStacking = true;
        (this.canvas as any).stopContextMenu = true;

        // Set up event handlers
        this.setupEventHandlers();

        // Initialize drawing tools
        this.initializeDrawingTools();
    };

    setupEventHandlers = () => {
        // Retrieve active selection to react state
        this.canvas.on('selection:created', () => {
            this.activeObject = this.canvas.getActiveObject();
        });

        this.canvas.on('object:selected', () => {
            this.activeObject = this.canvas.getActiveObject();
        });

        this.canvas.on('selection:cleared', () => {
            this.activeObject = null;
        });

        this.canvas.on('selection:updated', () => {
            this.activeObject = this.canvas.getActiveObject();
        });

        this.canvas.on('object:modified', () => {
            this.history.saveState();
            const currentState = this.canvas.toJSON();
            this.saveHistory(currentState);
        });

        // Snap to an angle on rotate if shift key is down
        this.canvas.on('object:rotating', (e: any) => {
            if (e.e.shiftKey) {
                e.target.snapAngle = 15;
            } else {
                e.target.snapAngle = false;
            }
        });

        // Set up keyboard event handlers
        this.setupKeyboardHandlers();
    };

    setupKeyboardHandlers = () => {
        // Delete object on del key
        document.addEventListener('keydown', (e: KeyboardEvent) => {
            const key = e.which || e.keyCode;
            if (key === 46 && document.querySelectorAll('textarea:focus, input:focus').length === 0) {
                this.canvas.getActiveObjects().forEach(obj => {
                    this.canvas.remove(obj);
                });
                this.canvas.discardActiveObject().requestRenderAll();
                this.canvas.fire('object:modified');
            }
        });

        // Move objects with arrow keys
        document.addEventListener('keydown', (e: KeyboardEvent) => {
            const key = e.which || e.keyCode;

            // Skip if focus is on input elements
            if (document.querySelectorAll('textarea:focus, input:focus').length > 0) return;

            // Only process arrow keys
            if (key === 37 || key === 38 || key === 39 || key === 40) {
                e.preventDefault();
                const activeObject = this.canvas.getActiveObject();

                // Skip if no active object
                if (!activeObject) return;

                // Move object based on key
                if (key === 37) { // Left
                    activeObject.set('left', (activeObject.get('left') as number) - 1);
                } else if (key === 39) { // Right
                    activeObject.set('left', (activeObject.get('left') as number) + 1);
                } else if (key === 38) { // Up
                    activeObject.set('top', (activeObject.get('top') as number) - 1);
                } else if (key === 40) { // Down
                    activeObject.set('top', (activeObject.get('top') as number) + 1);
                }

                // Update coordinates and render
                activeObject.setCoords();
                this.canvas.renderAll();
                this.canvas.fire('object:modified');
            }
        });
    };

    initializeDrawingTools = () => {
        // Import drawing tools
        import('./draw-tools/draw-free').then(({ DrawFree }) => {
            DrawFree.initialize();
        });

        import('./draw-tools/draw-line').then(({ DrawLine }) => {
            DrawLine.initialize();
        });

        import('./draw-tools/draw-path').then(({ DrawPath }) => {
            DrawPath.initialize();
        });

        import('./draw-tools/draw-poly').then(({ DrawPoly }) => {
            DrawPoly.initialize();
        });

        import('./draw-tools/draw-text').then(({ DrawText }) => {
            DrawText.initialize();
        });

        import('./draw-tools/draw-circle').then(({ DrawCircle }) => {
            DrawCircle.initialize();
        });

        import('./draw-tools/draw-rect').then(({ DrawRect }) => {
            DrawRect.initialize();
        });

        import('./draw-tools/draw-ellipse').then(({ DrawEllipse }) => {
            DrawEllipse.initialize();
        });
    };

    onWindowResize = () => {
        if (!this.autoWidth) return;
        this.resize(window.innerWidth * 0.7, window.innerHeight);
    };

    setWidth = (width: number) => {
        this.canvas.setWidth(width);
    };

    setHeight = (height: number) => {
        this.canvas.setHeight(height);
    };

    setZoom = (zoom: number) => {
        this.canvas.setZoom(zoom);
    };

    resize = (newWidth: number, newHeight: number) => {
        // Set the new dimensions
        this.canvas.setDimensions({ width: newWidth, height: newHeight });

        // Render the canvas
        this.canvas.renderAll();
    };

    addText = (initText?: string) => {
        if (!initText) {
            initText = 'Sample Text';
        }

        // Create text with type-safe options
        const text = new fabric.IText(initText, {
            left: this.canvas.width ? this.canvas.width / 2 : 100,
            top: this.canvas.height ? this.canvas.height / 2 : 100,
            fill: '#333',
            fontFamily: 'sans-serif',
            hasRotatingPoint: false,
            originX: 'center',
            originY: 'center',
            lockUniScaling: true,
        } as fabric.ITextOptions);

        this.canvas.add(text);
    };

    addRect = (_config?: any) => {
        console.log('addRect called');

        let config = {
            left: this.canvas.width ? this.canvas.width / 2 : 100,
            top: this.canvas.height ? this.canvas.height / 2 : 100,
            fill: '#ff0000',
            width: 200,
            height: 200,
            originX: 'center',
            originY: 'center',
            strokeWidth: 5,
            stroke: '#000000',
        } as fabric.IRectOptions;

        console.log('Rectangle config:', config);

        if (_config) {
            config = { ...config, ..._config };
            console.log('Rectangle config with overrides:', config);
        }

        try {
            const rect = new fabric.Rect(config);
            console.log('Rectangle created:', rect);
            this.canvas.add(rect);
            console.log('Rectangle added to canvas');
            this.canvas.renderAll();
            console.log('Canvas rendered');
        } catch (error) {
            console.error('Error adding rectangle:', error);
        }
    };

    addCircle = () => {
        this.canvas.add(
            new fabric.Circle({
                left: this.canvas.width ? this.canvas.width / 2 : 100,
                top: this.canvas.height ? this.canvas.height / 2 : 100,
                fill: '#26a69a',
                radius: 50,
                originX: 'center',
                originY: 'center',
                strokeWidth: 0,
            } as fabric.ICircleOptions),
        );
    };

    addTriangle = () => {
        this.canvas.add(
            new fabric.Triangle({
                left: this.canvas.width ? this.canvas.width / 2 : 100,
                top: this.canvas.height ? this.canvas.height / 2 : 100,
                fill: '#78909c',
                width: 100,
                height: 100,
                originX: 'center',
                originY: 'center',
                strokeWidth: 0,
            } as fabric.ITriangleOptions),
        );
    };

    addImage = (images: Array<{ url: string }>) => {
        images.forEach((image, i) => {
            fabric.Image.fromURL(
                image.url,
                (img) => {
                    if (!img.width || !img.height) {
                        img.set({
                            width: 200,
                            height: 200,
                        });
                    }

                    this.canvas.add(img);
                    img.scale(0.5);
                    img.set({
                        left: 100 + i * 50,
                        top: 100 + i * 50,
                    });
                    this.canvas.renderAll();
                },
                { crossOrigin: 'anonymous' },
            );
        });
    };

    remove = () => {
        const activeObjects = this.canvas.getActiveObjects();
        this.canvas.discardActiveObject();
        if (activeObjects.length) {
            this.canvas.remove(...activeObjects);
        }
    };

    getFontSize = () => {
        if (!this.activeObject) {
            return 0;
        }

        const size = (this.activeObject as any).fontSize || 0;
        return +(size * (this.activeObject as any).scaleX).toFixed();
    };

    loadFromJson = (json: string | object) => {
        if (typeof json === 'string') {
            json = JSON.parse(json);
        }
        this.canvas.loadFromJSON(json, this.canvas.renderAll.bind(this.canvas));
    };

    formatText = (textFormat: { fontFamily?: string; fontSize?: number }) => {
        if (!this.activeObject) return;

        // Type-safe way to set properties
        if (textFormat.fontFamily) {
            (this.activeObject as any).set('fontFamily', textFormat.fontFamily);
        }

        if (textFormat.fontSize) {
            (this.activeObject as any).set('fontSize', textFormat.fontSize);
        }

        this.canvas.requestRenderAll();
    };

    toJson = () => {
        return this.canvas.toJSON();
    };

    download = (format: string = 'png') => {
        if (this.canvas.getActiveObject()) {
            this.downloadSelected(format);
        } else {
            this.downloadCanvas(format);
        }
    };

    downloadCanvas = (format: string = 'png') => {
        const data = this.canvas.toDataURL({ format });
        const link = document.createElement('a');
        link.download = `canvasmint-${getRandomString(4)}.${format}`;
        link.href = data;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    downloadSelected = (format: string = 'png') => {
        const activeObject = this.canvas.getActiveObject();
        if (!activeObject) return;

        const data = activeObject.toDataURL({ format });
        const link = document.createElement('a');
        link.download = `selected-${getRandomString(4)}.${format}`;
        link.href = data;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    group = () => {
        const activeSelection = this.canvas.getActiveObject() as fabric.ActiveSelection;
        if (!activeSelection || activeSelection.type !== 'activeSelection') {
            return;
        }

        const groupLeft = activeSelection.left;
        const groupTop = activeSelection.top;
        const objects = activeSelection.getObjects();
        const group = new fabric.Group(objects, {
            left: groupLeft,
            top: groupTop,
            originX: 'center',
            originY: 'center',
        });
        this.canvas.remove(activeSelection);
        this.canvas.add(group);
        this.canvas.setActiveObject(group);
        this.canvas.requestRenderAll();
    };

    unGroup = () => {
        const activeObject = this.canvas.getActiveObject();

        // Check if the selection is a group
        if (activeObject && activeObject.type === 'group') {
            (activeObject as any).toActiveSelection();
            this.canvas.requestRenderAll();
        }
    };

    // Image tools

    cropImage = () => {
        // Import the crop tool dynamically
        import('./image-tools/crop').then(({ ImageCrop }) => {
            ImageCrop.cropImage(this.canvas);
        });
    };

    maskImage = () => {
        // Import the crop tool dynamically
        import('./image-tools/crop').then(({ ImageCrop }) => {
            ImageCrop.maskImage(this.canvas);
        });
    };

    // Image filters

    applyGrayscale = () => {
        import('./image-tools/filters').then(({ ImageFilters }) => {
            ImageFilters.applyGrayscale(this.canvas);
        });
    };

    applySepia = () => {
        import('./image-tools/filters').then(({ ImageFilters }) => {
            ImageFilters.applySepia(this.canvas);
        });
    };

    applyInvert = () => {
        import('./image-tools/filters').then(({ ImageFilters }) => {
            ImageFilters.applyInvert(this.canvas);
        });
    };

    applyBlur = (blur: number = 0.2) => {
        import('./image-tools/filters').then(({ ImageFilters }) => {
            ImageFilters.applyBlur(this.canvas, blur);
        });
    };

    applyNoise = (noise: number = 100) => {
        import('./image-tools/filters').then(({ ImageFilters }) => {
            ImageFilters.applyNoise(this.canvas, noise);
        });
    };

    applyBrightness = (brightness: number = 0.1) => {
        import('./image-tools/filters').then(({ ImageFilters }) => {
            ImageFilters.applyBrightness(this.canvas, brightness);
        });
    };

    applyContrast = (contrast: number = 0.1) => {
        import('./image-tools/filters').then(({ ImageFilters }) => {
            ImageFilters.applyContrast(this.canvas, contrast);
        });
    };

    applySaturation = (saturation: number = 0.1) => {
        import('./image-tools/filters').then(({ ImageFilters }) => {
            ImageFilters.applySaturation(this.canvas, saturation);
        });
    };

    applyHueRotation = (rotation: number = 90) => {
        import('./image-tools/filters').then(({ ImageFilters }) => {
            ImageFilters.applyHueRotation(this.canvas, rotation);
        });
    };

    removeFilters = () => {
        import('./image-tools/filters').then(({ ImageFilters }) => {
            ImageFilters.removeFilters(this.canvas);
        });
    };
}
