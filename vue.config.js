module.exports = {
  devServer: {

    proxy: {
      '^/api': {
        target: 'http://localhost:5133',
        changeOrigin: true,
        pathRewrite: {'^/api' : '/'}

      }
    }
  }
}
