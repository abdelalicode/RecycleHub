import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterRequest } from '../../../models/register-request';
import { AuthserviceService } from '../../../services/authservice.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styles: ``
})
export class RegisterComponent {

    constructor(
         private router: Router ,
          private authService: AuthserviceService
        ) {}

  registerRequest: RegisterRequest = {email: '', firstName: '', lastName: '', password: '', role: ''}
  errorMsg: Array<string> = [];




  register() {

    console.log(this.registerRequest);

    if (!this.registerRequest.email) {
      this.errorMsg.push('Email, ');
    }
    if (!this.registerRequest.firstName) {
      this.errorMsg.push('First name, ');
    }
    if (!this.registerRequest.lastName) {
      this.errorMsg.push('Last name, ');
    }
    if (!this.registerRequest.password) {
      this.errorMsg.push('Password ');
    }

    if (this.errorMsg.length > 0) {
      this.errorMsg.push('is required')
      return;
    }
    
    
    this.authService.register(this.registerRequest).subscribe({
      next: (res) => {
       this.router.navigate(['login']);
      },
      error: (err) => {
        this.errorMsg.push(err.code);           
      }
    })
  }


  login() {
    this.router.navigate(['login'])
  }


  clearErrorMsg() {
    this.errorMsg = [];
  }

}
