import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { Credential } from '../../models/credential.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-callback',
  template: '<div>Authentification en cours...</div>',
  standalone: true,
  imports: [CommonModule]
})
export class AuthCallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      const refreshToken = params['refreshToken'];
      
      if (token && refreshToken) {
        const isAdmin = params['email'] === 'abdel@hotmail.be';
        const clientId = params['clientId'];
        
        this.authService.saveAuthData({
          token,
          refreshToken,
          credential: {
            credential_id: params['credentialId'],
            username: params['email'],
            mail: params['email'],
            isAdmin: isAdmin,
            googleId: params['googleId'],
            googleEmail: params['email'],
            isGoogleAccount: true
          },
          clientId: !isAdmin ? parseInt(clientId) : undefined
        });
        
        if (!isAdmin) {
          localStorage.setItem('clientId', clientId);
          localStorage.setItem('isClient', 'true');
        }
        
        const userRole = isAdmin ? 'admin' : 'client';
        this.router.navigate([`/${userRole}/products`]);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
} 