import { v4 as uuidv4 } from 'uuid';

export class Message {
  id: string;
  chatId: string;
  content: string;
  received: boolean;

  constructor(chatId: string, content: string, received: boolean) {
    this.chatId = chatId;
    this.content = content;
    this.received = received;

    this.id = `${chatId}-${uuidv4()}`;
  }
}
