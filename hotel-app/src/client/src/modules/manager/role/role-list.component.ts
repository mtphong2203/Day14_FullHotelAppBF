import { Component, Inject, OnInit } from '@angular/core';
import { RoleDetailsComponent } from "./role-details/role-details.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faSearch, faEdit, faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { TableComponent } from "../../../core/components/table/table.component";
import { ROLE_SERVICE } from '../../../constants/injection.constant';
import { IRoleService } from '../../../services/role/role.interface';

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

  constructor(@Inject(ROLE_SERVICE) private roleService: IRoleService) { }

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
    const params = {
      keyword: this.searchForm.value.keyword,
      page: this.currentPage,
      size: this.currentPageSize
    }
    this.roleService.search(params).subscribe((data: any) => {
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
    this.roleService.delete(id).subscribe((result) => {
      if (result) {
        this.response = 'Delete successfully!';
        this.search();
      } else {
        this.response = 'Fail to delete';
      }
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
    if (this.currentPage < 0 || this.currentPage - 1 > this.pageInfo?.totalPages) {
      return;
    }
    this.currentPage = item;
    this.search();
  }

}
