import { Component, Inject, inject, OnInit } from '@angular/core';
import { UserDetailsComponent } from "./user-details/user-details.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faSearch, faEdit, faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { TableComponent } from "../../../core/components/table/table.component";
import { USER_SERVICE } from '../../../constants/injection.constant';
import { IUserService } from '../../../services/user/user.interface';
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

  constructor(@Inject(USER_SERVICE) private userService: IUserService) { }

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
    this.userService.search(params).subscribe((data: any) => {
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
    this.userService.delete(id).subscribe((result) => {
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
