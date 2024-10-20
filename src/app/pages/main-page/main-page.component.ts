import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChatModel } from '../../services/chats/models/chat.model';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {
  chats: ChatModel[] = [
    { name: 'Chat 1', id: 'chat-1' },
    { name: 'Chat 2', id: 'chat-2' },
    { name: 'Chat 3', id: 'chat-3' },
  ];
}
