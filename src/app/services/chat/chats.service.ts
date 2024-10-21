import { Injectable } from '@angular/core';
import { Chat } from '../../models/chat.model';
import { BehaviorSubject, filter, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  private activeChatSubject$ = new BehaviorSubject<Chat | undefined>(undefined);

  private chats: Chat[] = [
    { name: 'Chat 1', id: 'chat-1' },
    { name: 'Chat 2', id: 'chat-2' },
    { name: 'Chat 3', id: 'chat-3' },
  ];

  constructor() {}

  public getChats(): Chat[] {
    return this.chats;
  }

  public setActiveChat(chatId: string) {
    const chat = this.chats.find((chat) => chat.id === chatId);

    if (chat) {
      this.activeChatSubject$.next(chat);
    }
  }

  public getActiveChat(): Chat | undefined {
    return this.activeChatSubject$.value;
  }

  public getActiveChat$(): Observable<Chat> {
    return this.activeChatSubject$.pipe(filter((value) => !!value));
  }
}
