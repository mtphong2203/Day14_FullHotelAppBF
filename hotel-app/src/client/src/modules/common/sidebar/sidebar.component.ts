import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { faUser, faUserShield, faRestroom, faServer, faBook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  public faRoom = faRestroom;
  public faService = faServer;
  public faBooking = faBook;
  public faUser = faUser;
  public faRole = faUserShield;
}
