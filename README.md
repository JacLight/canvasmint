# CanvasMint

A standalone canvas-based design tool built with React and Fabric.js.

## Overview

CanvasMint is a powerful and flexible canvas-based design tool that allows users to create and edit designs using a variety of tools and features. It is built with React and Fabric.js, making it easy to integrate into any React application.

## Features

- **Drawing Tools**: Rectangle, Circle, Triangle, Line, Path, and more
- **Text Tool**: Add and edit text with various fonts and styles
- **Image Tools**: Import, crop, and filter images
- **Selection Tools**: Select, move, resize, and rotate objects
- **Export Options**: Export designs as PNG, JPEG, or SVG
- **Save and Load**: Save designs and load them later
- **Undo/Redo**: Full history support with undo and redo
- **Customizable**: Easily customize the appearance and behavior

## Installation

```bash
npm install canvasmint
# or
yarn add canvasmint
```

## Usage

```jsx
import React from 'react';
import { CanvasMint } from 'canvasmint';

function App() {
  return (
    <div className="App">
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
      />
    </div>
  );
}

export default App;
```

## SimpleCanvas Component

For simpler use cases, CanvasMint also provides a lightweight SimpleCanvas component that offers basic canvas functionality without the full feature set of CanvasMint.

```jsx
import React from 'react';
import { SimpleCanvas } from 'canvasmint';

function App() {
  return (
    <div className="App">
      <SimpleCanvas width={800} height={600} />
    </div>
  );
}

export default App;
```

See the [SimpleCanvas documentation](./src/components/SimpleCanvas/README.md) for more details.

## Project Structure

```
canvasmint/
├── src/
│   ├── components/
│   │   ├── CanvasMint/
│   │   ├── MenuBar/
│   │   ├── Toolbox/
│   │   ├── Properties/
│   │   └── SimpleCanvas/
│   ├── engine/
│   │   ├── core.ts
│   │   └── draw-tools/
│   ├── adapters/
│   │   ├── storage/
│   │   ├── file/
│   │   └── notification/
│   ├── store/
│   │   └── canvas-store.ts
│   └── utils/
├── demo/
│   ├── src/
│   │   ├── App.tsx
│   │   └── SimpleCanvasDemo.tsx
│   └── public/
└── README.md
```

## Demo

### Running Locally

To run the demo locally:

```bash
# Clone the repository
git clone https://github.com/yourusername/canvasmint.git
cd canvasmint

# Install dependencies
npm install

# Run the demo
cd demo
npm install
npm run dev
```

### GitHub Pages Demo

The demo is also available on GitHub Pages:

```
https://jaclight.github.io/canvasmint/
```

The GitHub Pages demo is automatically updated whenever changes are merged to the main branch, thanks to the GitHub Actions workflow configured in `.github/workflows/deploy-demo.yml`.

## Migration

This project was migrated from a component within a larger application to a standalone library. For details on the migration strategy, see the [Migration Strategy](./CanvasMint-Migration.md) document.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
