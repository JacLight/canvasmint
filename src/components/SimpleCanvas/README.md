# SimpleCanvas Component

A lightweight React component that provides a simple canvas drawing interface using Fabric.js.

## Features

- Easy to integrate into any React application
- Provides a simple API for adding shapes to the canvas
- Supports rectangles, circles, and more
- Includes buttons for adding shapes and clearing the canvas
- Fully customizable with props

## Usage

```tsx
import { SimpleCanvas } from './components/SimpleCanvas';

function App() {
  return (
    <div className="App">
      <h1>Canvas Drawing App</h1>
      <SimpleCanvas width={800} height={600} />
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| width | number | 800 | Width of the canvas in pixels |
| height | number | 600 | Height of the canvas in pixels |

## Example

The SimpleCanvas component can be used to create a simple drawing application:

```tsx
import React from 'react';
import { SimpleCanvas } from './components/SimpleCanvas';

export const SimpleCanvasDemo: React.FC = () => {
    return (
        <div className="simple-canvas-demo">
            <h1>Simple Canvas Demo</h1>
            <p>This is a simple demo of the SimpleCanvas component.</p>
            <SimpleCanvas width={800} height={600} />
        </div>
    );
};
```

## Implementation Details

The SimpleCanvas component uses Fabric.js to create and manage the canvas. It provides a simple interface for adding shapes to the canvas and clearing the canvas.

The component uses React hooks to manage the canvas state and to handle user interactions. It also provides a clean API for adding custom functionality.

## License

MIT
