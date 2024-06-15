const withPWA = require('next-pwa')({
  dest: 'public',
})
module.exports = {
  env: {
    API_URL: "http://talabekhar-api.test",
  }
}
// module.exports = withPWA({
//   // next.js config
// })