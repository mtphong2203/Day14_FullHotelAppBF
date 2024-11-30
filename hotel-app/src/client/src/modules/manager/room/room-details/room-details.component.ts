import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCancel, faRefresh, faSave, IconDefinition } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-room-details',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule, CommonModule],
  templateUrl: './room-details.component.html',
  styleUrl: './room-details.component.css'
})
export class RoomDetailsComponent implements OnChanges {

  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
  @Output() reSearch: EventEmitter<void> = new EventEmitter<void>();
  @Input('editSelectItem') editSelectItem: any;
  @Input('isEdit') isEdit: any;

  // form control and api
  public form!: FormGroup;
  public apiURL = 'http://localhost:8080/api/v1/rooms';

  //response
  public message: string = '';

  // boolean
  public resetForm: boolean = true;

  // icon
  public faCancel: IconDefinition = faCancel;
  public faRefresh: IconDefinition = faRefresh;
  public faSave: IconDefinition = faSave;

  constructor(private http: HttpClient) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.createForm();
    this.patchData();
  }

  private patchData(): void {
    if (this.isEdit) {
      this.form.patchValue(this.editSelectItem);
    }
  }

  private createForm(): void {
    this.form = new FormGroup({
      number: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      type: new FormControl(null, Validators.required),
      capacity: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      isActive: new FormControl(true),
    });
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const data = this.form.value;
    if (this.isEdit) {
      if (this.form.value.number == this.editSelectItem.number) {
        this.message = 'Number is can not unique';
      } else {
        this.http.put(`${this.apiURL}/${this.editSelectItem.id}`, data).subscribe((result: any) => {
          if (result) {
            this.message = 'Update success!';
          } else {
            this.message = 'Fail to update!';
          }
          this.onReset();
        });
      }
    } else {
      this.http.post(this.apiURL, data).subscribe((result: any) => {
        if (result) {
          this.message = 'Create success!';
        } else {
          this.message = 'Fail to create!';
        }
        this.onReset();
      });
    }
  }

  private onReset(): void {
    this.reSearch.emit();
    if (this.resetForm) {
      this.form.reset();
    }
  }

  public onCancel(): void {
    this.cancel.emit();
  }


}
