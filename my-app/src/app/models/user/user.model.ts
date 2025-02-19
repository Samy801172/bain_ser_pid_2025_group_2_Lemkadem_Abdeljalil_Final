// models/user/user.model.ts
export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: 'ADMIN' | 'CLIENT';
  // autres propriétés nécessaires
}
