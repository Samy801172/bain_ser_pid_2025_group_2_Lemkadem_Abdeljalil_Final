// services/upload/upload.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  // Simule un upload d'image
  // Dans une vraie application, ceci ferait un appel API vers votre backend
  uploadImage(file: File): Observable<string> {
    return new Observable(observer => {
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        // Simulons un délai d'upload
        setTimeout(() => {
          if (e.target?.result) {
            // Dans une vraie application, ceci serait l'URL retournée par votre serveur
            const imageUrl = URL.createObjectURL(file);
            observer.next(imageUrl);
            observer.complete();
          } else {
            observer.error(new Error("Échec du chargement de l'image"));
          }
        }, 1000);
      };

      reader.onerror = (error) => {
        observer.error(error);
      };

      reader.readAsDataURL(file);
    });
  }
}
