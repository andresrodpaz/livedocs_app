import React, { useState } from 'react';
import styles from './ColorPicker.module.css';

const colors: string[] = [
  '#000000', '#7F7F7F', '#FFFFFF', '#FF0000', '#FF9900', '#FFFF00', '#00FF00', 
  '#00FFFF', '#0000FF', '#9900FF', '#FF00FF', '#FF6666', '#FFCC99', '#FFFF99',
  '#99FF99', '#99FFFF', '#9999FF', '#CC99FF', '#FF99FF', '#CC6666', '#FFCC66',
  '#FFFF66', '#66FF66', '#66FFFF', '#6666FF', '#9966FF', '#FF66FF', '#B22222',
  '#8B4513', '#FFD700', '#2E8B57', '#4682B4', '#4169E1', '#8A2BE2', '#D2691E',
  '#CD5C5C', '#FF6347', '#FF4500', '#FFD700', '#32CD32', '#00FA9A', '#87CEFA',
  '#4682B4', '#DA70D6', '#EE82EE', '#FF00FF', '#9932CC'
];

interface ColorPickerProps {
  onColorSelect: (color: string) => void;
}

function ColorPicker({ onColorSelect }: ColorPickerProps) {
  const [selectedColor, setSelectedColor] = useState<string>('#000000');
  const [customColor, setCustomColor] = useState<string>('#000000');

  const handleColorClick = (color: string) => {
    setSelectedColor(color);
    onColorSelect(color);
  };

  const handleCustomColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const color = event.target.value;
    setCustomColor(color);
    handleColorClick(color);
  };

  return (
    <div className={styles.colorPalette}>
      {colors.map((color) => (
        <div
          key={color}
          className={`${styles.colorSwatch} ${color === selectedColor ? styles.selected : ''}`}
          style={{ backgroundColor: color }}
          onClick={() => handleColorClick(color)}
        />
      ))}
      <div className={styles.customColor}>
        <span>PERSONALIZADO</span>
        <input
          type="color"
          value={customColor}
          onChange={handleCustomColorChange}
        />
      </div>
    </div>
  );
}

export default ColorPicker;
