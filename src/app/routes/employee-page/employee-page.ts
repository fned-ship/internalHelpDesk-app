import { Component } from '@angular/core';
import {EmpHeader} from './emp-header/emp-header';
import { Ticket } from './ticket/ticket';

@Component({
  selector: 'app-employee-page',
  imports: [EmpHeader, Ticket],
  templateUrl: './employee-page.html',
  styleUrl: './employee-page.css'
})
export class EmployeePage {

}
