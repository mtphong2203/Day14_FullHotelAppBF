import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faSearch, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { HotelDetailsComponent } from './hotel-details/hotel-details.component';
import { HttpClient } from '@angular/common/http';
import { TableComponent } from "../../../core/components/table/table.component";
import { IOrderService } from '../../../services/order/order.interface';
import { ORDER_SERVICE } from '../../../constants/injection.constant';
import { OrderMasterDto } from '../../../models/order/order-master-dto.model';
import { PageInfo, Response } from '../../../models/response.model';
import { Column } from '../../../models/common/column.model';
import { MasterListComponent } from '../master-list/master-list.component';

@Component({
  selector: 'app-hotel-service-list',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule, HotelDetailsComponent, TableComponent],
  templateUrl: './hotel-service-list.component.html',
  styleUrl: './hotel-service-list.component.css'
})
export class HotelServiceListComponent extends MasterListComponent<OrderMasterDto> implements OnInit {

  public columns: Column[] = [
    { name: 'name', title: 'Name' },
    { name: 'price', title: 'Price' },
    { name: 'active', title: 'Active' },
  ]

  constructor(
    @Inject(ORDER_SERVICE) private orderService: IOrderService,
  ) { super(); }

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
    this.orderService.search(params).subscribe((response: Response<OrderMasterDto>) => {
      this.dataApi = response.data;
      this.pageInfo = response.page;
    });
  }


  public onSubmit(): void {
    if (this.searchForm.invalid) {
      return;
    }
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
    this.orderService.delete(id).subscribe((result: boolean) => {
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

  public onChangeSize(item: any): void {
    this.currentPageSize = item.target.value;
    this.currentPage = 0;
    this.search();
  }

  public onChangePageNumber(pageNumber: number) {
    if (this.currentPage < 0 || this.currentPage >= this.pageInfo!.totalPages) {
      return;
    }
    this.currentPage = pageNumber;
    this.search();
  }

}
