import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from 'app/newRoot/app.routes';
import { AppComponent } from '@newRoot';
import { provideAnimations } from '@angular/platform-browser/animations';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { importProvidersFrom } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from 'app/interceptors/auth.interceptor';

const config: SocketIoConfig = { 
  url: 'http://localhost:2024', // URL du backend
  options: {
    transports: ['websocket'],
    path: '/socket.io'
  }
};

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    importProvidersFrom(SocketIoModule.forRoot(config))
  ]
}).catch(err => console.error(err));
