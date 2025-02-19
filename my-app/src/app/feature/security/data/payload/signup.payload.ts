export class SignupPayload {
  username: string;
  password: string;
  email: string;
  facebookHash?: string; // Optionnel
  googleHash?: string;    // Optionnel

  constructor() {
    this.username = '';
    this.password = '';
    this.email = '';
    this.facebookHash = '';
    this.googleHash = '';
  }
}

export class SigninPayload {
}
