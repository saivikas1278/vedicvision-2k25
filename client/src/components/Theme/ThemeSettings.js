import React, { useState } from 'react';
import { useTheme, COLOR_PALETTES } from '../../contexts/ThemeContext';
import { 
  FaSun, 
  FaMoon, 
  FaPalette, 
  FaTimes, 
  FaCheck,
  FaDesktop
} from 'react-icons/fa';

const ThemeSettings = ({ isOpen, onClose }) => {
  const { 
    theme, 
    colorPalette, 
    toggleTheme, 
    setThemeMode, 
    changeColorPalette, 
    getCurrentPalette 
  } = useTheme();

  const [selectedPalette, setSelectedPalette] = useState(colorPalette);

  const handlePaletteChange = (paletteKey) => {
    setSelectedPalette(paletteKey);
    changeColorPalette(paletteKey);
  };

  const handleThemeChange = (newTheme) => {
    setThemeMode(newTheme);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-primary border border-primary shadow-dark-xl transition-all">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-primary">
            <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
              <FaPalette className="text-xl" />
              Theme Settings
            </h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-secondary rounded-lg transition-colors text-secondary hover:text-primary"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Theme Mode Selection */}
            <div>
              <h4 className="text-sm font-medium text-primary mb-3">Theme Mode</h4>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleThemeChange('light')}
                  className={`p-3 rounded-lg border transition-all flex flex-col items-center gap-2 ${
                    theme === 'light'
                      ? 'border-primary bg-secondary text-primary'
                      : 'border-primary bg-primary text-secondary hover:bg-secondary'
                  }`}
                >
                  <FaSun className="w-5 h-5" />
                  <span className="text-xs">Light</span>
                </button>
                
                <button
                  onClick={() => handleThemeChange('dark')}
                  className={`p-3 rounded-lg border transition-all flex flex-col items-center gap-2 ${
                    theme === 'dark'
                      ? 'border-primary bg-secondary text-primary'
                      : 'border-primary bg-primary text-secondary hover:bg-secondary'
                  }`}
                >
                  <FaMoon className="w-5 h-5" />
                  <span className="text-xs">Dark</span>
                </button>
                
                <button
                  onClick={() => handleThemeChange('system')}
                  className={`p-3 rounded-lg border transition-all flex flex-col items-center gap-2 ${
                    theme === 'system'
                      ? 'border-primary bg-secondary text-primary'
                      : 'border-primary bg-primary text-secondary hover:bg-secondary'
                  }`}
                >
                  <FaDesktop className="w-5 h-5" />
                  <span className="text-xs">Auto</span>
                </button>
              </div>
            </div>

            {/* Color Palette Selection */}
            <div>
              <h4 className="text-sm font-medium text-primary mb-3">Color Palette</h4>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(COLOR_PALETTES).map(([key, palette]) => (
                  <button
                    key={key}
                    onClick={() => handlePaletteChange(key)}
                    className={`p-4 rounded-lg border transition-all relative ${
                      selectedPalette === key
                        ? 'border-primary bg-secondary'
                        : 'border-primary bg-primary hover:bg-secondary'
                    }`}
                  >
                    {/* Color Preview */}
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex gap-1">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: palette.primary }}
                        />
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: palette.secondary }}
                        />
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: palette.accent }}
                        />
                      </div>
                      {selectedPalette === key && (
                        <FaCheck className="w-4 h-4 text-green-500 ml-auto" />
                      )}
                    </div>
                    
                    {/* Palette Name */}
                    <div className="text-left">
                      <p className="text-sm font-medium text-primary">{palette.name}</p>
                      <div 
                        className="h-2 rounded-full mt-2"
                        style={{ 
                          background: `linear-gradient(135deg, ${palette.primary}, ${palette.accent})`
                        }}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Preview Section */}
            <div>
              <h4 className="text-sm font-medium text-primary mb-3">Preview</h4>
              <div className="p-4 rounded-lg border border-primary bg-secondary">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-primary">Sample Card</span>
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getCurrentPalette().primary }}
                    />
                  </div>
                  <div className="h-2 bg-tertiary rounded-full overflow-hidden">
                    <div 
                      className="h-full w-3/4 rounded-full"
                      style={{ 
                        background: `linear-gradient(135deg, ${getCurrentPalette().primary}, ${getCurrentPalette().accent})`
                      }}
                    />
                  </div>
                  <div className="flex gap-2">
                    <button 
                      className="btn-primary px-3 py-1 text-xs rounded"
                      style={{ 
                        background: getCurrentPalette().primary,
                        color: 'white',
                        border: 'none'
                      }}
                    >
                      Primary
                    </button>
                    <button className="btn-secondary px-3 py-1 text-xs rounded">
                      Secondary
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-primary">
            <button
              onClick={onClose}
              className="btn-primary w-full"
              style={{ 
                background: getCurrentPalette().primary,
                color: 'white',
                border: 'none'
              }}
            >
              Apply Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSettings;
