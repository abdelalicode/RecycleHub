import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/components/header/header.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent {

}
