export class SigninPayload {

  username: string;
  password: string;
  facebookHash?: string; // Optionnel pour les connexions sociales
  googleHash?: string;   // Optionnel pour les connexions sociales
  constructor() {
    this.username = '';
    this.password = '';
    this.facebookHash = '';
    this.googleHash = '';
  }
}
