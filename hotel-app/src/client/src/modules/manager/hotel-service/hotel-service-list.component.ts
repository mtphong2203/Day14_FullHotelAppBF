import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faSearch, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { HotelDetailsComponent } from './hotel-details/hotel-details.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-hotel-service-list',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule, HotelDetailsComponent],
  templateUrl: './hotel-service-list.component.html',
  styleUrl: './hotel-service-list.component.css'
})
export class HotelServiceListComponent implements OnInit {

  public selectedItem: any;
  public isEditMode: boolean = false;

  public faPlus = faPlus;
  public faSearch = faSearch;
  public faEdit = faEdit;
  public faTrash = faTrash;

  public isShowDetail: boolean = false;
  public keyword: string = '';
  public searchForm!: FormGroup;
  public dataApi: any[] = [];
  private apiURL: string = 'http://localhost:8080/api/v1/orders';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.createForm();
    this.search();
  }

  private createForm(): void {
    this.searchForm = new FormGroup({
      keyword: new FormControl('', [Validators.required]),
    });
  }

  private search(): void {
    this.http.get(this.apiURL).subscribe((data: any) => {
      this.dataApi = data;
    });
  }


  public onSubmit(): void {
    if (this.searchForm.invalid) {
      return;
    }
    this.apiURL = `http://localhost:8080/api/v1/orders/searchByName?keyword=${this.searchForm.value.keyword}`;
    this.search();
  }

  public onCreate(): void {
    this.isEditMode = false;
    this.isShowDetail = true;
  }

  public onCancelDetail(): void {
    this.isShowDetail = false;
    this.search();
  }

  public onDelete(id: string): void {
    this.http.delete(`${this.apiURL}/${id}`).subscribe((result: any) => {
      if (result) {
        console.log("Delete success");
      } else {
        console.log("Fail to delete");
      }
      this.search();
    })
  }

  public onEdit(id: string): void {
    this.isEditMode = true;
    this.selectedItem = this.dataApi.find((data) => data.id === id);
    this.isShowDetail = true;
  }

}
