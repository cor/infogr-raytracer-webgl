module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.vert$|\.frag$/i,
          use: 'raw-loader'
        }
      ]
    }
  }
}
