import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Chat } from '../../../../models/chat.model';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { MessagesService } from '../../../../services/messages/messages.service';
import { Message } from '../../../../models/message.model';
import { ChatsService } from '../../../../services/chat/chats.service';
import { NgClass } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-chat-item-button',
  standalone: true,
  imports: [NgClass, RouterLink, RouterLinkActive, MatButtonModule],
  templateUrl: './chat-item-button.component.html',
  styleUrl: './chat-item-button.component.scss',
})
export class ChatItemButtonComponent implements OnInit {
  @Input({ required: true })
  chat!: Chat;

  lastMessage!: Message;
  allMessagesRead: boolean = true;

  constructor(
    private chatsService: ChatsService,
    private messagesService: MessagesService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.lastMessage = this.messagesService.getLastMessage(this.chat.id);

    this.listenToReceivedMessages();
  }

  private listenToReceivedMessages() {
    this.messagesService.getLastMessage$(this.chat.id).subscribe((message) => {
      this.onReceiveMessage(message);
    });
  }

  private onReceiveMessage(message: Message) {
    if (this.chatsService.getActiveChat() !== this.chat) {
      this.allMessagesRead = false;
    }

    this.lastMessage = message;

    this.changeDetector.detectChanges();
  }

  public onClick() {
    this.allMessagesRead = true;
  }
}
