/**
 * Storage adapter interface
 * This adapter is used to save and load designs
 */
export interface StorageAdapter {
    /**
     * Save a design
     * @param id Design ID
     * @param data Design data
     * @returns Promise that resolves to true if successful, false otherwise
     */
    save: (id: string, data: any) => Promise<boolean>;

    /**
     * Load a design
     * @param id Design ID
     * @returns Promise that resolves to the design data
     */
    load: (id: string) => Promise<any>;

    /**
     * List all designs
     * @returns Promise that resolves to an array of design IDs
     */
    list: () => Promise<string[]>;

    /**
     * Delete a design
     * @param id Design ID
     * @returns Promise that resolves to true if successful, false otherwise
     */
    delete: (id: string) => Promise<boolean>;
}
