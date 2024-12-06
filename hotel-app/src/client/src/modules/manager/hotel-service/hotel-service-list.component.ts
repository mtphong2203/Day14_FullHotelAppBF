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

@Component({
  selector: 'app-hotel-service-list',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule, HotelDetailsComponent, TableComponent],
  templateUrl: './hotel-service-list.component.html',
  styleUrl: './hotel-service-list.component.css'
})
export class HotelServiceListComponent implements OnInit {

  public selectedItem: any;
  public isEditMode: boolean = false;

  public currentPage: number = 0;
  public currentPageSize: number = 10;
  public pageInfo: any;

  public faPlus = faPlus;
  public faSearch = faSearch;
  public faEdit = faEdit;
  public faTrash = faTrash;

  public isShowDetail: boolean = false;
  public keyword: string = '';
  public searchForm!: FormGroup;
  public dataApi: any[] = [];

  public columns: any[] = [
    { name: 'name', title: 'Name' },
    { name: 'price', title: 'Price' },
    { name: 'active', title: 'Active' },
  ]

  public pageSizes: number[] = [2, 5, 10, 20, 30, 40, 50];

  constructor(
    @Inject(ORDER_SERVICE) private orderService: IOrderService,
  ) { }

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
    const params = {
      keyword: this.searchForm.value.keyword,
      page: this.currentPage,
      size: this.currentPageSize
    }
    this.orderService.search(params).subscribe((data: any) => {
      this.dataApi = data._embedded.orderMasterDTOList;
      this.pageInfo = data.page;
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

  public onDelete(id: any): void {
    this.orderService.delete(id).subscribe((result: any) => {
      if (result) {
        console.log("Delete success");
      } else {
        console.log("Fail to delete");
      }
      this.search();
    })
  }

  public onEdit(id: any): void {
    this.isEditMode = true;
    this.selectedItem = this.dataApi.find((data) => data.id === id);
    this.isShowDetail = true;
  }

  public onChangeSize(item: any): void {
    this.currentPageSize = item.target.value;
    this.currentPage = 0;
    this.search();
  }

  public onChangePageNumber(pageNumber: any) {
    if (this.currentPage < 0 || this.currentPage >= this.pageInfo?.totalPages) {
      return;
    }
    this.currentPage = pageNumber;
    this.search();
  }

}
