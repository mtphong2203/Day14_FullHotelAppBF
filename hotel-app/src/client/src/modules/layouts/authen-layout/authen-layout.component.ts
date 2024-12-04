import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-authen-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './authen-layout.component.html',
  styleUrl: './authen-layout.component.css'
})
export class AuthenLayoutComponent {

  public bgAuth: string = './assets/images/login.jpg';
}
