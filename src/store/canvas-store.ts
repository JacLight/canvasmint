import { produce } from 'immer';
import { create } from 'zustand';
import { CanvasEngine } from '../engine/core';
import { DrawFree } from '../engine/draw-tools/draw-free';

export interface CanvasStoreProps {
    engine?: CanvasEngine;
    setStateItem?: (item: { [key: string]: any }) => void;
    setActiveSub?: (activeSub: any) => void;
    activeSub?: any;
    canvasFile?: any;
    fileName?: string;
    setTemplate?: any;
    style?: { [key: string]: any };
    canvasHeight?: number;
    canvasWidth?: number;
    timestamp?: number;
    zoom?: number;
    updateStyle?: (name: string, value: any) => any;
    getStateItem?: (name: string) => any;
    saveHistory?: (data?: any) => void;
    activeObject?: fabric.Object | null;
    name?: string;
    restoreState?: (state: any) => void;
    [key: string]: any; // Index signature to allow string indexing
}

/**
 * Canvas store using Zustand
 * This is a standalone version of the creative-studio store
 */
export const useCanvasStore = create<CanvasStoreProps>((set, get) => {
    let initialState = {
        name: 'canvasmint-store',
        canvasHeight: 800,
        canvasWidth: 1200,
        zoom: 1,
        timestamp: 0,
        style: {},
    };

    // History management
    const history: any[] = [];
    const future: any[] = [];

    const saveHistory = () => {
        const { engine } = get();
        if (!engine) return;

        const currentState = { data: engine.canvas?.toJSON() };
        history.push(currentState);
        future.length = 0; // Clear future when new actions are taken
    };

    return {
        ...initialState,
        getStateItem: (name: keyof CanvasStoreProps) => get()[name],
        setStateItem: (item: { [key: string]: any }) => set(() => ({ ...item })),
        setActiveSub: (activeSub: any) => set(() => ({ activeSub })),
        updateStyle: (name, value) =>
            set(state => {
                saveHistory();

                const style = produce(state.style || {}, (draft: { [key: string]: any }) => {
                    draft[name] = value;
                });

                // Update brush style if needed
                if (brushStyles.includes(name) && state.engine) {
                    DrawFree.changeBrushStyle(style, state.engine.canvas);
                }

                return { style };
            }),
        restoreState: (state: any) => {
            const { engine } = get();
            if (engine && state.data) {
                engine.loadFromJson(state.data);
            }
        },
        saveHistory: saveHistory,
    };
});

// Brush styles that need special handling
const brushStyles = ['brushMode', 'stroke', 'strokeWidth', 'shadow'];
