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

  scrollAfterOnChanges: boolean = false;

  constructor(
    private chatsService: ChatsService,
    private messagesService: MessagesService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnChanges(): void {
    this.chatsService.setActiveChat(this.chatId);

    this.messages = this.messagesService.getMessages(this.chatId);

    this.listenToReceivedMessages();
    this.scrollAfterOnChanges = true;
  }

  ngAfterViewChecked(): void {
    if (!this.scrollAfterOnChanges) {
      return;
    }

    this.scrollMessageList(false);
    setTimeout(() => {
      this.scrollMessageList(false);
    });

    this.scrollAfterOnChanges = false;
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

    const smoothScroll = message.received && message.content.length > 150;

    setTimeout(() => {
      this.scrollMessageList(smoothScroll);
    });
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
