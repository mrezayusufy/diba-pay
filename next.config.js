const withPWA = require('next-pwa')({
  dest: 'public',
})
module.exports = {
  env: {
    API_URL: process.env.API_URL,
    APP_URL: process.env.APP_URL
  },
  basePath: "",
  assetPrefix: process.env.APP_URL ? process.env.APP_URL : undefined,
}