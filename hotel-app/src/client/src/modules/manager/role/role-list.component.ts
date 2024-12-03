import { Component, OnInit } from '@angular/core';
import { RoleDetailsComponent } from "./role-details/role-details.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faSearch, faEdit, faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-role-list',
  standalone: true,
  imports: [RoleDetailsComponent, ReactiveFormsModule, CommonModule, FontAwesomeModule],
  templateUrl: './role-list.component.html',
  styleUrl: './role-list.component.css'
})
export class RoleListComponent implements OnInit {

  // form and api control
  public searchForm!: FormGroup;
  public apiURL: string = 'http://localhost:8080/api/v1/roles';
  public dataApi: any[] = [];

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
    this.http.get(this.apiURL).subscribe((data: any) => {
      this.dataApi = data;
    })
  }

  // for search
  public onSubmit(): void {
    this.apiURL = `http://localhost:8080/api/v1/roles/searchByName?keyword=${this.searchForm.value.keyword}`;
    this.search();
  }

  // create
  public onCreate(): void {
    this.isShow = true;
    this.isEdit = false;
  }

  // edit
  public onEdit(id: string): void {
    this.isShow = true;
    this.isEdit = true;
    this.selectedItem = this.dataApi.find((item) => item.id === id);
  }

  // delete
  public onDelete(id: string): void {
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
}
