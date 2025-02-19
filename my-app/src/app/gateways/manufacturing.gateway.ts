import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Manufacturing } from '../models/manufacturing/manufacturing.entity';

@WebSocketGateway()
export class ManufacturingGateway {
  @WebSocketServer()
  server: Server;

  handleStatusUpdate(manufacturing: Manufacturing) {
    this.server.emit('manufacturing-status-update', manufacturing);
  }
} 