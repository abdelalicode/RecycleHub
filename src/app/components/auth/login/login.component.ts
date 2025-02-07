import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthenticateRequest } from '../../../models/authenticate-request';

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
    //  private authService: AuthenticationControllerService,
    ) {

  }


  login () {
    this.errorMsg = [];
    // this.authService.authenticate({
    //   body: this.authRequest
    // }).subscribe({
    //   next: (res) => {
    //    console.log(res);
       
    //    this.router.navigate(['dashboard']);
    //   },
    //   error: (err) => {
    //     console.log(err.error);
    //     this.errorMsg.push(err.error.message);
           
    //   }
    // })
  }

  register() {
    this.router.navigate(['register'])
  }


  clearErrorMsg() {
    this.errorMsg = [];
  }

}
