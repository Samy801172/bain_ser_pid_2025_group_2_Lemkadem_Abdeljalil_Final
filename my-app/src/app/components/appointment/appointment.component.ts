// components/appointment/appointment.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AppointmentsService } from '../../services/appointment/appointment.service';
import { Appointment } from '../../models/Appointment/appointment.model';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [CommonModule, DatePipe],
  template: `
    @if (appointments.length > 0) {
      <div class="appointments-list">
        <h2>Mes Rendez-vous</h2>
        <ul>
          @for (appointment of appointments; track appointment.appointmentId) {
            <li class="appointment-item">
              <div class="appointment-time">
                {{appointment.appointmentDate | date:'dd/MM/yyyy'}} à {{appointment.time}}
              </div>
              <div class="appointment-status">
                {{appointment.status}}
              </div>
            </li>
          }
        </ul>
      </div>
    } @else {
      <div class="no-appointments">
        <p>Aucun rendez-vous programmé</p>
      </div>
    }
  `,
  styles: [`
    .appointments-list {
      padding: 20px;
    }

    .appointment-item {
      background: white;
      padding: 15px;
      margin-bottom: 10px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
  `]
})
export class AppointmentComponent implements OnInit {
  appointments: Appointment[] = [];

  constructor(private appointmentService: AppointmentsService) {}
// pour initialiser le composant on utilse la methode ngOnInit()
  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.appointmentService.getAll().subscribe({
      next: (data: Appointment[]) => {
        this.appointments = data;
      },
      error: (error) => {
        console.error('Erreur chargement rendez-vous:', error);
      }
    });
  }
}
