module.exports = ctx => ({
  parser: 'postcss-scss',
  plugins: {
    'postcss-simple-vars': {},
    precss: {},
    'postcss-nested-props': {},
    'postcss-nested': {
      preserveEmpty: true
    },
    'postcss-utilities': {
      centerMethod: 'flexbox',
      textHideMethod: 'font'
    },
    'postcss-cssnext': {
      flexbox: true,
      browsers: ['last 10 versions', 'ie>=8', '>1% in CN']
    }
  }
})
