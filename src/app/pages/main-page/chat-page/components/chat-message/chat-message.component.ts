import { Component, Input } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { Message } from '../../../../../models/message.model';

@Component({
  selector: 'app-chat-message',
  standalone: true,
  imports: [MarkdownModule],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.scss',
})
export class ChatMessageComponent {
  @Input({ required: true })
  message!: Message;
}
