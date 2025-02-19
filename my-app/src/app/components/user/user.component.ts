import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user/user.model';
import { UserService } from '../../services';
import { NotificationService } from '../../services/notification/notification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users: User[] = [];

  constructor(
    private userService: UserService,
    private notificationService: NotificationService
  ) {}

  // Méthode du cycle de vie appelée après l'initialisation du composant
  ngOnInit(): void {
    this.loadUsers();
  }

  // Charger tous les utilisateurs
  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (error) => {
        console.error('Erreur chargement utilisateurs:', error);
        this.notificationService.error('Erreur lors du chargement des utilisateurs');
      }
    });
  }

  // Supprimer un utilisateur
  removeUser(userId: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          this.notificationService.success('Utilisateur supprimé avec succès');
          this.loadUsers();
        },
        error: (error) => {
          console.error('Erreur suppression utilisateur:', error);
          // Le message d'erreur spécifique est déjà géré dans le service
        }
      });
    }
  }
}
