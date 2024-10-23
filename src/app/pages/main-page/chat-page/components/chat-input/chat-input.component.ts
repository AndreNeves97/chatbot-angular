import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatsService } from '../../../../../services/chat/chats.service';
import { MessagesService } from '../../../../../services/messages/messages.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-chat-input',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.scss',
})
export class ChatInputComponent implements OnInit {
  @ViewChild('input', { static: true })
  inputElement!: ElementRef<HTMLInputElement>;

  inputMessage: string = '';

  constructor(
    private chatsService: ChatsService,
    private messagesService: MessagesService
  ) {}

  ngOnInit(): void {
    this.chatsService.getActiveChat$().subscribe(() => {
      this.inputElement.nativeElement.focus();
      this.inputElement.nativeElement.value = '';
    });
  }

  public onSubmitForm() {
    const activeChat = this.chatsService.getActiveChat();

    if (!this.inputMessage || !activeChat) {
      return;
    }

    this.messagesService.sendMessage(activeChat.id, this.inputMessage);

    this.inputMessage = '';
  }
}
