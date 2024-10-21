import { ChangeDetectorRef, Component, Input, OnChanges } from '@angular/core';
import { MessagesService } from '../../../services/messages/messages.service';
import { Subscription } from 'rxjs';
import { Message } from '../../../models/message.model';
import { ChatsService } from '../../../services/chat/chats.service';
import { ChatInputComponent } from './components/chat-input/chat-input.component';

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [ChatInputComponent],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.scss',
})
export class ChatPageComponent implements OnChanges {
  @Input()
  chatId: string = '';

  messages: Message[] = [];

  messagesSubscription!: Subscription;

  constructor(
    private chatsService: ChatsService,
    private messagesService: MessagesService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnChanges(): void {
    this.chatsService.setActiveChat(this.chatId);
    this.messages = this.messagesService.getMessages(this.chatId);
    this.listenToReceivedMessages();
  }

  private listenToReceivedMessages() {
    if (this.messagesSubscription) {
      this.messagesSubscription.unsubscribe();
    }

    this.messagesSubscription = this.messagesService
      .getLastMessage$(this.chatId)
      .subscribe((message) => {
        this.onReceiveMessage(message);
      });
  }

  private onReceiveMessage(message: Message) {
    this.messages.push(message);
    this.changeDetector.detectChanges();
  }
}
