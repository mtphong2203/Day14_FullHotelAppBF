import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronCircleUp, faChevronCircleDown, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { AUTH_SERVICE } from '../../../constants/injection.constant';
import { IAuthService } from '../../../services/auth/auth.interface';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  public isAuthenticated: boolean = false;
  public userInformation: any;

  constructor(
    @Inject(AUTH_SERVICE) private authService: IAuthService,
    private router: Router
  ) {
    this.authService.isAuthenticated().subscribe((res) => {
      this.isAuthenticated = res;
    });

    // Lay thong tin user
    this.authService.getUserInformation().subscribe((res: any) => {
      this.userInformation = res;
    });
  }

  public brandHome: string = './assets/images/brand-home.png';

  public faDown: IconDefinition = faChevronCircleDown;
  public faUp: IconDefinition = faChevronCircleUp;

  public isHovered: boolean = false;
  public onHover(status: boolean): void {
    this.isHovered = status;
  }



  public logout(): void {
    this.authService.logout();
    this.isAuthenticated = false;
    this.router.navigate(['/']);
  }

}
