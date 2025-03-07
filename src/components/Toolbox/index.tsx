import React, { useState } from 'react';
import { ThemeConfig, ToolbarConfig } from '../CanvasMint/types';

interface ToolboxProps {
    toolbarConfig?: ToolbarConfig;
    theme?: ThemeConfig;
    onToolSelect?: (tool: string) => void;
}

/**
 * Toolbox component for CanvasMint
 */
export const Toolbox: React.FC<ToolboxProps> = ({
    toolbarConfig,
    theme,
    onToolSelect,
}) => {
    // Default toolbar config
    const defaultToolbarConfig: ToolbarConfig = {
        showShapes: true,
        showText: true,
        showImages: true,
        showDraw: true,
        showExport: true,
        showSave: true,
    };

    // Merge with provided config
    const config = { ...defaultToolbarConfig, ...toolbarConfig };

    // Active tool state
    const [activeTool, setActiveTool] = useState<string>('select');

    // Theme styles
    const styles = {
        toolbox: {
            backgroundColor: theme?.background || '#ffffff',
            color: theme?.text || '#333333',
            borderRight: `1px solid ${theme?.border || '#e0e0e0'}`,
        },
        tool: {
            color: theme?.text || '#333333',
            backgroundColor: 'transparent',
            border: 'none',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 0 8px 0',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '20px',
            transition: 'background-color 0.2s',
        },
        activeTool: {
            backgroundColor: theme?.primary || '#007bff',
            color: '#ffffff',
        },
    };

    // Handle tool click
    const handleToolClick = (tool: string) => {
        console.log('Tool clicked:', tool);
        setActiveTool(tool);

        // Call the onToolSelect callback if provided
        if (onToolSelect) {
            console.log('Calling onToolSelect with:', tool);
            onToolSelect(tool);
        } else {
            console.log('onToolSelect is not provided');
        }
    };

    return (
        <div
            className="canvasmint-toolbox"
            style={{
                width: '60px',
                padding: '16px 8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                ...styles.toolbox,
            }}
        >
            {/* Select Tool */}
            <button
                style={{
                    ...styles.tool,
                    ...(activeTool === 'select' ? styles.activeTool : {}),
                }}
                onClick={() => handleToolClick('select')}
                title="Select"
            >
                ◻️
            </button>

            {/* Draw Tools */}
            {config.showDraw && (
                <>
                    <button
                        style={{
                            ...styles.tool,
                            ...(activeTool === 'pencil' ? styles.activeTool : {}),
                        }}
                        onClick={() => handleToolClick('pencil')}
                        title="Pencil"
                    >
                        ✏️
                    </button>
                    <button
                        style={{
                            ...styles.tool,
                            ...(activeTool === 'brush' ? styles.activeTool : {}),
                        }}
                        onClick={() => handleToolClick('brush')}
                        title="Brush"
                    >
                        🖌️
                    </button>
                </>
            )}

            {/* Shape Tools */}
            {config.showShapes && (
                <>
                    <button
                        style={{
                            ...styles.tool,
                            ...(activeTool === 'rectangle' ? styles.activeTool : {}),
                        }}
                        onClick={() => handleToolClick('rectangle')}
                        title="Rectangle"
                    >
                        □
                    </button>
                    <button
                        style={{
                            ...styles.tool,
                            ...(activeTool === 'circle' ? styles.activeTool : {}),
                        }}
                        onClick={() => handleToolClick('circle')}
                        title="Circle"
                    >
                        ○
                    </button>
                    <button
                        style={{
                            ...styles.tool,
                            ...(activeTool === 'triangle' ? styles.activeTool : {}),
                        }}
                        onClick={() => handleToolClick('triangle')}
                        title="Triangle"
                    >
                        △
                    </button>
                </>
            )}

            {/* Text Tool */}
            {config.showText && (
                <button
                    style={{
                        ...styles.tool,
                        ...(activeTool === 'text' ? styles.activeTool : {}),
                    }}
                    onClick={() => handleToolClick('text')}
                    title="Text"
                >
                    T
                </button>
            )}

            {/* Image Tool */}
            {config.showImages && (
                <button
                    style={{
                        ...styles.tool,
                        ...(activeTool === 'image' ? styles.activeTool : {}),
                    }}
                    onClick={() => handleToolClick('image')}
                    title="Image"
                >
                    🖼️
                </button>
            )}

            {/* Divider */}
            <div
                style={{
                    width: '30px',
                    height: '1px',
                    backgroundColor: theme?.border || '#e0e0e0',
                    margin: '8px 0',
                }}
            ></div>

            {/* Delete Tool */}
            <button
                style={{
                    ...styles.tool,
                    ...(activeTool === 'delete' ? styles.activeTool : {}),
                }}
                onClick={() => handleToolClick('delete')}
                title="Delete"
            >
                🗑️
            </button>
        </div>
    );
};
