// src/app/service/service.component.ts
import { Component, OnInit } from '@angular/core';
import { CreateServiceDto } from 'app/models/Service/create-service.dto';
import { ServiceService } from 'app/services/Service/service.service';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf
  ],
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {
  services: any[] = [];
  newService: CreateServiceDto = {
    name: '',
    price: 0,
    description: '',
    duration: 0
  };

  constructor(private serviceService: ServiceService) {}

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.serviceService.getAllServices().subscribe((data) => {
      this.services = data;
    });
  }

  onSubmit(): void {
    this.serviceService.createService(this.newService).subscribe((service) => {
      this.services.push(service);
      this.resetForm();
    });
  }

  deleteService(id: number): void {
    this.serviceService.deleteService(id).subscribe(() => {
      this.services = this.services.filter((service) => service.serviceId !== id);
    });
  }

  resetForm(): void {
    this.newService = {
      name: '',
      price: 0,
      description: '',
      duration: 0
    };
  }
}
