import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCancel, faRefresh, faSave, IconDefinition } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-hotel-details',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './hotel-details.component.html',
  styleUrl: './hotel-details.component.css'
})
export class HotelDetailsComponent implements OnChanges {
  @Input('selected-item') selectedItem: any;
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
  @Input('isEdit') isEditMode: any;
  @Input('dataApi') dataApi: any;

  private apiURL: string = 'http://localhost:8080/api/v1/orders';

  public message: string = '';

  constructor(private http: HttpClient) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.createForm();
    this.getPatchValue();
  }

  public form!: FormGroup;

  public faCancel: IconDefinition = faCancel;
  public faRefresh: IconDefinition = faRefresh;
  public faSave: IconDefinition = faSave;

  private getPatchValue(): any {
    if (this.isEditMode) {
      this.form.patchValue(this.selectedItem);
    }
  }

  private createForm(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
      price: new FormControl('', Validators.required),
      active: new FormControl(true),
    });
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.validateForm();
    const data = this.form.value;

    if (this.isEditMode) {
      this.http.put(`${this.apiURL}/${this.selectedItem.id}`, data).subscribe((result: any) => {
        if (result) {
          this.message = 'Update successfully!';
          this.cancel.emit();
        } else {
          this.message = 'Fail to update!';
        }
      });
    } else {
      this.http.post(this.apiURL, data).subscribe((result: any) => {
        console.log(data);
        if (result != null) {
          this.cancel.emit();
        }
      });
    }
  }

  private validateForm(): void {
    if (this.dataApi.find((item: any) => item.name == this.form.value.name)) {
      this.message = 'Name is already exist!';
    } else if (this.form.value.price < 0) {
      this.message = 'Price must greater than 0';
    }
  }

  public onCancel(): void {
    this.cancel.emit();
  }

}
