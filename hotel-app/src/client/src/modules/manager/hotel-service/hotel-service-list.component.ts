import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faSearch, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
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
  public dataApi: any[] = [];
  public faPlus = faPlus;
  public faSearch = faSearch;
  public faEdit = faEdit;
  public faTrash = faTrash;
  public keyword: string = '';
  public searchForm!: FormGroup;

  constructor(private http: HttpClient) {

  }

  private apiURL: string = 'http://localhost:8080/api/manager/order/search';

  ngOnInit(): void {
    this.createForm();
    console.log(this.keyword);

    this.search();
  }

  private search(): void {
    this.http.get(this.apiURL).subscribe((data: any) => {
      this.dataApi = data._embedded.orderDTOList;

    })
  }
  private createForm(): void {
    this.searchForm = new FormGroup({
      keyword: new FormControl('', Validators.required)
    });
  }

  public onSubmit(): void {
    this.apiURL = `http://localhost:8080/api/manager/order/search?keyword=${this.keyword}`;
    console.log(this.keyword);
    this.search();
  }

}
