const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{htm,md,njk}'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      fontFamily: {
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
        inherit: 'inherit'
      },
    boxShadow: {
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
