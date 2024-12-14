import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faSearch, faEdit, faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { BookingDetailsComponent } from "./booking-details/booking-details.component";
import { RoomType } from '../../../models/common/room-type.model';
import { BOOKING_SERVICE } from '../../../constants/injection.constant';
import { IBookingService } from '../../../services/booking/booking.interface';
import { MasterListComponent } from '../master-list/master-list.component';
import { BookingMasterDto } from '../../../models/booking/booking-master-dto.model';
import { Column } from '../../../models/common/column.model';
import { TableComponent } from "../../../core/components/table/table.component";
import { Response } from '../../../models/response.model';

@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, CommonModule, BookingDetailsComponent, TableComponent],
  templateUrl: './booking-list.component.html',
  styleUrl: './booking-list.component.css'
})
export class BookingListComponent extends MasterListComponent<BookingMasterDto> implements OnInit {


  public bookingType: RoomType[] = [
    { id: 'PENDING', name: 'PENDING' },
    { id: 'CONFIRMED', name: 'CONFIRMED' },
    { id: 'CANCELLED', name: 'CANCELLED' },
    { id: 'COMPLETED', name: 'COMPLETED' },
  ]

  public columns: Column[] = [
    { name: 'bookingDate', title: 'Booking' },
    { name: 'checkInDate', title: 'CheckIn' },
    { name: 'checkOutDate', title: 'CheckOut' },
    { name: 'status', title: 'status' },
  ]

  // response
  public response: string = '';

  constructor(@Inject(BOOKING_SERVICE) private bookingService: IBookingService) { super() }

  ngOnInit(): void {
    this.createForm();
    this.getAll();
  }

  override createForm(): void {
    this.searchForm = new FormGroup({
      status: new FormControl('', Validators.required),
    });
  }

  private getAll(): void {
    this.bookingService.getAll().subscribe((data: BookingMasterDto[]) => {
      this.dataApi = data;
    });
  }

  private search(): void {
    const params: any = {
      status: this.searchForm.value.status
    }
    this.bookingService.search(params).subscribe((data: any) => {
      this.dataApi = data;
    });
  }

  // form search submit
  public onSubmit(): void {
    this.search();
  }

  // create to show form details
  public onCreate(): void {
    this.isShowDetail = true;
    this.isEditMode = false;
  }

  // edit to show form details
  public onEdit(id: string): void {
    this.isShowDetail = true;
    this.isEditMode = true;
    this.selectedItem = this.dataApi.find((item) => item.id === id);
  }

  // delete object
  public onDelete(id: string): void {
    this.bookingService.delete(id).subscribe((result: boolean) => {
      if (result) {
        this.response = 'Delete success!';
      } else {
        this.response = 'Fail to delete!';
      }
      this.getAll();
    });

  }

  public onCancelDetail(): void {
    this.isShowDetail = false;
  }

  public onResetForm(): void {
    this.getAll();
  }






}
