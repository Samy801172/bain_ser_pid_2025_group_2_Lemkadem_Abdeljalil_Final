// Importation des modules et composants nécessaires pour ce composant
import { Component, DestroyRef, inject, Input, signal, WritableSignal } from '@angular/core'; // Angular Core pour les fonctionnalités de base du composant
import { CardComponent, FormError } from "../../../../shared"; // Composants partagés (comme CardComponent et FormError) importés pour usage
import { FloatLabelInputComponent } from 'app/shared/ui/form/component/float-label-input/float-label-input.component'; // Input flottant avec étiquette, pour les champs de formulaire
import { FormGroup } from "@angular/forms"; // Utilisé pour définir les groupes de contrôles dans un formulaire réactif
import { FormControlSimpleConfig } from "../../../../shared/ui/form/data/config"; // Configuration des contrôles de formulaire simples
import { handleFormError } from "../../../../shared/ui/form/utils"; // Utilitaire pour gérer les erreurs de formulaire
import { BehaviorSubject } from "rxjs"; // Pour gérer l'état réactif des erreurs du formulaire
import { JsonPipe, CommonModule } from "@angular/common"; // Utilisé pour le pipe JSON et d'autres modules Angular

// Définition du composant 'SecurityFormComponent'
@Component({
  selector: 'app-security-form', // Le sélecteur pour utiliser ce composant dans l'HTML
  standalone: true, // Indique que ce composant est autonome et n'a pas besoin d'un module parent
  imports: [
    CardComponent, // Importation de CardComponent pour afficher des informations sous forme de carte
    FloatLabelInputComponent, // Composant d'input avec étiquette flottante
    JsonPipe, // Utilisation du pipe JSON pour afficher des données en JSON dans la vue
    CommonModule // Module commun d'Angular pour utiliser des fonctionnalités de base comme les pipes
  ],
  templateUrl: './security-form.component.html', // Le fichier de modèle HTML associé à ce composant
  styleUrls: ['security-form.component.scss'] // Le fichier de style SCSS pour ce composant
})
export class SecurityFormComponent {
  // Déclaration des propriétés d'entrée du composant avec des valeurs par défaut et des validations
  @Input() title: string = 'Connectez-vous'; // Le titre du formulaire, peut être modifié à partir du parent
  @Input({required: true}) formGroup!: FormGroup; // Le groupe de formulaire réactif, requis
  @Input({required: true}) config!: FormControlSimpleConfig[]; // La configuration du formulaire, nécessaire pour définir les champs
  @Input() icon: string = 'fa-solid fa-unlock'; // Icône par défaut pour le formulaire (ex: un cadenas pour la sécurité)

  // Gestion des erreurs du formulaire via BehaviorSubject et WritableSignal
  protected errors$: BehaviorSubject<FormError[]> = new BehaviorSubject<FormError[]>([]); // Observable des erreurs du formulaire
  protected errorsSignal$: WritableSignal<FormError[]> = signal([]); // Signal réactif des erreurs du formulaire

  // Référence au DestroyRef pour gérer la destruction du composant
  public destroyerRef: DestroyRef = inject(DestroyRef);

  // Méthode pour valider le formulaire (si le formulaire est invalide, un message est loggé)
  public validateForm(): void {
    console.log('validateForm called');
    if (this.formGroup.invalid) {
      console.log('Form is invalid');
      return;
    }
  }

  // Initialisation du composant
  ngOnInit() {
    // Appel de la fonction pour gérer les erreurs du formulaire en utilisant handleFormError
    handleFormError(this.formGroup, this.errors$, this.destroyerRef);
  }
}
