import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messages: string[] = [];

  // Ajouter un message
  add(message: string): void {
    this.messages.push(message);
  }

  // Récupérer les messages
  getMessages(): string[] {
    return this.messages;
  }

  // Effacer tous les messages
  clearMessage(): void {
    this.messages = [];
  }
}
