import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-food-details',
  standalone: true,
  imports: [],
  templateUrl: './food-details.component.html',
  styleUrl: './food-details.component.css'
})
export class FoodDetailsComponent {

  @Input('foodItem') foodItem: any;

}
