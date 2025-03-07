import React from 'react';
import { ThemeConfig } from '../CanvasMint/types';
import { useCanvasStore } from '../../store/canvas-store';

interface PropertiesProps {
    theme?: ThemeConfig;
}

/**
 * Properties component for CanvasMint
 */
export const Properties: React.FC<PropertiesProps> = ({
    theme,
}) => {
    // Get canvas store
    const { activeObject, updateStyle } = useCanvasStore();

    // Theme styles
    const styles = {
        properties: {
            backgroundColor: theme?.background || '#ffffff',
            color: theme?.text || '#333333',
            borderLeft: `1px solid ${theme?.border || '#e0e0e0'}`,
        },
        propertyGroup: {
            marginBottom: '16px',
        },
        propertyTitle: {
            fontWeight: 600,
            marginBottom: '8px',
            fontSize: '14px',
            color: theme?.text || '#333333',
        },
        property: {
            marginBottom: '8px',
        },
        propertyLabel: {
            display: 'block',
            marginBottom: '4px',
            fontSize: '12px',
            color: theme?.text ? `${theme.text}99` : '#666666',
        },
        propertyInput: {
            width: '100%',
            padding: '6px 8px',
            border: `1px solid ${theme?.border || '#e0e0e0'}`,
            borderRadius: '4px',
            fontSize: '14px',
            color: theme?.text || '#333333',
            backgroundColor: theme?.background || '#ffffff',
        },
        colorInput: {
            width: '100%',
            height: '32px',
            border: `1px solid ${theme?.border || '#e0e0e0'}`,
            borderRadius: '4px',
            padding: '0',
            cursor: 'pointer',
        },
    };

    // Handle property change
    const handlePropertyChange = (property: string, value: any) => {
        if (updateStyle) {
            updateStyle(property, value);
        }
    };

    // Get object type
    const getObjectType = () => {
        if (!activeObject) return 'No Selection';

        if (activeObject.type === 'i-text' || activeObject.type === 'text') {
            return 'Text';
        } else if (activeObject.type === 'image') {
            return 'Image';
        } else if (activeObject.type === 'rect') {
            return 'Rectangle';
        } else if (activeObject.type === 'circle') {
            return 'Circle';
        } else if (activeObject.type === 'triangle') {
            return 'Triangle';
        } else if (activeObject.type === 'path') {
            return 'Path';
        } else if (activeObject.type === 'group') {
            return 'Group';
        } else {
            return activeObject.type || 'Unknown';
        }
    };

    return (
        <div
            className="canvasmint-properties"
            style={{
                width: '240px',
                padding: '16px',
                overflow: 'auto',
                ...styles.properties,
            }}
        >
            <div style={styles.propertyGroup}>
                <div style={styles.propertyTitle}>Object Properties</div>
                <div style={styles.property}>
                    <label style={styles.propertyLabel}>Type</label>
                    <div style={{ ...styles.propertyInput, backgroundColor: '#f5f5f5' }}>
                        {getObjectType()}
                    </div>
                </div>
            </div>

            {activeObject && (
                <>
                    <div style={styles.propertyGroup}>
                        <div style={styles.propertyTitle}>Position & Size</div>
                        <div style={styles.property}>
                            <label style={styles.propertyLabel}>X Position</label>
                            <input
                                type="number"
                                style={styles.propertyInput}
                                value={Math.round((activeObject as any).left || 0)}
                                onChange={(e) => handlePropertyChange('left', parseInt(e.target.value))}
                            />
                        </div>
                        <div style={styles.property}>
                            <label style={styles.propertyLabel}>Y Position</label>
                            <input
                                type="number"
                                style={styles.propertyInput}
                                value={Math.round((activeObject as any).top || 0)}
                                onChange={(e) => handlePropertyChange('top', parseInt(e.target.value))}
                            />
                        </div>
                        <div style={styles.property}>
                            <label style={styles.propertyLabel}>Width</label>
                            <input
                                type="number"
                                style={styles.propertyInput}
                                value={Math.round((activeObject as any).width || 0)}
                                onChange={(e) => handlePropertyChange('width', parseInt(e.target.value))}
                            />
                        </div>
                        <div style={styles.property}>
                            <label style={styles.propertyLabel}>Height</label>
                            <input
                                type="number"
                                style={styles.propertyInput}
                                value={Math.round((activeObject as any).height || 0)}
                                onChange={(e) => handlePropertyChange('height', parseInt(e.target.value))}
                            />
                        </div>
                        <div style={styles.property}>
                            <label style={styles.propertyLabel}>Rotation</label>
                            <input
                                type="number"
                                style={styles.propertyInput}
                                value={Math.round((activeObject as any).angle || 0)}
                                onChange={(e) => handlePropertyChange('angle', parseInt(e.target.value))}
                            />
                        </div>
                    </div>

                    <div style={styles.propertyGroup}>
                        <div style={styles.propertyTitle}>Appearance</div>
                        <div style={styles.property}>
                            <label style={styles.propertyLabel}>Fill Color</label>
                            <input
                                type="color"
                                style={styles.colorInput}
                                value={(activeObject as any).fill || '#000000'}
                                onChange={(e) => handlePropertyChange('fill', e.target.value)}
                            />
                        </div>
                        <div style={styles.property}>
                            <label style={styles.propertyLabel}>Stroke Color</label>
                            <input
                                type="color"
                                style={styles.colorInput}
                                value={(activeObject as any).stroke || '#000000'}
                                onChange={(e) => handlePropertyChange('stroke', e.target.value)}
                            />
                        </div>
                        <div style={styles.property}>
                            <label style={styles.propertyLabel}>Stroke Width</label>
                            <input
                                type="number"
                                style={styles.propertyInput}
                                value={(activeObject as any).strokeWidth || 0}
                                onChange={(e) => handlePropertyChange('strokeWidth', parseInt(e.target.value))}
                            />
                        </div>
                        <div style={styles.property}>
                            <label style={styles.propertyLabel}>Opacity</label>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                style={styles.propertyInput}
                                value={(activeObject as any).opacity || 1}
                                onChange={(e) => handlePropertyChange('opacity', parseFloat(e.target.value))}
                            />
                        </div>
                    </div>

                    {(activeObject.type === 'i-text' || activeObject.type === 'text') && (
                        <div style={styles.propertyGroup}>
                            <div style={styles.propertyTitle}>Text Properties</div>
                            <div style={styles.property}>
                                <label style={styles.propertyLabel}>Font Family</label>
                                <select
                                    style={styles.propertyInput}
                                    value={(activeObject as any).fontFamily || 'Arial'}
                                    onChange={(e) => handlePropertyChange('fontFamily', e.target.value)}
                                >
                                    <option value="Arial">Arial</option>
                                    <option value="Helvetica">Helvetica</option>
                                    <option value="Times New Roman">Times New Roman</option>
                                    <option value="Courier New">Courier New</option>
                                    <option value="Georgia">Georgia</option>
                                    <option value="Verdana">Verdana</option>
                                </select>
                            </div>
                            <div style={styles.property}>
                                <label style={styles.propertyLabel}>Font Size</label>
                                <input
                                    type="number"
                                    style={styles.propertyInput}
                                    value={(activeObject as any).fontSize || 20}
                                    onChange={(e) => handlePropertyChange('fontSize', parseInt(e.target.value))}
                                />
                            </div>
                            <div style={styles.property}>
                                <label style={styles.propertyLabel}>Font Weight</label>
                                <select
                                    style={styles.propertyInput}
                                    value={(activeObject as any).fontWeight || 'normal'}
                                    onChange={(e) => handlePropertyChange('fontWeight', e.target.value)}
                                >
                                    <option value="normal">Normal</option>
                                    <option value="bold">Bold</option>
                                </select>
                            </div>
                            <div style={styles.property}>
                                <label style={styles.propertyLabel}>Text Align</label>
                                <select
                                    style={styles.propertyInput}
                                    value={(activeObject as any).textAlign || 'left'}
                                    onChange={(e) => handlePropertyChange('textAlign', e.target.value)}
                                >
                                    <option value="left">Left</option>
                                    <option value="center">Center</option>
                                    <option value="right">Right</option>
                                </select>
                            </div>
                        </div>
                    )}
                </>
            )}

            {!activeObject && (
                <div style={{ color: '#999', textAlign: 'center', marginTop: '20px' }}>
                    Select an object to edit its properties
                </div>
            )}
        </div>
    );
};
