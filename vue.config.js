module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
  ? '/my-app/'
  : '/' ,
  transpileDependencies: [
    'vuetify'
  ]

}
