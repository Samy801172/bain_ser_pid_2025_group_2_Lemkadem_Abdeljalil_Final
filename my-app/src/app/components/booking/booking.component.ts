
// components/booking/booking.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {Service} from '../../models/Service/service.model';
import {NotificationService} from '../../services/notification/notification.service';
import {AppointmentsService} from '../../services/appointment/appointment.service';


@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
<div class="booking-container">
  <!-- Étape 1: Sélection du service -->
@if (currentStep === 1) {
  <div class="service-selection">
    <h2>Choisissez votre service</h2>
  <div class="services-grid">
    @for (service of services; track service.id) {
    <div
      class="service-card"
      [class.selected]="selectedService?.id === service.id"
    (click)="selectService(service)"
      >
      <h3>{{ service.name }}</h3>
    <p>{{ service.description }}</p>
    <div class="service-details">
      <span>{{ service.duration }} min</span>
    <span>{{ service.price | currency:'EUR' }}</span>
    </div>
    </div>
  }
  </div>
  <button
  class="next-btn"
    [disabled]="!selectedService"
  (click)="nextStep()"
    >
    Continuer
    </button>
    </div>
}

<!-- Étape 2: Sélection date et heure -->
@if (currentStep === 2) {
  <div class="datetime-selection">
    <h2>Choisissez votre date et heure</h2>
  <form [formGroup]="bookingForm">
  <div class="date-picker">
    <label>Date</label>
    <input
  type="date"
  formControlName="date"
    [min]="minDate"
  (change)="onDateChange()"
    >
    </div>

@if (availableSlots.length > 0) {
    <div class="time-slots">
      <label>Heures disponibles</label>
    <div class="slots-grid">
      @for (slot of availableSlots; track slot) {
      <button
        type="button"
        [class.selected]="selectedTime === slot"
      (click)="selectTimeSlot(slot)"
        >
        {{ slot }}
      </button>
    }
    </div>
    </div>
  } @else {
    <p class="no-slots">Aucun créneau disponible pour cette date</p>
  }
  </form>

  <div class="booking-actions">
  <button class="back-btn" (click)="previousStep()">Retour</button>
    <button
  class="next-btn"
    [disabled]="!selectedTime"
  (click)="confirmBooking()"
    >
    Confirmer le rendez-vous
  </button>
  </div>
  </div>
}

<!-- Étape 3: Confirmation -->
@if (currentStep === 3) {
  <div class="booking-confirmation">
    <h2>Confirmation de votre rendez-vous</h2>
  <div class="confirmation-details">
    <p><strong>Service:</strong> {{ selectedService?.name }}</p>
  <p><strong>Date:</strong> {{ bookingForm.get('date')?.value | date }}</p>
  <p><strong>Heure:</strong> {{ selectedTime }}</p>
  <p><strong>Durée:</strong> {{ selectedService?.duration }} minutes</p>
  <p><strong>Prix:</strong> {{ selectedService?.price | currency:'EUR' }}</p>
  </div>
  </div>
}
</div>
  `,
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  currentStep = 1;
  services: Service[] = [];
  selectedService?: Service;
  availableSlots: string[] = [];
  selectedTime?: string;
  bookingForm: FormGroup;
  minDate: string;

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentsService,
    private notificationService: NotificationService
  ) {
    this.minDate = new Date().toISOString().split('T')[0];
    this.initForm();
  }

  ngOnInit(): void {
    this.loadServices();
  }

  private initForm(): void {
    this.bookingForm = this.fb.group({
      date: ['', Validators.required],
      time: ['', Validators.required]
    });
  }

  private loadServices(): void {
    this.appointmentService.getServices().subscribe({
      next: (services) => {
        this.services = services;
      },
      error: (error) => {
        this.notificationService.error('Erreur lors du chargement des services');
      }
    });
  }

  selectService(service: Service): void {
    this.selectedService = service;
  }

  onDateChange(): void {
    if (!this.selectedService) return;

    const selectedDate = this.bookingForm.get('date')?.value;
    this.appointmentService.getAvailableSlots(selectedDate, this.selectedService.id)
      .subscribe({
        next: (slots) => {
          this.availableSlots = slots;
          if (slots.length === 0) {
            this.notificationService.info('Aucun créneau disponible pour cette date');
          }
        },
        error: (error) => {
          this.notificationService.error('Erreur lors du chargement des créneaux');
        }
      });
  }

  selectTimeSlot(time: string): void {
    this.selectedTime = time;
    this.bookingForm.patchValue({ time });
  }

  confirmBooking(): void {
    if (!this.selectedService || !this.selectedTime) return;

    const bookingData = {
      serviceId: this.selectedService.id,
      date: this.bookingForm.get('date')?.value,
      time: this.selectedTime
    };

    this.appointmentService.createAppointment(bookingData).subscribe({
      next: () => {
        this.notificationService.success('Rendez-vous confirmé avec succès !');
        this.currentStep = 3;
      },
      error: () => {
        this.notificationService.error('Erreur lors de la création du rendez-vous');
      }
    });
  }

  nextStep(): void {
    this.currentStep++;
  }

  previousStep(): void {
    this.currentStep--;
  }
}
