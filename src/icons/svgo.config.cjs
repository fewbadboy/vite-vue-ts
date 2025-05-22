module.exports = {
  plugins: [
    {
      name: 'removeComments',
      active: true,
    },
    {
      name: 'removeAttrs',
      params: {
        attrs: '(fill|stroke)',
      },
    },
  ]
}