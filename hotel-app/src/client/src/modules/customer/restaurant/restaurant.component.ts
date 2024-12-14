import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FoodDetailsComponent } from "./food-details/food-details.component";
import { CommonService } from '../../services/common.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-restaurant',
  standalone: true,
  imports: [RouterLink, FoodDetailsComponent, CommonModule],
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.css'
})
export class RestaurantComponent {

  public foods: any[] = [];
  public restaurantLogo: string = './assets/images/restaurant.jpg';

  constructor(private commonService: CommonService) {
    this.foods = this.commonService.getFood();
  }

}
