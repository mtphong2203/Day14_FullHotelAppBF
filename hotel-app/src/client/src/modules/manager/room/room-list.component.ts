import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RoomDetailsComponent } from "./room-details/room-details.component";
import { TableComponent } from "../../../core/components/table/table.component";
import { ROOM_SERVICE } from '../../../constants/injection.constant';
import { IRoomService } from '../../../services/room/room.interface';
import { MasterListComponent } from '../master-list/master-list.component';
import { RoomMasterDto } from '../../../models/room/room-master-dto.model';
import { Response } from '../../../models/response.model';
import { Column } from '../../../models/common/column.model';
@Component({
  selector: 'app-room-list',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule, CommonModule, RoomDetailsComponent, TableComponent],
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.css'
})
export class RoomListComponent extends MasterListComponent<RoomMasterDto> implements OnInit {

  public columns: Column[] = [
    { name: 'number', title: 'Number' },
    { name: 'type', title: 'Type' },
    { name: 'capacity', title: 'Capacity' },
    { name: 'price', title: 'Price' },
    { name: 'active', title: 'Active' },
  ]

  constructor(@Inject(ROOM_SERVICE) private roomService: IRoomService) { super(); }
  ngOnInit(): void {
    this.createForm();
    this.search();
  }

  private search(): void {
    const params = {
      keyword: this.searchForm.value.keyword,
      page: this.currentPage,
      size: this.currentPageSize,
    }
    this.roomService.search(params).subscribe((response: Response<RoomMasterDto>) => {
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
    this.isShowDetail = true;
    this.isEditMode = false;
  }

  public onCancel(): void {
    this.isShowDetail = false;
  }

  public reSearch(): void {
    this.search();
  }

  public onEdit(id: string): void {
    this.isShowDetail = true;
    this.selectedItem = this.dataApi.find((item) => item.id === id);
    this.isEditMode = true;
  }

  public onDelete(id: string): void {
    this.roomService.delete(id).subscribe((result: boolean) => {
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

  public onChangePageNumber(pageNumber: number): void {
    if (this.currentPage < 0 || this.currentPage >= this.pageInfo!.totalPages) {
      return;
    }
    this.currentPage = pageNumber;
    this.search();
  }

}
