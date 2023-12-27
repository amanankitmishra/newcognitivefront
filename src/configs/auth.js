



export default {
  meEndpoint: 'http://localhost:5000/users/me',
  loginEndpoint: 'http://localhost:5000/users/login',
  registerEndpoint: 'http://localhost:5000/users',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
