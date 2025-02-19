import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { Appointment } from '../../../../../models/Appointment/appointment.model';
import { Client } from '../../../../../models/client/client.model';
import { NotificationService } from '../../../../../services/notification/notification.service';

import { AppointmentStatus } from '../../../../../models/Appointment/appointment-types';
import { AdminService } from '../../../../../services';

// Ajout de l'interface Service si elle n'est pas déjà importée
interface Service {
  id: number;
  name: string;
  description?: string;
  duration: number;
  price: number;
}

interface AppointmentForm {
  clientId: number;
  serviceId: number;
  appointmentDate: string;
  time: string;
  notes: string;
}

@Component({
  selector: 'app-admin-appointments',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="appointments-container">
      <header class="page-header">
        <h2>Gestion des Rendez-vous</h2>
        <button class="add-btn" (click)="toggleAddForm()">
          {{ showAddForm ? 'Fermer' : 'Nouveau Rendez-vous' }}
        </button>
      </header>

      <!-- Formulaire de rendez-vous -->
      <div *ngIf="showAddForm" class="appointment-form">
        <form [formGroup]="appointmentForm" (ngSubmit)="submitAppointment()">
          <div class="form-row">
            <div class="form-group">
              <label for="client">Client</label>
              <select id="client" formControlName="clientId" required>
                <option value="">Sélectionnez un client</option>
                <option *ngFor="let client of clients" [value]="client.clientId">
                  {{ client.firstName }} {{ client.lastName }}
                </option>
              </select>
              <span *ngIf="appointmentForm.get('clientId')?.touched && appointmentForm.get('clientId')?.errors" class="error-message">
                Veuillez sélectionner un client
              </span>
            </div>

            <div class="form-group">
              <label for="service">Service</label>
              <select id="service" formControlName="serviceId" required (change)="onServiceChange()">
                <option value="">Sélectionnez un service</option>
                <option *ngFor="let service of services" [value]="service.id">
                  {{ service.name }} ({{ getServiceDuration(service.id) }})
                </option>
              </select>
              <span *ngIf="appointmentForm.get('serviceId')?.touched && appointmentForm.get('serviceId')?.errors" class="error-message">
                Veuillez sélectionner un service
              </span>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="date">Date</label>
              <input
                type="date"
                id="date"
                formControlName="appointmentDate"
                required
                [min]="minDate"
                (change)="onDateChange()"
              />
              <span *ngIf="appointmentForm.get('appointmentDate')?.touched && appointmentForm.get('appointmentDate')?.errors" class="error-message">
                <span *ngIf="appointmentForm.get('appointmentDate')?.errors?.['required']">Veuillez sélectionner une date</span>
                <span *ngIf="appointmentForm.get('appointmentDate')?.errors?.['pastDate']">La date ne peut pas être dans le passé</span>
              </span>
            </div>

            <div class="form-group">
              <label for="time">Heure</label>
              <select id="time" formControlName="time" required>
                <option value="">Sélectionnez une heure</option>
                <option *ngFor="let slot of availableTimeSlots" [value]="slot">{{ slot }}</option>
              </select>
              <span *ngIf="appointmentForm.get('time')?.touched && appointmentForm.get('time')?.errors" class="error-message">
                Veuillez sélectionner une heure
              </span>
            </div>
          </div>

          <div class="form-group">
            <label for="notes">Notes</label>
            <textarea id="notes" formControlName="notes" rows="3" placeholder="Ajoutez des notes ou instructions particulières..."></textarea>
          </div>

          <div class="form-actions">
            <button type="submit" [disabled]="!appointmentForm.valid" class="submit-btn">
              {{ editingAppointment ? 'Mettre à jour' : 'Créer le rendez-vous' }}
            </button>
            <button type="button" class="cancel-btn" (click)="toggleAddForm()">Annuler</button>
          </div>
        </form>
      </div>

      <!-- Liste des rendez-vous -->
      <div class="appointments-list">
        <div *ngIf="filteredAppointments.length === 0" class="no-data">
          Aucun rendez-vous trouvé
        </div>
        <div *ngIf="filteredAppointments.length > 0" class="appointments-grid">
          <div *ngFor="let appointment of filteredAppointments" class="appointment-card">
            <div class="appointment-content">
              <h3>Rendez-vous #{{ appointment.appointmentId }}</h3>
              <p>Date : {{ appointment.appointmentDate | date:'dd/MM/yyyy' }}</p>
              <p>Heure : {{ formatTime(appointment.time) }}</p>
              <p>Client : {{ appointment.client?.firstName }} {{ appointment.client?.lastName }}</p>
              <p>Service : {{ appointment.service?.name }}</p>
              <p class="status" [ngClass]="getStatusClass(appointment.status)">
                Statut : {{ getStatusLabel(appointment.status) }}
              </p>
              <p>Notes : {{ appointment.notes || '-' }}</p>
            </div>
            <div class="appointment-actions">
              <button *ngIf="canEditAppointment(appointment)" class="edit-btn" (click)="editAppointment(appointment)">Modifier</button>
              <button *ngIf="canEditAppointment(appointment)" class="cancel-btn" (click)="cancelAppointment(appointment)">Annuler</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .appointments-container {
        padding: 20px;
        max-width: 1200px;
        margin: 0 auto;
      }

      .page-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;

        h2 {
          color: #333;
          margin: 0;
        }

        .add-btn {
          background: #4f46e5;
          color: white;
          padding: 8px 16px;
          border: none;
          border-radius: 8px;
          cursor: pointer;

          &:hover {
            background: #4338ca;
          }
        }
      }

      .appointment-form {
        background: white;
        padding: 20px;
        border-radius: 16px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        margin-bottom: 20px;
      }

      .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        margin-bottom: 15px;
      }

      .form-group {
        display: flex;
        flex-direction: column;

        label {
          margin-bottom: 5px;
          color: #4b5563;
        }

        input,
        select,
        textarea {
          padding: 8px;
          border: 1px solid #d1d5db;
          border-radius: 8px;

          &:focus {
            outline: none;
            border-color: #4f46e5;
          }
        }

        .error-message {
          color: #b91c1c;
          margin-top: 5px;
        }
      }

      .form-actions {
        display: flex;
        gap: 10px;
        margin-top: 20px;

        .submit-btn {
          background: #16a34a;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 8px;
          cursor: pointer;

          &:disabled {
            background: #d1d5db;
            cursor: not-allowed;
          }
        }

        .cancel-btn {
          background: #dc2626;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
        }
      }

      .appointments-list {
        margin-top: 20px;
      }

      .appointments-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
      }

      .appointment-card {
        background: white;
        border-radius: 16px;
        padding: 20px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      .appointment-content {
        h3 {
          margin: 0 0 10px 0;
          color: #333;
          font-size: 1.5rem;
        }

        p {
          color: #6b7280;
          margin: 5px 0;
          font-size: 1rem;
        }

        .status {
          font-weight: 600;
        }
      }

      .appointment-actions {
        display: flex;
        gap: 10px;
        margin-top: 20px;

        button {
          flex: 1;
          padding: 10px 20px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;

          &.edit-btn {
            background: #4f46e5;
            color: white;
          }

          &.cancel-btn {
            background: #dc2626;
            color: white;
          }

          &:hover {
            opacity: 0.9;
          }
        }
      }

      .no-data {
        grid-column: 1 / -1;
        padding: 40px;
        text-align: center;
        color: #666;
        background: white;
        border-radius: 16px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }

      @media (max-width: 768px) {
        .appointments-grid {
          grid-template-columns: 1fr;
        }
      }
    `
  ]
})
export class AdminAppointmentsComponent implements OnInit, OnDestroy {
  // Propriétés
  appointments: Appointment[] = [];
  filteredAppointments: Appointment[] = [];
  statusFilter = '';
  dateFilter = '';
  searchQuery = '';
  showAddForm = false;
  editingAppointment: Appointment | null = null;
  appointmentForm!: FormGroup;
  clients: Client[] = [];
  services: Service[] = [];
  availableTimeSlots: string[] = [];
  minDate: string;
  private subscriptions: Subscription[] = [];

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) {
    this.minDate = new Date().toISOString().split('T')[0];
    this.initForm();
    this.generateTimeSlots();
  }

  ngOnInit(): void {
    this.loadInitialData();
    this.setupFormListeners();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private loadInitialData(): void {
    this.loadAppointments();
    this.loadClients();
    this.loadServices();
  }

  private setupFormListeners(): void {
    const dateControl = this.appointmentForm.get('appointmentDate');
    const serviceControl = this.appointmentForm.get('serviceId');

    if (dateControl) {
      this.subscriptions.push(
        dateControl.valueChanges.subscribe(() => {
          this.onDateChange();
        })
      );
    }

    if (serviceControl) {
      this.subscriptions.push(
        serviceControl.valueChanges.subscribe(() => {
          this.onServiceChange();
        })
      );
    }
  }

  private initForm(): void {
    this.appointmentForm = this.fb.group({
      clientId: ['', Validators.required],
      serviceId: ['', Validators.required],
      appointmentDate: ['', [Validators.required, this.dateValidator()]],
      time: ['', Validators.required],
      notes: ['']
    });
  }

  private dateValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const selectedDate = new Date(control.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        return { pastDate: true };
      }
      return null;
    };
  }

  private generateTimeSlots(): string[] {
    const slots: string[] = [];
    const startHour = 9;
    const endHour = 18;

    for (let hour = startHour; hour <= endHour; hour++) {
      const formattedHour = hour.toString().padStart(2, '0');
      slots.push(`${formattedHour}:00`);
      if (hour < endHour) {
        slots.push(`${formattedHour}:30`);
      }
    }
    return slots;
  }

  private getSlotDuration(serviceId: number): number {
    const service = this.services.find(s => s.id === serviceId);
    return service ? service.duration : 60; // Durée par défaut de 60 minutes
  }

  isTimeSlotAvailable(date: string, time: string): boolean {
    const dateTime = new Date(`${date}T${time}`);
    const now = new Date();
    const selectedServiceId = this.appointmentForm.get('serviceId')?.value;
    const duration = this.getSlotDuration(selectedServiceId);

    if (dateTime < now) {
      return false;
    }

    const endTime = new Date(dateTime);
    endTime.setMinutes(endTime.getMinutes() + duration);
    if (endTime.getHours() > 18) {
      return false;
    }

    return !this.appointments.some(appointment => {
      if (appointment.appointmentId === this.editingAppointment?.appointmentId) {
        return false;
      }

      const appointmentStart = new Date(`${appointment.appointmentDate}T${appointment.time}`);
      const appointmentEnd = new Date(appointmentStart);
      const appointmentDuration = this.getSlotDuration(appointment.serviceId);
      appointmentEnd.setMinutes(appointmentEnd.getMinutes() + appointmentDuration);

      const slotEnd = new Date(dateTime);
      slotEnd.setMinutes(slotEnd.getMinutes() + duration);

      return (dateTime < appointmentEnd && slotEnd > appointmentStart);
    });
  }

  onDateChange(): void {
    const selectedDate = this.appointmentForm.get('appointmentDate')?.value;
    if (selectedDate) {
      const allSlots = this.generateTimeSlots();
      this.availableTimeSlots = allSlots.filter(slot =>
        this.isTimeSlotAvailable(selectedDate, slot)
      );

      if (this.availableTimeSlots.length === 0) {
        this.notificationService.warning('Aucun créneau disponible pour cette date');
      }
    }
  }

  onServiceChange(): void {
    const serviceId = this.appointmentForm.get('serviceId')?.value;
    const service = this.services.find(s => s.id === serviceId);

    if (service) {
      this.onDateChange();
      if (service.duration > 60) {
        this.notificationService.info(`Ce service nécessite ${service.duration} minutes`);
      }
    }
  }

  editAppointment(appointment: Appointment): void {
    this.editingAppointment = appointment;
    const appointmentDate = new Date(appointment.appointmentDate)
      .toISOString()
      .split('T')[0];

    this.appointmentForm.patchValue({
      clientId: appointment.clientId,
      serviceId: appointment.serviceId,
      appointmentDate: appointmentDate,
      time: appointment.time,
      notes: appointment.notes || ''
    });

    this.onDateChange();
    this.showAddForm = true;
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) {
      this.editingAppointment = null;
      this.appointmentForm.reset();
    } else {
      this.availableTimeSlots = this.generateTimeSlots();
    }
  }

  filterAppointments(): void {
    this.filteredAppointments = this.appointments.filter(appointment => {
      const matchesStatus = !this.statusFilter ||
        appointment.status.toLowerCase() === this.statusFilter.toLowerCase();

      const matchesDate = !this.dateFilter ||
        new Date(appointment.appointmentDate).toISOString().split('T')[0] === this.dateFilter;

      const matchesSearch = !this.searchQuery ||
        (appointment.client &&
          (`${appointment.client.firstName} ${appointment.client.lastName}`)
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase())
        );

      return matchesStatus && matchesDate && matchesSearch;
    });
  }

  private validateAppointmentData(data: Partial<Appointment>): boolean {
    const now = new Date();
    const appointmentDate = new Date(data.appointmentDate!);

    if (appointmentDate < now) {
      this.notificationService.error('La date du rendez-vous ne peut pas être dans le passé');
      return false;
    }

    if (!this.isTimeSlotAvailable(data.appointmentDate!.toString(), data.time!)) {
      this.notificationService.error('Ce créneau horaire n\'est plus disponible');
      return false;
    }

    const existingAppointment = this.appointments.find(a =>
      a.clientId === data.clientId &&
      new Date(a.appointmentDate).toDateString() === appointmentDate.toDateString() &&
      a.appointmentId !== this.editingAppointment?.appointmentId
    );

    if (existingAppointment) {
      this.notificationService.warning('Ce client a déjà un rendez-vous prévu ce jour');
      return false;
    }

    return true;
  }

  submitAppointment(): void {
    if (!this.appointmentForm.valid) {
      this.notificationService.error('Veuillez remplir tous les champs obligatoires');
      this.markFormGroupTouched(this.appointmentForm);
      return;
    }

    const formValue = this.appointmentForm.value;
    const appointmentData: Partial<Appointment> = {
      clientId: formValue.clientId,
      serviceId: formValue.serviceId,
      appointmentDate: new Date(`${formValue.appointmentDate}T${formValue.time}`),
      time: formValue.time,
      notes: formValue.notes || undefined,
      status: this.editingAppointment ? this.editingAppointment.status : AppointmentStatus.PENDING
    };

    if (this.validateAppointmentData(appointmentData)) {
      if (this.editingAppointment) {
        this.updateAppointment(this.editingAppointment.appointmentId, appointmentData);
      } else {
        this.createAppointment(appointmentData);
      }
    }
  }

  loadAppointments(): void {
    this.adminService.getAllAppointments().subscribe({
      next: (appointments: Appointment[]) => {
        this.appointments = appointments;
        this.filterAppointments();
        this.notificationService.success('Rendez-vous chargés avec succès');
      },
      error: (error: any) => {
        console.error('Erreur chargement rendez-vous:', error);
        this.notificationService.error('Erreur lors du chargement des rendez-vous');
      }
    });
  }

  loadClients(): void {
    this.adminService.getClients().subscribe({
      next: (clients: Client[]) => {
        this.clients = clients;
      },
      error: (error) => {
        console.error('Erreur chargement clients:', error);
        this.notificationService.error('Erreur lors du chargement des clients');
      }
    });
  }

  loadServices(): void {
    this.adminService.getServices().subscribe({
      next: (services: Service[]) => {
        this.services = services;
      },
      error: (error: any) => {
        console.error('Erreur chargement services:', error);
        this.notificationService.error('Erreur lors du chargement des services');
      }
    });
  }

  createAppointment(appointmentData: Partial<Appointment>): void {
    this.adminService.createAppointment(appointmentData).subscribe({
      next: (_: any) => {
        this.loadAppointments();
        this.toggleAddForm();
        this.notificationService.success('Rendez-vous créé avec succès');
        this.sendConfirmationEmail(appointmentData);
      },
      error: (error: Error) => {
        console.error('Erreur création rendez-vous:', error);
        this.notificationService.error('Erreur lors de la création du rendez-vous');
      }
    });
  }

  updateAppointment(id: number, appointmentData: Partial<Appointment>): void {
    this.adminService.updateAppointment(id, appointmentData).subscribe({
      next: (_: any) => {
        this.loadAppointments();
        this.toggleAddForm();
        this.notificationService.success('Rendez-vous mis à jour avec succès');
        this.sendUpdateNotification(appointmentData);
      },
      error: (error: Error) => {
        console.error('Erreur mise à jour rendez-vous:', error);
        this.notificationService.error('Erreur lors de la mise à jour du rendez-vous');
      }
    });
  }

  updateStatus(appointmentId: number, newStatus: AppointmentStatus): void {
    const appointment = this.appointments.find(a => a.appointmentId === appointmentId);
    if (!appointment) {
      this.notificationService.error('Rendez-vous non trouvé');
      return;
    }

    this.adminService.updateAppointmentStatus(appointmentId, newStatus).subscribe({
      next: (_: any) => {
        this.loadAppointments();
        this.notificationService.success(`Statut du rendez-vous mis à jour : ${newStatus}`);
        if (newStatus === AppointmentStatus.CONFIRMED) {
          this.sendConfirmationEmail(appointment);
        }
      },
      error: (error: any) => {
        console.error('Erreur mise à jour statut:', error);
        this.notificationService.error('Erreur lors de la mise à jour du statut');
      }
    });
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  private sendConfirmationEmail(appointment: Partial<Appointment>): void {
    const client = this.clients.find(c => c.clientId === appointment.clientId);
    if (client?.user?.email) {
      this.notificationService.success(`Un email de confirmation a été envoyé à ${client.user.email}`);
    }
  }

  private sendUpdateNotification(appointment: Partial<Appointment>): void {
    const client = this.clients.find(c => c.clientId === appointment.clientId);
    if (client?.user?.email) {
      this.notificationService.info(`Un email de mise à jour a été envoyé à ${client.user.email}`);
    }
  }

  formatDate(date: string | Date): string {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  formatTime(time: string): string {
    return time.padStart(5, '0');
  }

  getAllStatuses(): AppointmentStatus[] {
    return Object.values(AppointmentStatus);
  }

  getStatusLabel(status: AppointmentStatus): string {
    const statusLabels: Record<AppointmentStatus, string> = {
      [AppointmentStatus.PENDING]: 'En attente',
      [AppointmentStatus.CONFIRMED]: 'Confirmé',
      [AppointmentStatus.CANCELLED]: 'Annulé',
      [AppointmentStatus.COMPLETED]: 'Terminé',
      [AppointmentStatus.NOSHOW]: 'Non présenté'
    };
    return statusLabels[status] || status;
  }

  getServiceDuration(serviceId: number): string {
    const service = this.services.find(s => s.id === serviceId);
    if (!service) return '';
    const hours = Math.floor(service.duration / 60);
    const minutes = service.duration % 60;
    return hours > 0
      ? `${hours}h${minutes > 0 ? minutes : ''}`
      : `${minutes}min`;
  }

  getStatusClass(status: AppointmentStatus): string {
    const classes: Record<AppointmentStatus, string> = {
      [AppointmentStatus.PENDING]: 'bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full',
      [AppointmentStatus.CONFIRMED]: 'bg-blue-100 text-blue-800 px-2 py-1 rounded-full',
      [AppointmentStatus.CANCELLED]: 'bg-red-100 text-red-800 px-2 py-1 rounded-full',
      [AppointmentStatus.COMPLETED]: 'bg-green-100 text-green-800 px-2 py-1 rounded-full',
      [AppointmentStatus.NOSHOW]: 'bg-gray-100 text-gray-800 px-2 py-1 rounded-full'
    };
    return classes[status] || 'bg-gray-100 text-gray-800 px-2 py-1 rounded-full';
  }

  canEditAppointment(appointment: Appointment): boolean {
    return appointment.status !== AppointmentStatus.CANCELLED &&
      appointment.status !== AppointmentStatus.COMPLETED &&
      new Date(appointment.appointmentDate) > new Date();
  }

  cancelAppointment(appointment: Appointment): void {
    if (confirm(`Êtes-vous sûr de vouloir annuler ce rendez-vous avec ${appointment.client?.firstName} ${appointment.client?.lastName} ?`)) {
      this.updateStatus(appointment.appointmentId, AppointmentStatus.CANCELLED);
    }
  }

  protected readonly AppointmentStatus = AppointmentStatus;
}
