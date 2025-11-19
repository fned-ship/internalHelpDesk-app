import {  Routes } from '@angular/router';

// Import components
import { Signup } from './routes/signup/signup';
import { Login} from './routes/login/login';
import { ResetPassword } from './routes/reset-password/reset-password';
import { NewPassword } from './routes/new-password/new-password';
import { Active } from './routes/active/active';
import { ChatBox } from './components/chat-box/chat-box';

export const routes: Routes = [
  { path: 'signup', component: Signup },
  { path: 'login', component: Login },
  { path: 'resetpassword', component: ResetPassword },
  { path: 'newpassword', component: NewPassword },
  { path: 'active/:securitycode', component: Active },
  { path: 'chat', component: ChatBox },
  { path: '**', redirectTo: '/login' } // default/fallback route
];

