import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="admin-layout">
      <nav class="sidebar">
        <div class="logo">
          <h1>GOHAN-MED Admin</h1>
          <p>Espace Admin</p>
        </div>
        <ul class="nav-links">
          <li><a routerLink="categories" routerLinkActive="active">Catégories</a></li>
          <li><a routerLink="products" routerLinkActive="active">Médicaments</a></li>
          <li><a routerLink="services" routerLinkActive="active">Services</a></li>
          <li><a routerLink="prescriptions" routerLinkActive="active">Ordonnances</a></li>
          <li><a routerLink="manufacturing" routerLinkActive="active">Préparations</a></li>
          <li><a routerLink="orders" routerLinkActive="active">Commandes</a></li>
          <li><a routerLink="clients" routerLinkActive="active">Clients</a></li>
          <li><a routerLink="stock" routerLinkActive="active">Stock</a></li>
          <li><a routerLink="appointments" routerLinkActive="active">Rendez-vous</a></li>
        </ul>
        <div class="logout">
          <button (click)="logout()" class="logout-btn">Se déconnecter</button>
        </div>
      </nav>
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .admin-layout {
      display: flex;
      min-height: 100vh;
    }
    .sidebar {
      width: 250px;
      background: #0066CC;
      padding: 1.5rem;
      color: #f0f0f0;
      display: flex;
      flex-direction: column;
    }
    .logo {
      padding: 1rem;
      text-align: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      margin-bottom: 1rem;

      h1 {
        font-size: 1.5rem;
        margin: 0;
        color: white;
      }
    }
    .nav-links {
      list-style: none;
      padding: 0;
      margin: 0;
      flex: 1;
    }
    .nav-links li a {
      display: block;
      padding: 0.75rem 1rem;
      color: #f0f0f0;
      text-decoration: none;
      border-radius: 6px;
      margin-bottom: 0.5rem;
      transition: all 0.2s ease;
    }
    .nav-links li a:hover {
      background: rgba(255, 255, 255, 0.15);
      transform: translateY(-1px);
    }
    .nav-links li a.active {
      background: rgba(255, 255, 255, 0.2);
      color: #ffffff;
      font-weight: bold;
    }
    .logout {
      padding-top: 1rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
    .logout-btn {
      width: 100%;
      padding: 0.75rem;
      background: none;
      color: #FFD2D2;
      border: 1px solid #FFD2D2;
      border-radius: 6px;
      cursor: pointer;
      font-weight: bold;
      transition: all 0.2s ease;

      &:hover {
        background: rgba(255, 210, 210, 0.1);
        color: white;
      }
    }
    .main-content {
      flex: 1;
      padding: 2rem;
      background: #f8fafc;
      overflow-y: auto;
    }
  `]
})
export class AdminDashboardComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }
}
