import {  Routes } from '@angular/router';

// Import components
import { Signup } from './routes/signup/signup';
import { Login} from './routes/login/login';
import { ResetPassword } from './routes/reset-password/reset-password';
import { NewPassword } from './routes/new-password/new-password';
import { Active } from './routes/active/active';
import { DocumentsComponent } from './components/docs/docs';
import { ChatBox } from './components/chat-box/chat-box';
import { AdminTickets } from './routes/admin-tickets/admin-tickets';

export const routes: Routes = [
  { path: 'signup', component: Signup },
  { path: 'login', component: Login },
  { path: 'resetpassword', component: ResetPassword },
  { path: 'newpassword', component: NewPassword },
  { path: 'active/:securitycode', component: Active },
  { path: 'docs', component: DocumentsComponent },
  { path: 'chat', component: ChatBox },
  { path: 'admintickets', component: AdminTickets },
  { path: '**', redirectTo: '/login' } // default/fallback route
];

