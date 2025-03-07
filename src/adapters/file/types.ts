/**
 * File adapter interface
 * This adapter is used to upload and download files
 */
export interface FileAdapter {
    /**
     * Upload a file
     * @param file File to upload
     * @returns Promise that resolves to the file data URL
     */
    upload: (file: File) => Promise<string>;

    /**
     * Download a file
     * @param data File data URL
     * @param filename Filename
     * @param type File type
     * @returns Promise that resolves to true if successful, false otherwise
     */
    download: (data: string, filename: string) => Promise<boolean>;
}
