import { AuthserviceService } from './../../services/authservice.service';
import { user, UserInfo } from '@angular/fire/auth';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dash-header',
  standalone: true,
  imports: [],
  templateUrl: './dash-header.component.html',
  styles: ``
})
export class DashHeaderComponent implements OnInit {


  authservice: AuthserviceService = inject(AuthserviceService);
  router: Router = inject(Router);
  userCon = signal<UserInfo | null>(null);


  ngOnInit(): void {
    const storeuser = localStorage.getItem('user');
    if (storeuser) {
      this.userCon.set(JSON.parse(storeuser));
    } else {
      this.userCon.set(null);
    }
  }


  logout(): void {
    this.authservice.logout();
    this.router.navigate(['login']);

  }


}
