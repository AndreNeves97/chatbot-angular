import { Component } from '@angular/core';
import { ChatsService } from '../../../../../services/chat/chats.service';
import { MessagesService } from '../../../../../services/messages/messages.service';
import { Message } from '../../../../../models/message.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.scss',
})
export class ChatInputComponent {
  inputMessage: string = '';

  constructor(
    private chatsService: ChatsService,
    private messagesService: MessagesService
  ) {}

  public onSubmitForm() {
    const activeChat = this.chatsService.getActiveChat();

    if (!this.inputMessage || !activeChat) {
      return;
    }

    this.messagesService.sendMessage(activeChat.id, this.inputMessage);

    this.inputMessage = '';
  }
}
