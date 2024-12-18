import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NewOrderComponent } from "./new-order/new-order.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, NewOrderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'practice-exam';
}
