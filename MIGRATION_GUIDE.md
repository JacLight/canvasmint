# Migration Guide: creative-studio to CanvasMint

This guide provides step-by-step instructions for migrating from the creative-studio component to the standalone CanvasMint component.

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Basic Migration](#basic-migration)
5. [Advanced Configuration](#advanced-configuration)
6. [Adapters](#adapters)
7. [Troubleshooting](#troubleshooting)

## Overview

The creative-studio component from WebsiteMint has been migrated to a standalone component called CanvasMint. This migration allows the component to be used independently of the WebsiteMint project.

Key differences between creative-studio and CanvasMint:

| Feature | creative-studio | CanvasMint |
|---------|----------------|------------|
| State Management | Depends on external stores | Self-contained Zustand store |
| Data Services | Uses WebsiteMint services | Uses adapters with default implementations |
| UI Components | Uses WebsiteMint components | Self-contained components |
| Styling | Uses WebsiteMint styles | Standalone styles with theming support |
| Build System | Part of WebsiteMint | Independent build system |

## Prerequisites

- Node.js 18+
- npm or yarn
- React 18+

## Installation

```bash
npm install canvasmint
# or
yarn add canvasmint
```

## Basic Migration

### 1. Replace Import Statements

**Before (creative-studio):**

```jsx
import { CreativeStudio } from 'components/creative-studio';
```

**After (CanvasMint):**

```jsx
import { CanvasMint } from 'canvasmint';
```

### 2. Update Component Usage

**Before (creative-studio):**

```jsx
<CreativeStudio uid={designId} />
```

**After (CanvasMint):**

```jsx
<CanvasMint id={designId} />
```

### 3. Add Required CSS

**Before (creative-studio):**
CSS was included in the WebsiteMint project.

**After (CanvasMint):**
Import the CSS in your application:

```jsx
import 'canvasmint/dist/styles.css';
```

## Advanced Configuration

### Theme Configuration

CanvasMint supports theming:

```jsx
<CanvasMint 
  theme={{
    primary: '#007bff',
    secondary: '#6c757d',
    background: '#ffffff',
    text: '#333333',
    border: '#e9ecef'
  }}
/>
```

### Custom Toolbar Configuration

You can customize which tools are available:

```jsx
<CanvasMint 
  toolbarConfig={{
    showShapes: true,
    showText: true,
    showImages: true,
    showDraw: true,
    showExport: true,
    showSave: true
  }}
/>
```

### Canvas Size Configuration

```jsx
<CanvasMint 
  canvasConfig={{
    width: 1200,
    height: 800,
    background: '#ffffff'
  }}
/>
```

## Adapters

CanvasMint uses adapters to interact with external services. You can provide custom adapters for storage, file operations, and notifications.

### Storage Adapter

```jsx
import { CanvasMint, createStorageAdapter } from 'canvasmint';

const storageAdapter = createStorageAdapter({
  save: async (id, data) => {
    // Custom save logic
    await api.saveDesign(id, data);
    return true;
  },
  load: async (id) => {
    // Custom load logic
    return await api.loadDesign(id);
  },
  list: async () => {
    // Custom list logic
    return await api.listDesigns();
  },
  delete: async (id) => {
    // Custom delete logic
    await api.deleteDesign(id);
    return true;
  }
});

<CanvasMint storageAdapter={storageAdapter} />
```

### File Adapter

```jsx
import { CanvasMint, createFileAdapter } from 'canvasmint';

const fileAdapter = createFileAdapter({
  upload: async (file) => {
    // Custom upload logic
    const url = await api.uploadFile(file);
    return url;
  },
  download: async (url, filename) => {
    // Custom download logic
    await api.downloadFile(url, filename);
  }
});

<CanvasMint fileAdapter={fileAdapter} />
```

### Notification Adapter

```jsx
import { CanvasMint, createNotificationAdapter } from 'canvasmint';

const notificationAdapter = createNotificationAdapter({
  notify: (message, type) => {
    // Custom notification logic
    switch (type) {
      case 'success':
        toast.success(message);
        break;
      case 'error':
        toast.error(message);
        break;
      case 'warning':
        toast.warning(message);
        break;
      case 'info':
        toast.info(message);
        break;
    }
  }
});

<CanvasMint notificationAdapter={notificationAdapter} />
```

## Migrating from WebsiteMint Integration

If you were using creative-studio within WebsiteMint and want to maintain the same integration, you can use the WebsiteMint adapters:

```jsx
import { CanvasMint } from 'canvasmint';
import { 
  createWebsiteMintStorageAdapter,
  createWebsiteMintFileAdapter,
  createWebsiteMintNotificationAdapter
} from 'canvasmint/adapters/websitemint';

<CanvasMint 
  storageAdapter={createWebsiteMintStorageAdapter()}
  fileAdapter={createWebsiteMintFileAdapter()}
  notificationAdapter={createWebsiteMintNotificationAdapter()}
/>
```

## Troubleshooting

### Common Issues

#### Issue: Canvas not rendering

**Solution:** Make sure you've imported the CSS and the container has a defined width and height.

```jsx
import 'canvasmint/dist/styles.css';

<div style={{ width: '100%', height: '600px' }}>
  <CanvasMint />
</div>
```

#### Issue: Images not loading

**Solution:** Check your file adapter configuration or use the default one.

#### Issue: Cannot save designs

**Solution:** Check your storage adapter configuration or use the default one which saves to localStorage.

### Migration Checklist

- [ ] Install CanvasMint package
- [ ] Replace import statements
- [ ] Update component usage
- [ ] Add required CSS
- [ ] Configure adapters if needed
- [ ] Test functionality
- [ ] Update any custom integrations

## Support

For additional support, please refer to the [CanvasMint documentation](https://github.com/your-org/canvasmint) or open an issue on GitHub.
