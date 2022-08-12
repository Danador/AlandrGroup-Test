const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{htm,md,njk}'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1560px',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'radial-1': 'radial-gradient(50% 50% at 50% 50%, rgba(180, 197, 194, 0.83) 0%, rgba(224, 225, 225, 0) 100%);',
        'radial-2': 'radial-gradient(50% 50% at 50% 50%, rgba(255, 238, 206, 0.49) 0%, rgba(196, 196, 196, 0) 100%);'
      },
      fontFamily: {
        first: ['Raleway', ...defaultTheme.fontFamily.sans],
        second: ['CormorantInfant'],
      },
      letterSpacing: {
      },
      fontWeight: {
      },
      fontSize: {
      },
      borderRadius: {
      },
      backgroundSize: {
      },
      maxWidth: {
        '1/2': '50%',
      },
      colors: {
        inherit: 'inherit',
        'sandy-beach': '#FFEDCD',
        'zanah': '#E2F0DF',
        'juniper': '#70908B',
        'silver': '#C4C4C4',
        'jet-stream': '#B0D3CE',
        'green-pea': '#195557',
        'porcelain': '#EAEEEF',
        'submarine': '#B4C5C2',
        'iron': '#E0E1E1',
        'tiara': "#C2CCCA",
        'conch': '#CFD7D3',
        'rose-white': '#FFFEFE'
      },
    boxShadow: {
      card: "4px 4px 20px 0px ",
      },
      gridTemplateAreas: {
        'layout': [
          'header',
          'main',
          'footer',
        ],
      },
      gridTemplateRows: {
        'aa1': 'repeat(2, auto) 1fr',
        'a1': 'auto 1fr',
        '1a': '1fr auto',
        '1a1': '1fr auto 1fr',
        'a11': 'auto 1fr 1fr',
        '11a': '1fr 1fr auto',
        'a1a': 'auto 1fr auto',
        '1aa': '1fr repeat(2, auto)',
        'a1aa': 'auto 1fr repeat(2, auto)',
        'full': '100%',
      },
      gridTemplateColumns: {
        'aa1': 'repeat(2, auto) 1fr',
        'a1': 'auto 1fr',
        '1a': '1fr auto',
        '1a1': '1fr auto 1fr',
        'a11': 'auto 1fr 1fr',
        '11a': '1fr 1fr auto',
        'a1a': 'auto 1fr auto',
        '1aa': '1fr repeat(2, auto)',
        'a1aa': 'auto 1fr repeat(2, auto)',
        'full': '100%',
      },
	},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@savvywombat/tailwindcss-grid-areas')
  ],
}
