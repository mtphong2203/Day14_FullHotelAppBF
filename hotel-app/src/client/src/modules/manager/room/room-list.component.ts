import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, IconDefinition, faPlus } from '@fortawesome/free-solid-svg-icons';
import { RoomDetailsComponent } from "./room-details/room-details.component";
import { TableComponent } from "../../../core/components/table/table.component";
import { ROOM_SERVICE } from '../../../constants/injection.constant';
import { IRoomService } from '../../../services/room/room.interface';
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
  public dataApi: any;

  public currentPage: number = 0;
  public currentPageSize: number = 10;
  public pageInfo: any;


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



  constructor(@Inject(ROOM_SERVICE) private roomService: IRoomService) { }
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
      size: this.currentPageSize,
    }
    this.roomService.search(params).subscribe((response: any) => {
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
    this.roomService.delete(id).subscribe((result: any) => {
      if (result) {
        console.log('Deleted Success');
        this.search();
      } else {
        console.log('Fail to delete');
      }
    });
  }

  // pagination
  // change size
  public onChangeSize(event: any): void {
    this.currentPageSize = event.target.value;
    this.currentPage = 0;
    this.search();
  }

  public onChangePageNumber(pageNumber: any): void {
    if (this.currentPage < 0 || this.currentPage >= this.pageInfo?.totalPages) {
      return;
    }
    this.currentPage = pageNumber;
    this.search();
  }

}
