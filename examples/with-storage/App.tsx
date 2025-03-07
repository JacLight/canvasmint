import React, { useState, useEffect } from 'react';
import { CanvasMint, createStorageAdapter, StorageAdapter } from 'canvasmint';

/**
 * Example of using CanvasMint with custom storage
 */
const App: React.FC = () => {
    const [designs, setDesigns] = useState<string[]>([]);
    const [selectedDesign, setSelectedDesign] = useState<string | null>(null);

    // Create a custom storage adapter that uses an API
    const customStorage: StorageAdapter = createStorageAdapter({
        save: async (id, data) => {
            try {
                // In a real application, this would be an API call
                console.log(`Saving design ${id} to API`);

                // Simulate API call
                localStorage.setItem(`api-design-${id}`, JSON.stringify(data));

                // Update designs list
                const designList = await customStorage.list();
                setDesigns(designList);

                return true;
            } catch (error) {
                console.error('Error saving design:', error);
                return false;
            }
        },

        load: async (id) => {
            try {
                // In a real application, this would be an API call
                console.log(`Loading design ${id} from API`);

                // Simulate API call
                const data = localStorage.getItem(`api-design-${id}`);
                if (!data) {
                    throw new Error(`Design with ID ${id} not found`);
                }

                return JSON.parse(data);
            } catch (error) {
                console.error('Error loading design:', error);
                throw error;
            }
        },

        list: async () => {
            try {
                // In a real application, this would be an API call
                console.log('Listing designs from API');

                // Simulate API call
                const designs: string[] = [];
                for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    if (key && key.startsWith('api-design-')) {
                        designs.push(key.replace('api-design-', ''));
                    }
                }

                return designs;
            } catch (error) {
                console.error('Error listing designs:', error);
                return [];
            }
        },

        delete: async (id) => {
            try {
                // In a real application, this would be an API call
                console.log(`Deleting design ${id} from API`);

                // Simulate API call
                localStorage.removeItem(`api-design-${id}`);

                // Update designs list
                const designList = await customStorage.list();
                setDesigns(designList);

                return true;
            } catch (error) {
                console.error('Error deleting design:', error);
                return false;
            }
        }
    });

    // Load designs on mount
    useEffect(() => {
        const loadDesigns = async () => {
            const designList = await customStorage.list();
            setDesigns(designList);
        };

        loadDesigns();
    }, []);

    // Handle design selection
    const handleDesignSelect = (id: string) => {
        setSelectedDesign(id);
    };

    // Handle design deletion
    const handleDesignDelete = async (id: string) => {
        await customStorage.delete(id);
    };

    return (
        <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <h1>CanvasMint with Custom Storage</h1>

            <div style={{ display: 'flex', gap: '20px', padding: '10px' }}>
                <div style={{ width: '200px', border: '1px solid #ccc', padding: '10px' }}>
                    <h3>Saved Designs</h3>
                    {designs.length === 0 ? (
                        <p>No designs saved yet</p>
                    ) : (
                        <ul>
                            {designs.map(id => (
                                <li key={id} style={{ marginBottom: '10px' }}>
                                    <button
                                        onClick={() => handleDesignSelect(id)}
                                        style={{
                                            marginRight: '10px',
                                            backgroundColor: selectedDesign === id ? '#007bff' : '#f0f0f0',
                                            color: selectedDesign === id ? 'white' : 'black'
                                        }}
                                    >
                                        {id}
                                    </button>
                                    <button onClick={() => handleDesignDelete(id)}>Delete</button>
                                </li>
                            ))}
                        </ul>
                    )}
                    <button onClick={() => setSelectedDesign(null)}>New Design</button>
                </div>

                <div style={{ flex: 1, border: '1px solid #ccc' }}>
                    <CanvasMint
                        id={selectedDesign}
                        storageAdapter={customStorage}
                        canvasConfig={{
                            width: 1000,
                            height: 600,
                            background: '#ffffff'
                        }}
                        onSave={(id, data) => {
                            console.log('Design saved:', id, data);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default App;
