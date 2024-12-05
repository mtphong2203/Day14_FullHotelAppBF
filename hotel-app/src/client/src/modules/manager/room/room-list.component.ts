import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, IconDefinition, faPlus } from '@fortawesome/free-solid-svg-icons';
import { RoomDetailsComponent } from "./room-details/room-details.component";
import { TableComponent } from "../../../core/components/table/table.component";
@Component({
  selector: 'app-room-list',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule, CommonModule, RoomDetailsComponent, TableComponent],
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.css'
})
export class RoomListComponent implements OnInit {

  // form control and api
  public searchForm!: FormGroup;
  public apiURL = 'http://localhost:8080/api/v1/rooms/search';
  public dataApi: any;

  public currentPage: number = 0;
  public currentPageSize: number = 10;
  public totalPages: number = 0;
  public totalElements: number = 0;
  public pageSize: number = 0;
  public pageNumber: number = 0;


  // boolean
  public isShow: boolean = false;
  public isEdit: boolean = false;

  public pageSizes: number[] = [10, 20, 30, 40, 50];

  public columns: any[] = [
    { name: 'number', title: 'Number' },
    { name: 'type', title: 'Type' },
    { name: 'capacity', title: 'Capacity' },
    { name: 'price', title: 'Price' },
    { name: 'active', title: 'Active' },
  ]

  // edit object
  public editSelect: any;

  // icon
  public faSearch: IconDefinition = faSearch;
  public faPlus: IconDefinition = faPlus;



  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.createForm();
    this.search();
  }

  private createForm(): void {
    this.searchForm = new FormGroup({
      keyword: new FormControl('', Validators.required),
    });
  }

  private search(): void {
    this.apiURL = `http://localhost:8080/api/v1/rooms/search?page=${this.currentPage}&size=${this.currentPageSize}`;
    this.http.get(this.apiURL).subscribe((data: any) => {
      this.dataApi = data._embedded.roomMasterDTOList;
      this.totalPages = data.page.totalPages;
      this.totalElements = data.page.totalElements;
      this.pageSize = data.page.size;
      this.pageNumber = data.page.number;
    });
  }

  public onSubmit(): void {
    if (this.searchForm.invalid) {
      return;
    }
    this.apiURL = `http://localhost:8080/api/v1/rooms/search?keyword=${this.searchForm.value.keyword}`;
    this.search();
  }

  public onCreate(): void {
    this.isShow = true;
    this.isEdit = false;
  }

  public onCancel(): void {
    this.isShow = false;
  }

  public reSearch(): void {
    this.search();
  }

  public onEdit(id: any): void {
    this.isShow = true;
    this.editSelect = this.dataApi.find((item: any) => item.id === id);
    this.isEdit = true;
  }

  public onDelete(id: any): void {
    this.apiURL = `http://localhost:8080/api/v1/rooms`;
    this.http.delete(`${this.apiURL}/${id}`).subscribe((result: any) => {
      if (result) {
        console.log('Deleted Success');
      } else {
        console.log('Fail to delete');
      }
      this.search();
    });
  }

  // pagination
  // change size
  public onChangeSize(event: any): void {
    this.currentPageSize = event.target.value;
    this.search();
  }

  public onChangePageNumber(pageNumber: any): void {
    if (this.currentPage < 0 || this.currentPage >= this.totalPages) {
      return;
    }
    this.currentPage = pageNumber;
    this.search();
  }

}
