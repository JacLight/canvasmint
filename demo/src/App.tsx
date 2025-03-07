import React, { useState } from 'react';
import { CanvasMint } from '../../src';
import { SimpleCanvasDemo } from './SimpleCanvasDemo';

const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('simple');

    return (
        <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <header style={{ padding: '20px', borderBottom: '1px solid #ccc' }}>
                <h1>CanvasMint Demo</h1>
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <button
                        onClick={() => setActiveTab('simple')}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: activeTab === 'simple' ? '#007bff' : '#f0f0f0',
                            color: activeTab === 'simple' ? 'white' : 'black',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Simple Canvas
                    </button>
                    <button
                        onClick={() => setActiveTab('basic')}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: activeTab === 'basic' ? '#007bff' : '#f0f0f0',
                            color: activeTab === 'basic' ? 'white' : 'black',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Basic Demo
                    </button>
                    <button
                        onClick={() => setActiveTab('themed')}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: activeTab === 'themed' ? '#007bff' : '#f0f0f0',
                            color: activeTab === 'themed' ? 'white' : 'black',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Themed Demo
                    </button>
                </div>
            </header>

            <main style={{ flex: 1, padding: '20px' }}>
                {activeTab === 'simple' && (
                    <SimpleCanvasDemo />
                )}

                {activeTab === 'basic' && (
                    <div style={{ width: '100%', height: '100%' }}>
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
                )}

                {activeTab === 'themed' && (
                    <div style={{ width: '100%', height: '100%' }}>
                        <CanvasMint
                            canvasConfig={{
                                width: 1200,
                                height: 800,
                                background: '#f5f5f5'
                            }}
                            theme={{
                                primary: '#6200ee',
                                secondary: '#03dac6',
                                background: '#ffffff',
                                text: '#333333',
                                border: '#e0e0e0'
                            }}
                            toolbarConfig={{
                                showShapes: true,
                                showText: true,
                                showImages: true,
                                showDraw: true,
                                showExport: true,
                                showSave: true
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
                )}
            </main>

            <footer style={{ padding: '20px', borderTop: '1px solid #ccc', textAlign: 'center' }}>
                <p>CanvasMint Demo - A standalone canvas-based design tool</p>
            </footer>
        </div>
    );
};

export default App;
