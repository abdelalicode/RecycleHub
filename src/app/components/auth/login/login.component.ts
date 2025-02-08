import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthenticateRequest } from '../../../models/authenticate-request';
import { AuthserviceService } from '../../../services/authservice.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {


  authRequest: AuthenticateRequest = {email: '', password: ''};
  errorMsg : Array<string> = [];

  constructor(private router: Router ,
     private authService: AuthserviceService,
    ) {

  }


  login () {
    
    if (!this.authRequest.email) {
      this.errorMsg.push('Email, ');
    }
    if (!this.authRequest.password) {
      this.errorMsg.push('Password ');
    }

    if (this.errorMsg.length > 0) {
      this.errorMsg.push('is required')
      return;
    }

    this.authService.login(this.authRequest).subscribe({
      next: (res) => {
       console.log(res.user.uid);
       this.router.navigate(['']);
      },
      error: (err) => {
        this.errorMsg.push(err.code);
           
      }
    })
  }

  register() {
    this.router.navigate(['register'])
  }


  clearErrorMsg() {
    this.errorMsg = [];
  }

}
