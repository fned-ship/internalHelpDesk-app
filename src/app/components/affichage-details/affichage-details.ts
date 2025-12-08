import { Component, input, output } from '@angular/core';
import { monTicket } from '../tickets/tickets';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-affichage-details',
  imports: [ReactiveFormsModule],
  templateUrl: './affichage-details.html',
  styleUrl: './affichage-details.css',
})
export class AffichageDetails {
  ticket=input<monTicket>();

  emetteur=output<string>();

  description=new FormControl<string>('',[Validators.required]);
  Valider(){
    
       this.emetteur.emit(this.description.value || "") ;
       this.description.setValue("");
    
      
  }

}
