import { Component, inject, OnInit } from '@angular/core';
import { AuthserviceService } from '../../../services/authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent{


      authService = inject(AuthserviceService);
      router = inject(Router);

      logout() : void {
                this.authService.logout();
        this.router.navigate(['login']);

      }

      profile() {
        this.router.navigate(['profile']);
      }

      home() {
       this.router.navigate(['']);
      }

      
      


    
}
