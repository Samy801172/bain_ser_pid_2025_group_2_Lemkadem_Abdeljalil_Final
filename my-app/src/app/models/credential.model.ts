export interface Credential {
  credential_id: string;
  username: string;
  password?: string;
  mail: string;
  facebookHash?: string;
  googleHash?: string;
  isAdmin: boolean;
  active: boolean;
  created: Date;
  updated: Date;
  googleId?: string;
  googleEmail?: string;
  isGoogleAccount: boolean;
} 