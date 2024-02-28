export default {
  // meEndpoint: 'http://localhost:5000/users/me',
  // loginEndpoint: 'http://localhost:5000/users/login',
  // registerEndpoint: 'http://localhost:5000/users',

  meEndpoint: 'https://sea-lion-app-p56d8.ondigitalocean.app/users/me',
  loginEndpoint: 'https://sea-lion-app-p56d8.ondigitalocean.app/users/login',
  registerEndpoint: 'https://sea-lion-app-p56d8.ondigitalocean.app/users',

  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
