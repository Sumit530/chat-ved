import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket: Socket;
  private url: string = 'http://localhost:3000';

  constructor() {
    this.socket = io(this.url);
  }

  joinRoom(data) {
    this.socket.emit('join', data);
  }

  sendMessage(data) {
    this.socket.emit('message', data);
  }

  getMessage(): Observable<any> {
    return new Observable<{ user: string; message: string }>((observer) => {
      this.socket.on('new message', (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    });
  }
}
