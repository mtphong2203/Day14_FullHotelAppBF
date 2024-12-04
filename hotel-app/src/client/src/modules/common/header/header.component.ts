import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronCircleUp, faChevronCircleDown, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  public brandHome: string = './assets/images/brand-home.png';

  public faDown: IconDefinition = faChevronCircleDown;
  public faUp: IconDefinition = faChevronCircleUp;

  public isHovered: boolean = false;
  public onHover(status: boolean): void {
    this.isHovered = status;
  }

}
