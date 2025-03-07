import React from 'react';
import { SimpleCanvas } from '../../src/components/SimpleCanvas';

export const SimpleCanvasDemo: React.FC = () => {
    return (
        <div className="simple-canvas-demo">
            <h1>Simple Canvas Demo</h1>
            <p>This is a simple demo of the SimpleCanvas component.</p>
            <SimpleCanvas width={800} height={600} />
        </div>
    );
};
