import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  ViewChild,
} from '@angular/core';
import { MessagesService } from '../../../services/messages/messages.service';
import { Subscription } from 'rxjs';
import { Message } from '../../../models/message.model';
import { ChatsService } from '../../../services/chat/chats.service';
import { ChatInputComponent } from './components/chat-input/chat-input.component';
import { ChatMessageComponent } from './components/chat-message/chat-message.component';

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [ChatInputComponent, ChatMessageComponent],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.scss',
})
export class ChatPageComponent implements OnChanges, AfterViewChecked {
  @Input()
  chatId: string = '';

  @ViewChild('messageList', { static: true })
  messageListElement!: ElementRef;

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

  ngAfterViewChecked(): void {
    this.scrollMessageList(false);
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

    this.scrollMessageList(false);
    setTimeout(() => {}, 100);
  }

  private scrollMessageList(smooth: boolean) {
    const nativeElement = this.messageListElement.nativeElement;

    const height = nativeElement.scrollHeight;

    nativeElement.scrollTo({
      top: height,
      behavior: smooth ? 'smooth' : 'instant',
    });
  }
}
