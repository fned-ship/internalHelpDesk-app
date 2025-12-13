import {  Routes } from '@angular/router';

import { Signup } from './routes/signup/signup';
import { Login} from './routes/login/login';
import { ResetPassword } from './routes/reset-password/reset-password';
import { NewPassword } from './routes/new-password/new-password';
import { Active } from './routes/active/active';
import { Admin } from './routes/admin/admin';
import { Chef } from './routes/chef/chef';
import { Employee } from './routes/employee/employee';
import { AdminTickets } from './routes/admin-tickets/admin-tickets';

export const routes: Routes = [
  { path: 'signup', component: Signup },
  { path: 'login', component: Login },
  { path: 'resetpassword', component: ResetPassword },
  { path: 'newpassword', component: NewPassword },
  { path: 'active/:securitycode', component: Active },
  {path: 'admin', component: Admin },
  {path: 'employee', component: Employee },
  {path: 'manager', component: Chef },
  { path: '**', redirectTo: '/login' } // default/fallback route
];

