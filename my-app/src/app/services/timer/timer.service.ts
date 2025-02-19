// src/app/services/timer.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, interval } from 'rxjs';

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
}

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private timer$ = new BehaviorSubject<TimeRemaining>(this.calculateTimeRemaining(new Date()));


  constructor() {
    const defaultEndDate = new Date('2025-12-31T23:59:59'); // Exemple de date cible
    interval(60000).subscribe(() => {
      this.timer$.next(this.calculateTimeRemaining(defaultEndDate));
    });
  }

  private calculateTimeRemaining(endDate: Date): TimeRemaining {
    const now = new Date().getTime();
    const distance = new Date(endDate).getTime() - now;

    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    };
  }

  getTimer(endDate: Date): Observable<TimeRemaining> {
    const timer$ = new BehaviorSubject<TimeRemaining>(this.calculateTimeRemaining(endDate));
    interval(60000).subscribe(() => {
      timer$.next(this.calculateTimeRemaining(endDate));
    });
    return timer$.asObservable();
  }
}
