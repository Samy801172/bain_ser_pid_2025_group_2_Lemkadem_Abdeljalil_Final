// src/app/models/create-user.dto.ts
export interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean;
}
