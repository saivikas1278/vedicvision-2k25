import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import DarkThemeBackground from '../components/Theme/DarkThemeBackground';
import ThemeToggle from '../components/Theme/ThemeToggle';
import Card from '../components/UI/Card';
import GradientButton from '../components/UI/GradientButton';
import { 
  FaPalette, 
  FaMoon, 
  FaSun, 
  FaDesktop,
  FaStar,
  FaHeart,
  FaBolt,
  FaGem,
  FaRocket,
  FaMagic
} from 'react-icons/fa';

const ThemeShowcase = () => {
  const { isDark, getCurrentPalette, availablePalettes, changeColorPalette } = useTheme();
  const palette = getCurrentPalette();
  const [selectedDemo, setSelectedDemo] = useState('cards');

  const demoComponents = {
    cards: {
      title: 'Card Variants',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card variant="default" className="p-6">
            <h3 className="text-lg font-semibold mb-2 text-primary">Default Card</h3>
            <p className="text-secondary">This is a default card with standard styling.</p>
          </Card>
          
          <Card variant="glass" className="p-6">
            <h3 className="text-lg font-semibold mb-2 text-primary">Glass Card</h3>
            <p className="text-secondary">This card uses glass morphism effects.</p>
          </Card>
          
          <Card variant="gradient" className="p-6">
            <h3 className="text-lg font-semibold mb-2">Gradient Card</h3>
            <p className="text-white/80">This card uses the current theme gradient.</p>
          </Card>
          
          <Card variant="glow" className="p-6">
            <h3 className="text-lg font-semibold mb-2 text-primary">Glow Card</h3>
            <p className="text-secondary">This card has a subtle glow effect.</p>
          </Card>
          
          <Card variant="solid" className="p-6">
            <h3 className="text-lg font-semibold mb-2 text-primary">Solid Card</h3>
            <p className="text-secondary">This is a solid card without transparency.</p>
          </Card>
          
          <Card className="p-6 interactive">
            <h3 className="text-lg font-semibold mb-2 text-primary">Interactive Card</h3>
            <p className="text-secondary">This card responds to hover interactions.</p>
          </Card>
        </div>
      )
    },
    buttons: {
      title: 'Button Variants',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-primary">Primary Buttons</h4>
            <GradientButton variant="primary" size="sm">Small Button</GradientButton>
            <GradientButton variant="primary" size="md">Medium Button</GradientButton>
            <GradientButton variant="primary" size="lg">Large Button</GradientButton>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-primary">Secondary Buttons</h4>
            <GradientButton variant="secondary" size="md">Secondary</GradientButton>
            <GradientButton variant="success" size="md">Success</GradientButton>
            <GradientButton variant="danger" size="md">Danger</GradientButton>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-primary">Special Buttons</h4>
            <GradientButton variant="glass" size="md">Glass Button</GradientButton>
            <GradientButton variant="outline" size="md">Outline Button</GradientButton>
            <GradientButton variant="primary" size="md" animated={false}>No Animation</GradientButton>
          </div>
        </div>
      )
    },
    animations: {
      title: 'Animations',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6 animate-fade-in">
            <FaStar className="text-2xl text-yellow-500 mb-3 animate-spin-slow" />
            <h3 className="font-semibold mb-2 text-primary">Fade In</h3>
            <p className="text-secondary">This card fades in on load.</p>
          </Card>
          
          <Card className="p-6 animate-slide-up">
            <FaHeart className="text-2xl text-red-500 mb-3 animate-heartbeat" />
            <h3 className="font-semibold mb-2 text-primary">Slide Up</h3>
            <p className="text-secondary">This card slides up from bottom.</p>
          </Card>
          
          <Card className="p-6 animate-zoom-in">
            <FaBolt className="text-2xl text-yellow-500 mb-3 animate-bounce" />
            <h3 className="font-semibold mb-2 text-primary">Zoom In</h3>
            <p className="text-secondary">This card zooms in on load.</p>
          </Card>
          
          <Card className="p-6 animate-float">
            <FaGem className="text-2xl text-blue-500 mb-3 animate-wiggle" />
            <h3 className="font-semibold mb-2 text-primary">Float</h3>
            <p className="text-secondary">This card floats continuously.</p>
          </Card>
          
          <Card className="p-6 animate-glow">
            <FaRocket className="text-2xl text-purple-500 mb-3 animate-rubber-band" />
            <h3 className="font-semibold mb-2 text-primary">Glow</h3>
            <p className="text-secondary">This card has a pulsing glow.</p>
          </Card>
          
          <Card className="p-6 hover-scale">
            <FaMagic className="text-2xl text-pink-500 mb-3 animate-jello" />
            <h3 className="font-semibold mb-2 text-primary">Hover Scale</h3>
            <p className="text-secondary">This card scales on hover.</p>
          </Card>
        </div>
      )
    },
    typography: {
      title: 'Typography & Colors',
      content: (
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold mb-4 gradient-text">Gradient Text</h2>
            <h3 className="text-2xl font-bold mb-4 text-primary">Primary Text</h3>
            <p className="text-lg mb-4 text-secondary">Secondary text with good contrast</p>
            <p className="text-base mb-4 text-tertiary">Tertiary text for subtle information</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-primary">Text Utilities</h4>
              <p className="text-shadow">Text with shadow</p>
              <p className="text-shadow-lg">Text with large shadow</p>
              <p className="animate-text-shimmer">Shimmering text effect</p>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-primary">Color Swatches</h4>
              <div className="flex gap-2">
                <div 
                  className="w-8 h-8 rounded-full border-2 border-white"
                  style={{ backgroundColor: palette.primary }}
                  title="Primary"
                />
                <div 
                  className="w-8 h-8 rounded-full border-2 border-white"
                  style={{ backgroundColor: palette.secondary }}
                  title="Secondary"
                />
                <div 
                  className="w-8 h-8 rounded-full border-2 border-white"
                  style={{ backgroundColor: palette.accent }}
                  title="Accent"
                />
              </div>
            </div>
          </div>
        </div>
      )
    }
  };

  return (
    <DarkThemeBackground>
      <div className="min-h-screen py-8">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold gradient-text mb-2">Theme Showcase</h1>
              <p className="text-secondary">Explore all the theme features and components</p>
            </div>
            <ThemeToggle showSettings={true} />
          </div>

          {/* Color Palette Selector */}
          <Card className="p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-primary flex items-center gap-2">
              <FaPalette className="text-2xl" />
              Color Palettes
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {Object.entries(availablePalettes).map(([key, palette]) => (
                <button
                  key={key}
                  onClick={() => changeColorPalette(key)}
                  className="p-3 rounded-lg border border-primary bg-primary hover:bg-secondary transition-all group"
                >
                  <div className="flex gap-1 mb-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: palette.primary }}
                    />
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: palette.secondary }}
                    />
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: palette.accent }}
                    />
                  </div>
                  <p className="text-xs font-medium text-primary group-hover:text-secondary">
                    {palette.name}
                  </p>
                </button>
              ))}
            </div>
          </Card>

          {/* Demo Navigation */}
          <Card className="p-4 mb-8">
            <div className="flex flex-wrap gap-2">
              {Object.entries(demoComponents).map(([key, demo]) => (
                <button
                  key={key}
                  onClick={() => setSelectedDemo(key)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    selectedDemo === key
                      ? 'bg-secondary text-primary border border-primary'
                      : 'bg-primary text-secondary hover:bg-secondary border border-primary'
                  }`}
                >
                  {demo.title}
                </button>
              ))}
            </div>
          </Card>

          {/* Demo Content */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-primary">
              {demoComponents[selectedDemo].title}
            </h2>
            {demoComponents[selectedDemo].content}
          </Card>

          {/* Theme Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Card variant="gradient" className="p-6 text-center">
              <div className="text-3xl font-bold mb-2">8</div>
              <div className="text-white/80">Color Palettes</div>
            </Card>
            
            <Card variant="gradient" className="p-6 text-center">
              <div className="text-3xl font-bold mb-2">15+</div>
              <div className="text-white/80">Animations</div>
            </Card>
            
            <Card variant="gradient" className="p-6 text-center">
              <div className="text-3xl font-bold mb-2">∞</div>
              <div className="text-white/80">Possibilities</div>
            </Card>
          </div>
        </div>
      </div>
    </DarkThemeBackground>
  );
};

export default ThemeShowcase;
