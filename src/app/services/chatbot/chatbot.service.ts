import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatbotResponse } from '../../models/chatbot.response.model';
import { ChatbotRequest } from '../../models/chatbot.request.model';

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
  constructor(private httpClient: HttpClient) {}

  public getAnswer(content: string): Observable<ChatbotResponse> {
    const body: ChatbotRequest = {
      content,
    };

    return this.httpClient.post<ChatbotResponse>(
      'http://localhost:3000/chatbot/prompt',
      body
    );
  }
}
