import { Component } from '@angular/core';
import {EmpHeader} from './emp-header/emp-header';
import { Ticket } from './ticket/ticket';
import { AuthService } from '../../cookies/auth.service';

@Component({
  selector: 'app-employee-page',
  imports: [EmpHeader, Ticket],
  templateUrl: './employee-page.html',
  styleUrl: './employee-page.css'
})
export class EmployeePage {
  constructor(private authService: AuthService){}
    
  
   ngOnInit(): void {
     this.authService.checkAndRedirect("employee");
   }
}
