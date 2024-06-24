export const oktaConfig = {
    clientId: '0oahc68amwd1hExnA5d7',
    issuer: 'https://dev-57308811.okta.com/oauth2/default',
    redirectUri: 'http://localhost:3000/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: true
}