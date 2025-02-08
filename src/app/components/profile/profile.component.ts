import { Component, inject, OnInit, signal } from '@angular/core';
import { HeaderComponent } from "../../shared/components/header/header.component";
import { AuthserviceService } from '../../services/authservice.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserInfo } from '@angular/fire/auth';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styles: ``
})
export class ProfileComponent implements OnInit {


  

  authService = inject(AuthserviceService);
  theUserSignal = signal<UserInfo | null>(null);


  ngOnInit() {
    this.authService.getCurrentUser().then((userData) => {
      if (userData) {
        this.theUserSignal.set(userData);
        this.FormTS.patchValue({
          email: userData.email,
          city: userData.city,
          phone: userData.phone,
        });
      }
    }).catch((error) => {
      console.error('Error fetching user data:', error);
    });
  }
  


  FormTS = new FormGroup({
    email : new FormControl(this.authService.currentUserSignal()?.email),
    city: new FormControl(''),
    phone: new FormControl('')
  })


  handler() {
    const formValues = this.FormTS.value;
    this.authService.updateProfile(formValues);
    
  }

  



}
