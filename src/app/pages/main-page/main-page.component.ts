import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Chat } from '../../models/chat.model';
import { ChatItemButtonComponent } from './components/chat-item-button/chat-item-button.component';
import { ChatsService } from '../../services/chat/chats.service';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [RouterOutlet, ChatItemButtonComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {
  chats: Chat[] = [];

  constructor(private chatsService: ChatsService) {
    this.chats = this.chatsService.getChats();
  }
}
