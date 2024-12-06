import { Component, OnInit } from '@angular/core';
import { UserDetailsComponent } from "./user-details/user-details.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faSearch, faEdit, faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import { TableComponent } from "../../../core/components/table/table.component";
@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, UserDetailsComponent, ReactiveFormsModule, FontAwesomeModule, TableComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {

  public selectedItem: any;

  // form and api control
  public searchForm!: FormGroup;
  public apiURL: string = 'http://localhost:8080/api/v1/users/search';
  public dataApi: any[] = [];

  // response
  public response: string = '';

  // pagination
  public currentPage: number = 0;
  public currentPageSize: number = 5;
  public pageInfo: any;
  public pageSizes: number[] = [5, 10, 15, 20, 30];

  public columns: any[] = [
    { name: 'firstName', title: 'FirstName' },
    { name: 'lastName', title: 'lastName' },
    { name: 'username', title: 'Username' },
    { name: 'phoneNumber', title: 'Phone' },
    { name: 'email', title: 'Email' },
    { name: 'active', title: 'Active' },
  ]

  // boolean
  public isShow: boolean = false;
  public isEdit: boolean = false;

  // icon
  public faPlus: IconDefinition = faPlus;
  public faSearch: IconDefinition = faSearch;
  public faEdit: IconDefinition = faEdit;
  public faTrash: IconDefinition = faTrash;

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
    this.apiURL = `http://localhost:8080/api/v1/users/search?keyword=${this.searchForm.value.keyword}&page=${this.currentPage}&size=${this.currentPageSize}`;
    this.http.get(this.apiURL).subscribe((data: any) => {
      this.dataApi = data._embedded.userMasterDTOList;
      this.pageInfo = data.page;
    });
  }

  public onSubmit(): void {
    this.search();
  }

  // create show details
  public onCreate(): void {
    this.isShow = true;
    this.isEdit = false;
  }
  // edit show details
  public onEdit(id: any): void {
    this.isShow = true;
    this.isEdit = true;
    this.selectedItem = this.dataApi.find((item: any) => item.id === id);
  }

  // delete object
  public onDelete(id: any): void {
    this.http.delete(`http://localhost:8080/api/v1/users/${id}`).subscribe((result) => {
      if (result) {
        this.response = 'Delete Successfully!';
      } else {
        this.response = 'Fail to delete!';
      }
      this.search();
    })

  }

  // hidden details
  public onCancelDetail(): void {
    this.isShow = false;
  }

  // research table
  public onResearch(): void {
    this.search();
  }

  // pagination
  public onChangeSize(item: any): void {
    this.currentPageSize = item.target.value;
    this.currentPage = 0;
    this.search();
  }

  public onChangePageNumber(pageNumber: any): void {
    if (this.currentPage < 0 || this.currentPage - 1 >= this.pageInfo?.totalPages) {
      return;
    }
    this.currentPage = pageNumber;
    this.search();
  }

}
