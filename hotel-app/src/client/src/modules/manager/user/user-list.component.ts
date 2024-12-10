import { Component, Inject, inject, OnInit } from '@angular/core';
import { UserDetailsComponent } from "./user-details/user-details.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faSearch, faEdit, faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { TableComponent } from "../../../core/components/table/table.component";
import { USER_SERVICE } from '../../../constants/injection.constant';
import { IUserService } from '../../../services/user/user.interface';
import { MasterListComponent } from '../master-list/master-list.component';
import { UserMasterDto } from '../../../models/user/user-master-dto.model';
import { Column } from '../../../models/common/column.model';
import { Response } from '../../../models/response.model';
@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, UserDetailsComponent, ReactiveFormsModule, FontAwesomeModule, TableComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent extends MasterListComponent<UserMasterDto> implements OnInit {

  public columns: Column[] = [
    { name: 'firstName', title: 'FirstName' },
    { name: 'lastName', title: 'lastName' },
    { name: 'username', title: 'Username' },
    { name: 'phoneNumber', title: 'Phone' },
    { name: 'email', title: 'Email' },
    { name: 'active', title: 'Active' },
  ]

  public response: string = '';

  constructor(@Inject(USER_SERVICE) private userService: IUserService) {
    super();
  }

  ngOnInit(): void {
    this.createForm();
    this.search();
  }

  private search(): void {
    const params: any = {
      keyword: this.searchForm.value.keyword,
      page: this.currentPage,
      size: this.currentPageSize
    }
    this.userService.search(params).subscribe((response: Response<UserMasterDto>) => {
      this.dataApi = response.data;
      this.pageInfo = response.page;
    });
  }

  public onSubmit(): void {
    this.search();
  }

  // create show details
  public onCreate(): void {
    this.isShowDetail = true;
    this.isEditMode = false;
  }
  // edit show details
  public onEdit(id: string): void {
    this.isShowDetail = true;
    this.isEditMode = true;
    this.selectedItem = this.dataApi.find((item) => item.id === id);
  }

  // delete object
  public onDelete(id: string): void {
    this.userService.delete(id).subscribe((result: boolean) => {
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
    this.isShowDetail = false;
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
    if (this.currentPage < 0 || this.currentPage - 1 >= this.pageInfo!.totalPages) {
      return;
    }
    this.currentPage = pageNumber;
    this.search();
  }

}
