/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  important: true,
  theme: {
    extend: {
      fontFamily: {
        geist: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
        bebas: ['"Bebas Neue"', 'sans-serif'],
      },
      fontSize: {
        // Extended default scale
        '7xl': '4.5rem',     // 72px (Tailwind default)
        '8xl': '6rem',       // 96px
        '9xl': '8rem',       // 128px
        // Massive display sizes
        '10xl': ['10rem', '0.85'],    // 160px
        '11xl': ['12rem', '0.8'],     // 192px
        '12xl': ['14rem', '0.75'],    // 224px
        // Fluid typography
        'fluid-hero': ['clamp(4rem, 12vw, 12rem)', '0.85'],
        'fluid-giant': ['clamp(5rem, 15vw, 15rem)', '0.8'],
      },
      // Your existing color palette (completely preserved)
      colors: {
        greens: {
          tropicalrainforest: '#16806d',
          caribbeangreen: '#1cd2a2',
          shamrock: '#45cea2',
        },
        blues: {
          pacificblue: '#1ca9cb',
          bluegreen: '#0095b7',
          cerulean: '#1cacd7',
          aqua: '#00ffff',
        },
        pinks: {
          shockingpink: '#fa7cfc',
          razzledazzlerose: '#fe46d0',
          wildstrawberry: '#ff42a5',
          cottoncandy: '#febcd8',
          wildwatermelon: '#ff42a5',
          jazzberryjam: '#a50a5f',
        },
        reds: {
          razzmatazz: '#e3246a',
          radicalred: '#fe496a',
          bittersweet: '#ff7a6f',
          sunsetorange: '#fd5e52',
        },
        oranges: {
          mangotango: '#fe8344',
          atomictangerine: '#ffa577',
          macaroniandcheese: '#ffbd89',
          peach: '#ffcba4',
        },
        neutrals: {
          outerspace: '#424b4c',
          white: '#ffffff',
          black: '#2d2d2c',
          trueblack: '#000000',
        },
        accents: {
          canary: '#fffe9e',
        },
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
        '160': '40rem', // Additional large spacing
      },
      lineHeight: {
        'tight': '1.1',
        'snug': '1.15',
        'tightest': '0.75',
        'huge': '0.85',
        'massive': '0.8',
      },
      letterSpacing: {
        'tighter': '-0.05em',
        'super-tight': '-0.075em',
        'bebas-tight': '-0.02em',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};