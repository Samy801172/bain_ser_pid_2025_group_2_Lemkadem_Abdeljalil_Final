// Ajouter dans environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://votre-api-production.com/api',  // À adapter selon votre backend
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
    redirectUri: 'https://samy801172.github.io/bain_ser_pid_2025_group_2_Lemkadem_Abdeljalil_Final/auth/google/callback'
  },
  baseHref: '/bain_ser_pid_2025_group_2_Lemkadem_Abdeljalil_Final/'
};
