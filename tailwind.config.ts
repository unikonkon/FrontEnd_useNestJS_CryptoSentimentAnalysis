import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // PICO-8 Color Palette (16 colors)
        p8: {
          0: "#000000", // Black
          1: "#1d2b53", // Dark Blue
          2: "#7e2553", // Dark Purple
          3: "#008751", // Dark Green
          4: "#ab5236", // Brown
          5: "#5f574f", // Dark Grey
          6: "#c2c3c7", // Light Grey
          7: "#fff1e8", // White
          8: "#ff004d", // Red
          9: "#ffa300", // Orange
          10: "#ffec27", // Yellow
          11: "#00e436", // Green
          12: "#29adff", // Blue
          13: "#83769c", // Indigo
          14: "#ff77a8", // Pink
          15: "#ffccaa", // Peach
        },
        // Semantic color mapping using PICO-8 palette
        primary: "#29adff",      // p8-12 Blue
        secondary: "#ff77a8",    // p8-14 Pink
        accent: "#ffec27",       // p8-10 Yellow
        success: "#00e436",      // p8-11 Green
        warning: "#ffa300",      // p8-9 Orange
        error: "#ff004d",        // p8-8 Red
        info: "#83769c",         // p8-13 Indigo
        
        // Background variations
        background: {
          DEFAULT: "#000000",     // p8-0 Black
          dark: "#1d2b53",       // p8-1 Dark Blue
          panel: "#5f574f",      // p8-5 Dark Grey
        },
        
        // Text variations
        foreground: {
          DEFAULT: "#fff1e8",     // p8-7 White
          muted: "#c2c3c7",      // p8-6 Light Grey
          accent: "#ffec27",     // p8-10 Yellow
        },
        
        // Border variations
        border: {
          DEFAULT: "#c2c3c7",     // p8-6 Light Grey
          dark: "#5f574f",       // p8-5 Dark Grey
          accent: "#29adff",     // p8-12 Blue
        }
      },
      fontFamily: {
        'pixel-title': ['"Press Start 2P"', 'monospace'],
        'pixel-body': ['VT323', 'monospace'],
        'sans': ['VT323', 'monospace'], // Override default sans
      },
      fontSize: {
        'pixel-xs': ['10px', { lineHeight: '12px' }],
        'pixel-sm': ['12px', { lineHeight: '16px' }],
        'pixel-base': ['16px', { lineHeight: '20px' }],
        'pixel-lg': ['20px', { lineHeight: '24px' }],
        'pixel-xl': ['24px', { lineHeight: '28px' }],
        'pixel-2xl': ['32px', { lineHeight: '36px' }],
        'pixel-3xl': ['48px', { lineHeight: '52px' }],
      },
      spacing: {
        'pixel': '8px',
        'pixel-2': '16px',
        'pixel-3': '24px',
        'pixel-4': '32px',
      },
      borderRadius: {
        'pixel': '0px',           // Sharp corners for 8-bit feel
        'pixel-sm': '2px',        // Minimal rounding
        'pixel-md': '4px',        // Small rounding
      },
      boxShadow: {
        'pixel': '4px 4px 0px 0px rgba(0,0,0,0.8)',
        'pixel-lg': '8px 8px 0px 0px rgba(0,0,0,0.8)',
        'pixel-colored': '4px 4px 0px 0px #1d2b53',
        'pixel-accent': '4px 4px 0px 0px #29adff',
      },
      animation: {
        'pixel-blink': 'pixelBlink 1s step-end infinite',
        'pixel-bounce': 'pixelBounce 2s ease-in-out infinite',
        'scanlines': 'scanlines 0.1s linear infinite',
        'pixel-pulse': 'pixelPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        pixelBlink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
        pixelBounce: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        scanlines: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 4px' },
        },
        pixelPulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
      backgroundImage: {
        'scanlines': 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
        'pixel-grid': 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.1) 1px, rgba(255,255,255,0.1) 2px), repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(255,255,255,0.1) 1px, rgba(255,255,255,0.1) 2px)',
      },
    },
  },
  plugins: [
    function({ addUtilities, addComponents, theme }: any) {
      // Custom utilities
      addUtilities({
        '.pixelated': {
          'image-rendering': 'pixelated',
        },
        '.crt': {
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '0',
            left: '0',
            bottom: '0',
            right: '0',
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
            'pointer-events': 'none',
            'z-index': '1',
          }
        },
        '.pixel-corners': {
          '--pc': '8px',
          'clip-path': `polygon(
            0 var(--pc),
            var(--pc) 0,
            calc(100% - var(--pc)) 0,
            100% var(--pc),
            100% calc(100% - var(--pc)),
            calc(100% - var(--pc)) 100%,
            var(--pc) 100%,
            0 calc(100% - var(--pc))
          )`,
        },
      });

      // Custom components
      addComponents({
        '.btn-pixel': {
          padding: '12px 24px',
          backgroundColor: theme('colors.p8.12'),
          color: theme('colors.p8.7'),
          border: `2px solid ${theme('colors.p8.6')}`,
          borderRadius: '0px',
          fontFamily: theme('fontFamily.pixel-title'),
          fontSize: '12px',
          textTransform: 'uppercase',
          cursor: 'pointer',
          transition: 'all 0.1s ease',
          boxShadow: '4px 4px 0px 0px rgba(0,0,0,0.8)',
          '&:hover': {
            backgroundColor: theme('colors.p8.10'),
            color: theme('colors.p8.0'),
            transform: 'translate(-2px, -2px)',
            boxShadow: '6px 6px 0px 0px rgba(0,0,0,0.8)',
          },
          '&:active': {
            transform: 'translate(2px, 2px)',
            boxShadow: '2px 2px 0px 0px rgba(0,0,0,0.8)',
          },
          '&:disabled': {
            backgroundColor: theme('colors.p8.5'),
            color: theme('colors.p8.6'),
            cursor: 'not-allowed',
            transform: 'none',
            boxShadow: '2px 2px 0px 0px rgba(0,0,0,0.4)',
          }
        },
        '.btn-pixel-secondary': {
          backgroundColor: theme('colors.p8.14'),
          '&:hover': {
            backgroundColor: theme('colors.p8.15'),
          }
        },
        '.btn-pixel-danger': {
          backgroundColor: theme('colors.p8.8'),
          '&:hover': {
            backgroundColor: theme('colors.p8.9'),
          }
        },
        '.btn-pixel-success': {
          backgroundColor: theme('colors.p8.11'),
          '&:hover': {
            backgroundColor: theme('colors.p8.3'),
          }
        },
        '.card-pixel': {
          backgroundColor: theme('colors.p8.1'),
          border: `3px solid ${theme('colors.p8.6')}`,
          borderRadius: '0px',
          padding: '20px',
          boxShadow: '6px 6px 0px 0px rgba(0,0,0,0.8)',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 4px)',
            'pointer-events': 'none',
          }
        },
        '.panel-pixel': {
          backgroundColor: theme('colors.p8.5'),
          border: `2px solid ${theme('colors.p8.6')}`,
          borderRadius: '0px',
          padding: '16px',
          boxShadow: 'inset 2px 2px 0px 0px rgba(0,0,0,0.5)',
        },
        '.input-pixel': {
          backgroundColor: theme('colors.p8.0'),
          border: `2px solid ${theme('colors.p8.6')}`,
          borderRadius: '0px',
          padding: '8px 12px',
          color: theme('colors.p8.7'),
          fontFamily: theme('fontFamily.pixel-body'),
          fontSize: '16px',
          boxShadow: 'inset 2px 2px 0px 0px rgba(0,0,0,0.5)',
          '&:focus': {
            outline: 'none',
            borderColor: theme('colors.p8.12'),
            boxShadow: `inset 2px 2px 0px 0px rgba(0,0,0,0.5), 0 0 0 2px ${theme('colors.p8.12')}`,
          }
        },
        '.badge-pixel': {
          backgroundColor: theme('colors.p8.12'),
          color: theme('colors.p8.7'),
          padding: '4px 8px',
          fontSize: '10px',
          fontFamily: theme('fontFamily.pixel-title'),
          textTransform: 'uppercase',
          border: `1px solid ${theme('colors.p8.6')}`,
          borderRadius: '0px',
        },
        '.progress-pixel': {
          backgroundColor: theme('colors.p8.5'),
          border: `2px solid ${theme('colors.p8.6')}`,
          borderRadius: '0px',
          height: '16px',
          overflow: 'hidden',
          '& .progress-bar': {
            backgroundColor: theme('colors.p8.11'),
            height: '100%',
            transition: 'width 0.3s ease',
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.2) 2px, rgba(255,255,255,0.2) 4px)',
          }
        }
      });
    }
  ],
};

export default config;
