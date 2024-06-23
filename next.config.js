const withPWA = require('next-pwa')({
  dest: 'public',
})
module.exports = {
  env: {
    API_URL: "http://talabekhar-api.test",
    APP_URL: "http://localhost:3000"
  }
}
// module.exports = withPWA({
//   // next.js config
// })