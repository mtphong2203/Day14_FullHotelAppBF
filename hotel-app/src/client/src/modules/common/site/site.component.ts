import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-site',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './site.component.html',
  styleUrl: './site.component.css'
})
export class SiteComponent {

  @Input('siteItem') siteItem: any = {};

}
