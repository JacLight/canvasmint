import { StorageAdapter } from './types';

/**
 * Create a default storage adapter
 * @param overrides Optional overrides for the default adapter
 * @returns Storage adapter
 */
export const createDefaultStorageAdapter = (overrides?: Partial<StorageAdapter>): StorageAdapter => {
    // Default implementation using localStorage
    const defaultAdapter: StorageAdapter = {
        save: async (id: string, data: any) => {
            try {
                localStorage.setItem(`canvasmint-${id}`, JSON.stringify(data));
                return true;
            } catch (error) {
                console.error('Error saving to localStorage:', error);
                return false;
            }
        },
        load: async (id: string) => {
            const data = localStorage.getItem(`canvasmint-${id}`);
            if (!data) {
                throw new Error(`Design with ID ${id} not found`);
            }
            return JSON.parse(data);
        },
        list: async () => {
            const designs: string[] = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith('canvasmint-')) {
                    designs.push(key.replace('canvasmint-', ''));
                }
            }
            return designs;
        },
        delete: async (id: string) => {
            try {
                localStorage.removeItem(`canvasmint-${id}`);
                return true;
            } catch (error) {
                console.error('Error deleting from localStorage:', error);
                return false;
            }
        },
    };

    // Merge with overrides
    return { ...defaultAdapter, ...overrides };
};
