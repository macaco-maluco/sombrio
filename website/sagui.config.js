const webpack = require('webpack')

/**
 * Sagui configuration object
 * see: http://sagui.js.org/
 */
module.exports = {
  pages: ['index'],
  style: {
    cssModules: false,
  },
  additionalWebpackConfig: {
    plugins: [
      new webpack.DefinePlugin({
        'process.env.MAC_DOWNLOAD_URL': JSON.stringify(process.env.MAC_DOWNLOAD_URL),
        'process.env.WINDOWS_DOWNLOAD_URL': JSON.stringify(process.env.WINDOWS_DOWNLOAD_URL),
        'process.env.LINUX_DOWNLOAD_URL': JSON.stringify(process.env.LINUX_DOWNLOAD_URL),
      }),
    ],
  },
}
