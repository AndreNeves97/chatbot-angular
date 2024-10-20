import { Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ChatPageComponent } from './pages/main-page/chat-page/chat-page.component';

export const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [{ path: 'chats/:chatId', component: ChatPageComponent }],
  },
];
