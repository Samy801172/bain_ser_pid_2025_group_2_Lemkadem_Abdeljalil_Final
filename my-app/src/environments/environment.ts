// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:2024/api',
  paypalClientId: 'AYu0FhU6VKkIsk_x3DYp3ZDBn57Z0JnrYQJShGFcg3DRIquZzZIv0kBEiHw1dNKx2-enGPHWzyfUEtwM',
  paypalMode: 'sandbox',
  endpoints: {
    products: '/products',
    stock: '/stock',
    payments: '/payments',
    orders: '/orders',
    auth: '/auth',
    users: '/users',
    promotions:'/promotions'
  },
  googleAuth: {
     clientId: '674613815931-sm4bdrsf50rr7ph2dsv7qcvn16if8qqs.apps.googleusercontent.com',
    redirectUri: 'http://localhost:2024/api/auth/google/callback'
  }
};
