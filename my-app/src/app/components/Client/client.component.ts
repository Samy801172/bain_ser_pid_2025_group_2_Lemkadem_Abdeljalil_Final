import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule, NgIf} from '@angular/common';
import {CommandModule} from '@angular/cli/src/command-builder/command-module';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,

  ],

})
export class ClientComponent {
  signupForm: FormGroup;
  loginForm: FormGroup;
  successMessage: string = '';  // Déclaration de la variable

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSignup() {
    if (this.signupForm.valid) {
      const clientData = this.signupForm.value;
      // Envoyez clientData à votre service pour l'inscription
      console.log('Inscription réussie', clientData);
      this.successMessage = 'Inscription réussie !';  // Mise à jour du message
      this.signupForm.reset();  // Optionnel : réinitialiser le formulaire
    }
  }

  onLogin() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      // Envoyez loginData à votre service pour la connexion
      console.log('Connexion réussie', loginData);
      this.successMessage = 'Connexion réussie !';  // Mise à jour du message
      this.loginForm.reset();  // Optionnel : réinitialiser le formulaire
    }
  }
}
