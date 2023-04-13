import { Component, OnInit } from '@angular/core';
import { ChatService } from './services/chat/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public roomId: string;
  public messageText: string;
  public messageArray: { user: string; message: string }[] = [];

  public phone: string;
  public currentUser;
  public selectedUser;

  public userList = [
    {
      id: 1,
      name: 'John Doe',
      phone: '9856585858',
      roomId: {
        2: 'room-1',
        3: 'room-2',
        4: 'room-3',
      },
    },
    {
      id: 2,
      name: 'Swagger Sharma',
      phone: '9856585444',
      roomId: {
        1: 'room-1',
        3: 'room-4',
        4: 'room-5',
      },
    },
    {
      id: 3,
      name: 'Test User 1',
      phone: '6565555585',
      roomId: {
        1: 'room-2',
        2: 'room-4',
        4: 'room-6',
      },
    },
    {
      id: 4,
      name: 'Test User 2',
      phone: '9956588544',
      roomId: {
        1: 'room-3',
        2: 'room-5',
        4: 'room-6',
      },
    },
  ];

  constructor(private chatService: ChatService) {
    this.chatService
      .getMessage()
      .pipe()
      .subscribe((data: { user: string; message: string }) => {
        this.messageArray.push(data);
      });
  }

  ngOnInit(): void {
    this.currentUser = this.userList[2];
  }

  selectUserHandler(phone: string): void {
    this.selectedUser = this.userList.find((user) => user.phone === phone);
    this.roomId = this.selectedUser.roomId[this.selectedUser.id];
    this.messageArray = [];

    this.join(this.currentUser.name, this.roomId);
  }

  join(username: string, roomId: string): void {
    this.chatService.joinRoom({ user: username, roomId: roomId });
  }

  sendMessage() {
    this.chatService.sendMessage({
      data: this.currentUser.name,
      room: this.roomId,
      message: this.messageText,
    });

    this.messageText = '';
  }
}
