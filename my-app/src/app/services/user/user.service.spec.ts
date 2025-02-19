import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {CreateUserDto} from '../../models';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  getUsers() {
      throw new Error('Method not implemented.');
  }
  deleteUser(userIdToDelete: number) {
      throw new Error('Method not implemented.');
  }


  private apiUrl = 'http://localhost:2024/api/users';

  constructor(private http: HttpClient) {}

  createUser(user: CreateUserDto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, user);
  }
}
