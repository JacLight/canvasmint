import { FileAdapter } from './types';
import { dataURLtoBlob } from '../../utils/helpers';

/**
 * Create a default file adapter
 * @param overrides Optional overrides for the default adapter
 * @returns File adapter
 */
export const createDefaultFileAdapter = (overrides?: Partial<FileAdapter>): FileAdapter => {
    // Default implementation using browser APIs
    const defaultAdapter: FileAdapter = {
        upload: async (file: File) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => {
                    resolve(reader.result as string);
                };
                reader.onerror = () => {
                    reject(new Error('Failed to read file'));
                };
                reader.readAsDataURL(file);
            });
        },
        download: async (data: string, filename: string) => {
            try {
                const blob = dataURLtoBlob(data);
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
                return true;
            } catch (error) {
                console.error('Error downloading file:', error);
                return false;
            }
        },
    };

    // Merge with overrides
    return { ...defaultAdapter, ...overrides };
};
