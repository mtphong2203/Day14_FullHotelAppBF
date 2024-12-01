import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCancel, faRefresh, faSave, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-booking-details',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './booking-details.component.html',
  styleUrl: './booking-details.component.css'
})
export class BookingDetailsComponent implements OnChanges {
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
  @Output() resetForm: EventEmitter<void> = new EventEmitter<void>();
  @Input('selectedItem') selectedItem: any;
  @Input('isEdit') isEdit: any;

  // form and api control
  public form!: FormGroup;
  public apiURL: string = 'http://localhost:8080/api/v1/bookings';

  // response
  public message: string = '';

  // icon
  public faCancel: IconDefinition = faCancel;
  public faRefresh: IconDefinition = faRefresh;
  public faSave: IconDefinition = faSave;

  constructor(private http: HttpClient) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.createForm();
    this.patchValueEdit();
    this.setDefaultValue();
  }

  private patchValueEdit(): void {
    if (this.isEdit) {
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
    if (!this.isEdit) {
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
    if (this.isEdit) {
      this.http.put(`${this.apiURL}/${this.selectedItem.id}`, data).subscribe((result) => {
        if (result) {
          this.message = 'Updated success!';
        } else {
          this.message = 'Fail to update!';
        }
        this.resetForm.emit();
      })
    } else {
      this.http.post(this.apiURL, data).subscribe((result) => {
        if (result) {
          this.message = 'Create success!';
        } else {
          this.message = 'Fail to create!';
        }
        this.resetForm.emit();
      });
    }


  }
  // cancel to hidden form details
  public onCancel(): void {
    this.cancel.emit();
  }

}
