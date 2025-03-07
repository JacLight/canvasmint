// Export main components
export { CanvasMint } from './components/CanvasMint';
export { SimpleCanvas } from './components/SimpleCanvas';

// Export types
export type { CanvasMintProps } from './components/CanvasMint/types';
export type { SimpleCanvasProps } from './components/SimpleCanvas/types';

// Export engine
export { CanvasEngine } from './engine/core';

// Export adapters
export { createDefaultStorageAdapter } from './adapters/storage';
export { createDefaultFileAdapter } from './adapters/file';
export { createDefaultNotificationAdapter } from './adapters/notification';

// Export store
export { useCanvasStore } from './store/canvas-store';

// Export utils
// Add any utility exports here
