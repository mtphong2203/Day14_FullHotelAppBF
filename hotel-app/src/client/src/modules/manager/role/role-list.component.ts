import { Component, Inject, OnInit } from '@angular/core';
import { RoleDetailsComponent } from "./role-details/role-details.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faSearch, faEdit, faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { TableComponent } from "../../../core/components/table/table.component";
import { ROLE_SERVICE } from '../../../constants/injection.constant';
import { IRoleService } from '../../../services/role/role.interface';
import { MasterListComponent } from '../master-list/master-list.component';
import { RoleMasterDto } from '../../../models/role/role-master.model';
import { Response } from '../../../models/response.model';
import { Column } from '../../../models/common/column.model';

@Component({
  selector: 'app-role-list',
  standalone: true,
  imports: [RoleDetailsComponent, ReactiveFormsModule, CommonModule, FontAwesomeModule, TableComponent],
  templateUrl: './role-list.component.html',
  styleUrl: './role-list.component.css'
})
export class RoleListComponent extends MasterListComponent<RoleMasterDto> implements OnInit {

  public columns: Column[] = [
    { name: 'name', title: 'Name' },
    { name: 'description', title: 'Description' },
    { name: 'active', title: 'Active' },
  ]

  public response: string = '';

  constructor(@Inject(ROLE_SERVICE) private roleService: IRoleService) { super() }

  ngOnInit(): void {
    this.createForm();
    this.search();
  }

  private search(): void {
    const params = {
      keyword: this.searchForm.value.keyword,
      page: this.currentPage,
      size: this.currentPageSize
    }
    this.roleService.search(params).subscribe((response: Response<RoleMasterDto>) => {
      this.dataApi = response.data;
      this.pageInfo = response.page;
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
    this.isShowDetail = true;
    this.isEditMode = false;
  }

  // edit
  public onEdit(id: string): void {
    this.isShowDetail = true;
    this.isEditMode = true;
    this.selectedItem = this.dataApi.find((item) => item.id === id);
  }

  // delete
  public onDelete(id: string): void {
    this.roleService.delete(id).subscribe((result: boolean) => {
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
    this.isShowDetail = false;
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
    if (this.currentPage < 0 || this.currentPage - 1 > this.pageInfo!.totalPages) {
      return;
    }
    this.currentPage = item;
    this.search();
  }

}
