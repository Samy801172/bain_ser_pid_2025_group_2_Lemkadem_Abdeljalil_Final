// src/app/components/Promotion/promotion-timer.component.ts

import { Component, Input } from '@angular/core'; // Importation des modules Angular nécessaires
import { CommonModule } from '@angular/common'; // Importation du module commun pour les fonctionnalités de base d’Angular

@Component({
  selector: 'app-promotion-timer', // Définition du sélecteur du composant
  standalone: true, // Indique que le composant peut être utilisé indépendamment
  imports: [CommonModule], // Importation des modules nécessaires
  template: `
    <div class="timer-container"> <!-- Conteneur principal du timer -->
      <!-- Badge -20% -->
      <div class="discount-badge">-20%</div> <!-- Badge indiquant le pourcentage de réduction -->
      <!-- Timer -->
      <div class="time-units"> <!-- Conteneur pour afficher les unités de temps -->
        <div class="time-unit"> <!-- Bloc pour les jours -->
          <span class="number">{{days}}</span> <!-- Affichage du nombre de jours restants -->
          <span class="label">jours</span> <!-- Libellé "jours" -->
        </div>
        <div class="separator">|</div> <!-- Séparateur visuel entre les unités de temps -->
        <div class="time-unit"> <!-- Bloc pour les heures -->
          <span class="number">{{hours}}</span> <!-- Affichage du nombre d'heures restantes -->
          <span class="label">heures</span> <!-- Libellé "heures" -->
        </div>
        <div class="separator">|</div> <!-- Séparateur visuel entre les unités de temps -->
        <div class="time-unit"> <!-- Bloc pour les minutes -->
          <span class="number">{{minutes}}</span> <!-- Affichage du nombre de minutes restantes -->
          <span class="label">min</span> <!-- Libellé "min" -->
        </div>
      </div>
    </div>
  `,
  styles: [`
    .timer-container {
      display: inline-flex; /* Disposition en ligne avec flexbox */
      flex-direction: row; /* Orientation horizontale */
      align-items: center; /* Alignement vertical des éléments */
      background: #ef4444; /* Couleur de fond rouge */
      color: white; /* Couleur du texte en blanc */
      padding: 0.25rem 0.5rem; /* Espacement intérieur */
      border-radius: 4px; /* Bords arrondis */
      position: relative; /* Position relative pour le positionnement interne */
      gap: 0.5rem; /* Espacement entre les éléments */
      min-width: 250px; /* Largeur minimale */
    }

    .discount-badge {
      background: #fbbf24; /* Couleur de fond jaune */
      color: black; /* Couleur du texte en noir */
      padding: 2px 6px; /* Espacement intérieur */
      border-radius: 4px; /* Bords arrondis */
      font-weight: bold; /* Texte en gras */
      font-size: 0.875rem; /* Taille de la police */
    }

    .time-units {
      display: flex; /* Utilisation de flexbox */
      align-items: center; /* Alignement vertical */
      gap: 0.5rem; /* Espacement entre les unités */
      padding-left: 0.5rem; /* Marge à gauche */
    }

    .time-unit {
      display: flex; /* Utilisation de flexbox */
      flex-direction: row; /* Orientation horizontale */
      align-items: baseline; /* Alignement du texte en fonction de la ligne de base */
      gap: 0.25rem; /* Espacement entre les éléments */
    }

    .number {
      font-size: 1rem; /* Taille de la police pour les nombres */
      font-weight: bold; /* Texte en gras */
    }

    .label {
      font-size: 0.75rem; /* Taille de la police pour les libellés */
      color: rgba(255, 255, 255, 0.9); /* Couleur du texte avec opacité */
    }

    .separator {
      color: rgba(255, 255, 255, 0.7); /* Couleur du séparateur avec opacité */
      font-weight: 200; /* Texte plus fin */
      margin: 0 -0.25rem; /* Marges négatives pour rapprocher les séparateurs */
    }
  `]
})
export class PromotionTimerComponent {
  @Input() endDate!: Date | string; // Propriété d'entrée pour la date de fin de la promotion
  days: number = 362; // Valeur par défaut des jours restants
  hours: number = 4; // Valeur par défaut des heures restantes
  minutes: number = 6; // Valeur par défaut des minutes restantes
}
