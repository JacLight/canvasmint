# CanvasMint Demo

This is a demo application for the CanvasMint canvas editor component.

## Getting Started

To run the demo, follow these steps:

1. Make sure you have Node.js and npm installed on your system.

2. Install dependencies:

```bash
cd demo
npm install
```

3. Run the demo:

```bash
npm run dev
```

Alternatively, you can use the provided script:

```bash
./run-demo.sh
```

This will start a development server and open the demo in your browser.

## Demo Components

The demo showcases two main components:

### 1. SimpleCanvas

The SimpleCanvas component is a lightweight canvas drawing interface that provides basic functionality:

- Adding rectangles and circles to the canvas
- Clearing the canvas
- Simple API for customization

To view the SimpleCanvas demo, click on the "Simple Canvas" tab in the demo application.

### 2. CanvasMint

The full CanvasMint component provides a rich set of features:

- Basic canvas editing
- Drawing tools (pencil, brush, shapes)
- Text tools
- Image manipulation
- Export functionality
- Theming options

To view the CanvasMint demos, click on the "Basic Demo" or "Themed Demo" tabs in the demo application.

## Project Structure

- `src/`: Source code for the demo
  - `App.tsx`: Main application component
  - `SimpleCanvasDemo.tsx`: SimpleCanvas demo component
  - `main.tsx`: Entry point for the application
- `public/`: Static assets
- `index.html`: HTML template

## Configuration

### SimpleCanvas Configuration

The SimpleCanvas component accepts the following props:

```tsx
<SimpleCanvas
  width={800}
  height={600}
  onInit={(canvas) => {
    console.log('Canvas initialized:', canvas);
  }}
  onObjectAdded={(object) => {
    console.log('Object added:', object);
  }}
  onObjectRemoved={(object) => {
    console.log('Object removed:', object);
  }}
  onCanvasCleared={() => {
    console.log('Canvas cleared');
  }}
/>
```

### CanvasMint Configuration

You can configure the CanvasMint component by modifying the `App.tsx` file. The CanvasMint component accepts various props for customization:

```tsx
<CanvasMint
  canvasConfig={{
    width: 1200,
    height: 800,
    background: '#ffffff'
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
```

## Troubleshooting

If you encounter any issues running the demo, try the following:

1. Make sure you have the latest version of Node.js and npm installed.
2. Clear your browser cache and reload the page.
3. Check the browser console for any error messages.
4. Try running the demo in a different browser.

## License

This demo is part of the CanvasMint project and is licensed under the MIT License.
