import {User} from '../user/user.model';

export interface LoginResponse {
  token: string;
  user: User;
}

