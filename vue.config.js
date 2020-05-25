const path = require('path')

module.exports = {
  outputDir: path.resolve(__dirname, './docs'),
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
