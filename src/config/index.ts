export const jwtConfig = {
  secret: new TextEncoder().encode(process.env.JWT_SECRET),
}
export const config = {
  api_url: process.env.API_URL
}