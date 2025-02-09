import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Auth } from '@angular/fire/auth';
import { RequestService } from '../../../services/request.service';
import { Request } from '../../../models/request.type';

@Component({
  selector: 'app-add-request',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-request.component.html',
  styles: ``
})
export class AddRequestComponent {

  authFirebaseService  = inject(Auth);
  requestService = inject(RequestService);

  
  wasteTypes = [
    { id: 'plastic', label: 'Plastic' },
    { id: 'paper', label: 'Paper' },
    { id: 'metal', label: 'Metal' },
    { id: 'organic', label: 'Organic' }
  ];

  selectedWasteTypes: string[] = [];
  dateControl = new FormControl('', [Validators.required]);
  timeControl = new FormControl('09:00', [Validators.required]);
  weightControl = new FormControl('', [Validators.required, Validators.min(1000)]);
  cityControl = new FormControl('', [Validators.required]);
  adressControl = new FormControl('', [Validators.required])
  isTimeInvalid = false;
  isWeightInvalid = false;

  onWasteTypeChange(label: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedWasteTypes.push(label);
    } else {
      this.selectedWasteTypes = this.selectedWasteTypes.filter(item => item !== label);
    }
  }

  onSubmit() {
    const selectedDate = this.dateControl.value;
    const selectedTime = this.timeControl.value;
    const selectedWeight = this.weightControl.value;
    const selectedCity = this.cityControl.value;
    const selectedAddress = this.adressControl.value;

    const weight = Number(selectedWeight);
    this.isWeightInvalid = isNaN(weight) || weight < 1000;

    if (selectedDate && selectedTime && !this.isWeightInvalid) {
      const dateTime = new Date(selectedDate + 'T' + selectedTime);

    
      const hours = dateTime.getHours();
      this.isTimeInvalid = hours < 9 || hours >= 18;

      if (this.isTimeInvalid) {
        return;
      }

      const userId = this.authFirebaseService.currentUser?.uid;

      console.log("Selected Waste Types:", this.selectedWasteTypes);
      console.log(selectedCity + ' ' + selectedAddress);
      
      console.log("Selected Date and Time:", dateTime);
      console.log("Estimated Weight:", weight);

      const request: Request = {
        userId: userId!,
        wasteType: this.selectedWasteTypes,
        weight: weight,
        address: selectedAddress!,
        city: selectedCity!,
        date: dateTime.toISOString(),
        status: 'Pending'
      };


      this.requestService.addRequest(request);
    }
  }
}