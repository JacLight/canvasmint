import React from 'react';
import { ThemeConfig, ToolbarConfig } from '../CanvasMint/types';

interface MenuBarProps {
    onSave: () => void;
    onExport: (format: string) => void;
    toolbarConfig?: ToolbarConfig;
    theme?: ThemeConfig;
}

/**
 * MenuBar component for CanvasMint
 */
export const MenuBar: React.FC<MenuBarProps> = ({
    onSave,
    onExport,
    toolbarConfig,
    theme,
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

    // Theme styles
    const styles = {
        menuBar: {
            backgroundColor: theme?.background || '#ffffff',
            color: theme?.text || '#333333',
            borderBottom: `1px solid ${theme?.border || '#e0e0e0'}`,
        },
        menuItem: {
            color: theme?.text || '#333333',
            backgroundColor: 'transparent',
            border: 'none',
            padding: '8px 12px',
            margin: '0 4px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 500,
            transition: 'background-color 0.2s',
        },
        menuItemHover: {
            backgroundColor: theme?.border || '#e0e0e0',
        },
    };

    // Handle export menu
    const handleExportClick = (format: string) => {
        onExport(format);
    };

    return (
        <div
            className="canvasmint-menu"
            style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px 16px',
                ...styles.menuBar,
            }}
        >
            {/* File Menu */}
            <div style={{ marginRight: '16px' }}>
                <button
                    style={styles.menuItem}
                    onClick={() => { }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = styles.menuItemHover.backgroundColor;
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                >
                    File
                </button>
            </div>

            {/* Edit Menu */}
            <div style={{ marginRight: '16px' }}>
                <button
                    style={styles.menuItem}
                    onClick={() => { }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = styles.menuItemHover.backgroundColor;
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                >
                    Edit
                </button>
            </div>

            {/* View Menu */}
            <div style={{ marginRight: '16px' }}>
                <button
                    style={styles.menuItem}
                    onClick={() => { }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = styles.menuItemHover.backgroundColor;
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                >
                    View
                </button>
            </div>

            {/* Spacer */}
            <div style={{ flex: 1 }}></div>

            {/* Save Button */}
            {config.showSave && (
                <div>
                    <button
                        style={{
                            ...styles.menuItem,
                            backgroundColor: theme?.primary || '#007bff',
                            color: '#ffffff',
                        }}
                        onClick={onSave}
                        onMouseOver={(e) => {
                            e.currentTarget.style.opacity = '0.9';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.opacity = '1';
                        }}
                    >
                        Save
                    </button>
                </div>
            )}

            {/* Export Button */}
            {config.showExport && (
                <div style={{ position: 'relative', marginLeft: '8px' }}>
                    <button
                        style={{
                            ...styles.menuItem,
                            backgroundColor: theme?.secondary || '#6c757d',
                            color: '#ffffff',
                        }}
                        onClick={() => handleExportClick('png')}
                        onMouseOver={(e) => {
                            e.currentTarget.style.opacity = '0.9';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.opacity = '1';
                        }}
                    >
                        Export
                    </button>
                </div>
            )}
        </div>
    );
};
