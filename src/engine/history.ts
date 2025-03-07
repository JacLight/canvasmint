import { fabric } from 'fabric';

/**
 * Canvas History class for undo/redo functionality
 * This is a standalone version of the CanvasHistory class from creative-studio
 */
export class CanvasHistory {
    private history: any[] = [];
    private historyIndex: number = -1;
    private undoing: boolean = false;
    private redoing: boolean = false;

    constructor(private canvas: fabric.Canvas) {
        // Initialize with current state
        this.saveState();
    }

    /**
     * Save the current state of the canvas to history
     */
    saveState() {
        // Don't save state if we're in the middle of undoing/redoing
        if (this.undoing || this.redoing) {
            return;
        }

        // If we're not at the end of the history, remove all future states
        if (this.historyIndex < this.history.length - 1) {
            this.history = this.history.slice(0, this.historyIndex + 1);
        }

        // Save current state
        this.history.push(JSON.stringify(this.canvas.toJSON()));
        this.historyIndex = this.history.length - 1;
    }

    /**
     * Undo the last action
     */
    undoState() {
        if (this.historyIndex > 0) {
            this.undoing = true;
            this.historyIndex--;
            this.loadState();
            this.undoing = false;
        }
    }

    /**
     * Redo the last undone action
     */
    redoState() {
        if (this.historyIndex < this.history.length - 1) {
            this.redoing = true;
            this.historyIndex++;
            this.loadState();
            this.redoing = false;
        }
    }

    /**
     * Load a state from history
     */
    private loadState() {
        if (this.historyIndex >= 0 && this.historyIndex < this.history.length) {
            const state = JSON.parse(this.history[this.historyIndex]);
            this.canvas.loadFromJSON(state, () => {
                this.canvas.renderAll();
            });
        }
    }

    /**
     * Clear history
     */
    clearHistory() {
        this.history = [];
        this.historyIndex = -1;
        this.saveState();
    }

    /**
     * Get the current history
     */
    getHistory() {
        return this.history;
    }

    /**
     * Get the current history index
     */
    getHistoryIndex() {
        return this.historyIndex;
    }

    /**
     * Check if we can undo
     */
    canUndo() {
        return this.historyIndex > 0;
    }

    /**
     * Check if we can redo
     */
    canRedo() {
        return this.historyIndex < this.history.length - 1;
    }
}
