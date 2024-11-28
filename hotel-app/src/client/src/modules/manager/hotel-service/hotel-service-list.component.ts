import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { HotelDetailsComponent } from './hotel-details/hotel-details.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-hotel-service-list',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, FormsModule, ReactiveFormsModule, HotelDetailsComponent],
  templateUrl: './hotel-service-list.component.html',
  styleUrl: './hotel-service-list.component.css'
})
export class HotelServiceListComponent implements OnInit {

  public isShowDetail: boolean = false;
  public faPlus = faPlus;
  public faSearch = faSearch;
  public searchForm!: FormGroup;

  constructor(private http: HttpClient) {

  }

  private apiURL: string = 'https://localhost:8080/api/manager/order'

  ngOnInit(): void {
    this.createForm();
  }
  private createForm(): void {
    this.searchForm = new FormGroup({
      keyword: new FormControl('', Validators.required)
    });
  }

  public onSubmit(): void {
    console.log(this.searchForm.value);

  }

}
