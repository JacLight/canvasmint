# CanvasMint Examples

This directory contains examples of how to use the CanvasMint component in different scenarios.

## Basic Example

The basic example demonstrates how to use CanvasMint with default settings.

### Running the Basic Example

1. Navigate to the basic example directory:

```bash
cd examples/basic
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## With Storage Example

The with-storage example demonstrates how to use CanvasMint with a custom storage adapter.

### Running the With Storage Example

1. Navigate to the with-storage example directory:

```bash
cd examples/with-storage
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Creating Your Own Example

To create your own example:

1. Create a new directory in the examples directory:

```bash
mkdir examples/my-example
```

2. Create a package.json file:

```json
{
  "name": "canvasmint-my-example",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "canvasmint": "file:../../",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.2.0",
    "typescript": "^5.3.3",
    "vite": "^5.0.11"
  }
}
```

3. Create a vite.config.ts file:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
```

4. Create an index.html file:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CanvasMint - My Example</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

5. Create a src directory and add your example code:

```bash
mkdir -p examples/my-example/src
```

6. Create a main.tsx file:

```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'canvasmint/dist/styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

7. Create an App.tsx file with your example code:

```typescript
import React from 'react';
import { CanvasMint } from 'canvasmint';

const App: React.FC = () => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <h1>CanvasMint - My Example</h1>
      <div style={{ width: '100%', height: 'calc(100% - 60px)' }}>
        <CanvasMint />
      </div>
    </div>
  );
};

export default App;
```

8. Run your example:

```bash
cd examples/my-example
npm install
npm run dev
