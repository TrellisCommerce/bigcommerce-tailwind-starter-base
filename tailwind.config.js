module.exports = {
  prefix: 'twcss-',
  content: [
    './templates/components/**/**/*.html',
    './templates/layout/*.html',
    './templates/pages/**/**/*.html',
  ],
  theme: {
    screens: {
      sm: '320px',
      md: '768px',
      lg: '1024px',
      xlg: '1440px',
      x2lg: '1920px',
      pageMaxWidth: '1440px',
    },
    extend: {},
  },
  plugins: [],
  experimental: {
    optimizeUniversalDefaults: true,
  },
};
