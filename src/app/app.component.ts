import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthserviceService } from './services/authservice.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent implements OnInit {
  
  authService = inject(AuthserviceService);

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      if(user) {
        this.authService.currentUserSignal.set({
          id: user.uid,
          email: user.email!,
          name: user.displayName!
        })
        localStorage.setItem('user', JSON.stringify(user));
      }
      else {
        this.authService.currentUserSignal.set(null);
      }

      // console.log(this.authService.currentUserSignal());
      
    })
  }
  
}
