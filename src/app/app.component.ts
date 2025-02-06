import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ExampleComponent } from './components/example/example.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule, ExampleComponent],
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  title = 'RECYCLEHUB';
  
}
