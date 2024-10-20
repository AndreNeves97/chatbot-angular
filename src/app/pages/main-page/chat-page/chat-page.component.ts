import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.scss',
})
export class ChatPageComponent implements OnChanges {
  @Input()
  chatId: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.chatId);
  }
}
