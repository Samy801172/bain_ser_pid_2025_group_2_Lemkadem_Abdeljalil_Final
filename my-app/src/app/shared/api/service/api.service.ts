import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiResponse } from '../data';
import {error} from "@angular/compiler-cli/src/transformers/util";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private paramIsMissingErrorCode: number = 499;
  private readonly http: HttpClient = inject(HttpClient);
  private readonly baseURL: string = 'http://localhost:2024/docs';
  private successHandler(response: object): {
    result: boolean;
    code: string;
    data: object;
    success: boolean;
    paramError: boolean
  } {
    // Implement your success handling logic here
    return {
      code: "", paramError: false, result: false,
      success: true,
      data: response
    };
  }
    private errorHandler(error: HttpErrorResponse): {
      result: boolean;
      code: string;
      data: undefined;
      success: boolean;
      error: string;
      paramError: boolean
    } {
    // Implement your error handling logic here
    console.error('API call error:', error);
    return {
      code: "", data: undefined, paramError: false, result: false,
      success: false,
      error: error.message
    };
  }
    public get(partURL: string): Observable<ApiResponse> {
    return this.handle(this.http.get<ApiResponse>(`${this.baseURL}${partURL}`));
  }

  public handle(obs: Observable<any>): Observable<ApiResponse> {
    return obs.pipe(
      map((response: object) => this.successHandler(response)),
      catchError((error: HttpErrorResponse) => of(this.errorHandler(error)))
    );
  }


}
