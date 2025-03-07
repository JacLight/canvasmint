import React from 'react';
import { CanvasMint } from 'canvasmint';

/**
 * Basic example of using CanvasMint
 */
const App: React.FC = () => {
    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <h1>CanvasMint Basic Example</h1>

            {/* CanvasMint component with default settings */}
            <div style={{ width: '100%', height: 'calc(100% - 60px)' }}>
                <CanvasMint
                    canvasConfig={{
                        width: 1200,
                        height: 800,
                        background: '#ffffff'
                    }}
                    onSave={(id, data) => {
                        console.log('Design saved:', id, data);
                    }}
                    onExport={(format, data) => {
                        console.log('Design exported:', format);
                    }}
                    onError={(error) => {
                        console.error('Error:', error);
                    }}
                />
            </div>
        </div>
    );
};

export default App;
