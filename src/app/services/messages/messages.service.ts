import { Injectable } from '@angular/core';
import { Message } from '../../models/message.model';
import { filter, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private lastMessageSubject$ = new Subject<Message>();
  private messages: { [key: string]: Message[] } = {};

  constructor() {
    console.log({ MessagesService: this });
  }

  private getMessagesOriginalList(chatId: string): Message[] {
    if (!this.messages[chatId]) {
      this.messages[chatId] = [];
    }

    return this.messages[chatId];
  }

  private addMessage(message: Message) {
    const messages = this.getMessagesOriginalList(message.chatId);
    messages.push(message);
  }

  public getMessages(chatId: string): Message[] {
    const messages = this.getMessagesOriginalList(chatId);
    return [...messages];
  }

  public getLastMessage(chatId: string): Message {
    const messages = this.getMessagesOriginalList(chatId);
    return messages[messages.length - 1];
  }

  private onNewMessage(message: Message) {
    this.addMessage(message);
    this.lastMessageSubject$.next(message);
  }

  public sendMessage(message: Message) {
    this.onNewMessage(message);

    // call api
  }

  public getLastMessage$(chatId: string): Observable<Message> {
    return this.lastMessageSubject$.pipe(
      filter((message) => message.chatId === chatId)
    );
  }
}
