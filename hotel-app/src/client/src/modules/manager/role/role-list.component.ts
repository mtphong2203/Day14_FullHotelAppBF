import { Component, OnInit } from '@angular/core';
import { RoleDetailsComponent } from "./role-details/role-details.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faSearch, faEdit, faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import { TableComponent } from "../../../core/components/table/table.component";

@Component({
  selector: 'app-role-list',
  standalone: true,
  imports: [RoleDetailsComponent, ReactiveFormsModule, CommonModule, FontAwesomeModule, TableComponent],
  templateUrl: './role-list.component.html',
  styleUrl: './role-list.component.css'
})
export class RoleListComponent implements OnInit {

  // form and api control
  public searchForm!: FormGroup;
  public apiURL: string = 'http://localhost:8080/api/v1/roles/search';
  public dataApi: any[] = [];

  // pagination
  public pageSizes: number[] = [5, 10, 15, 20, 25, 30];
  public currentPage: number = 0;
  public currentPageSize: number = 5;
  public pageInfo: any;
  public start: number = 0;
  public end: number = 0;

  public columns: any[] = [
    { name: 'name', title: 'Name' },
    { name: 'description', title: 'Description' },
    { name: 'active', title: 'Active' },
  ]

  public selectedItem: any;
  public response: string = '';

  // boolean 
  public isEdit: boolean = false;
  public isShow: boolean = false;

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
    this.apiURL = `http://localhost:8080/api/v1/roles/search?keyword=${this.searchForm.value.keyword}&size=${this.currentPageSize}&page=${this.currentPage}`;
    this.http.get(this.apiURL).subscribe((data: any) => {
      this.dataApi = data._embedded.roleMasterDTOList;
      this.pageInfo = data.page;
    });
  }

  // for search
  public onSubmit(): void {
    if (this.searchForm.invalid) {
      return;
    }
    this.search();
  }

  // create
  public onCreate(): void {
    this.isShow = true;
    this.isEdit = false;
  }

  // edit
  public onEdit(id: any): void {
    this.isShow = true;
    this.isEdit = true;
    this.selectedItem = this.dataApi.find((item) => item.id === id);
  }

  // delete
  public onDelete(id: any): void {
    this.http.delete(`${this.apiURL}/${id}`).subscribe((result) => {
      if (result) {
        this.response = 'Delete successfully!';
      } else {
        this.response = 'Fail to delete';
      }
      this.search();
    });
  }

  // cancel form details
  public onCancelDetail(): void {
    this.isShow = false;
    this.search();
  }

  public onResponse(): void {
    this.search();
  }

  // pagination
  public onChangeSize(item: any): void {
    this.currentPageSize = item.target.value;
    this.currentPage = 0;
    this.search();
  }

  public onChangePageNumber(item: any): void {
    this.currentPage = item;
    this.search();
  }

}
