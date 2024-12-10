import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCancel, faRefresh, faSave, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { BOOKING_SERVICE } from '../../../../constants/injection.constant';
import { IBookingService } from '../../../../services/booking/booking.interface';
import { BookingMasterDto } from '../../../../models/booking/booking-master-dto.model';
import { MasterListDetailComponent } from '../../master-list-detail/master-list-detail.component';

@Component({
  selector: 'app-booking-details',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './booking-details.component.html',
  styleUrl: './booking-details.component.css'
})
export class BookingDetailsComponent extends MasterListDetailComponent<BookingMasterDto> implements OnChanges {
  @Output() resetForm: EventEmitter<void> = new EventEmitter<void>();

  constructor(@Inject(BOOKING_SERVICE) private bookingService: IBookingService) { super() }

  ngOnChanges(changes: SimpleChanges): void {
    this.createForm();
    this.patchValueEdit();
    this.setDefaultValue();
  }

  private patchValueEdit(): void {
    if (this.isEditMode && this.selectedItem) {
      this.form.patchValue(this.selectedItem);
    }
  }

  private createForm(): void {
    this.form = new FormGroup({
      checkInDate: new FormControl(null, Validators.required),
      checkOutDate: new FormControl(null, Validators.required),
      status: new FormControl(null, Validators.required),
      isActive: new FormControl(true),
    });
  }

  private setDefaultValue(): void {
    if (!this.isEditMode) {
      const defaultValue = '2024-12-01T02:23:33.618Z';
      this.form.patchValue({
        checkInDate: defaultValue,
        checkOutDate: defaultValue,
      });
    }
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    const data = this.form.value;
    if (this.isEditMode && this.selectedItem) {
      this.bookingService.update(this.selectedItem.id, data).subscribe((result: BookingMasterDto) => {
        if (result) {
          this.message = 'Updated success!';
        } else {
          this.message = 'Fail to update!';
        }
        this.resetForm.emit();
      })
    } else {
      this.bookingService.create(data).subscribe((result: BookingMasterDto) => {
        if (result) {
          this.message = 'Create success!';
        } else {
          this.message = 'Fail to create!';
        }
        this.resetForm.emit();
      });
    }
  }

  public onCancel(): void {
    this.cancel.emit();
  }

}
