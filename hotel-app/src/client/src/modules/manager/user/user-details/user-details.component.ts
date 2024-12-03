import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCancel, faRefresh, faSave, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule, CommonModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnChanges {

  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
  @Output() resetForm: EventEmitter<void> = new EventEmitter<void>();
  @Input('dataApi') dataApi: any;
  @Input('selectedItem') selectedItem: any;
  @Input('isEdit') isEdit: any;

  // api and form control
  public form!: FormGroup;
  public apiURL = 'http://localhost:8080/api/v1/users';


  // response
  public message: string = '';

  // icon
  public faCancel: IconDefinition = faCancel;
  public faRefresh: IconDefinition = faRefresh;
  public faSave: IconDefinition = faSave;

  constructor(private http: HttpClient) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.createForm();
    this.patchValue();
  }

  private patchValue(): void {
    if (this.isEdit) {
      this.form.patchValue(this.selectedItem);
    }
  }

  private createForm(): void {
    this.form = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      username: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      email: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', [Validators.minLength(10)]),
      password: new FormControl('', Validators.required),
      active: new FormControl(true),
    });
  }

  public onSubmit(): void {
    const data = this.form.value;
    if (this.isEdit) {
      this.http.put(`${this.apiURL}/${this.selectedItem.id}`, data).subscribe((result) => {
        if (result) {
          this.message = 'Update successfully!';
        } else {
          this.message = 'Fail to update!';
        }
        this.resetForm.emit();
      });
    } else {
      this.validateForm();
      this.http.post(this.apiURL, data).subscribe((result) => {
        if (result) {
          this.message = 'Create successfully!';
        } else {
          this.message = 'Fail to create!';
        }
        this.onReset();
      });
    }
  }

  private validateForm(): void {
    if (this.dataApi.find((item: any) => item.username == this.form.value.username)) {
      this.message = 'Username already exist!';
    } else if (this.dataApi.find((item: any) => item.email == this.form.value.email)) {
      this.message = 'Email already exist!';
    } else if (this.dataApi.find((item: any) => item.phoneNumber == this.form.value.phoneNumber)) {
      this.message = 'Phone number already exist!';
    }
  }

  private onReset(): void {
    this.resetForm.emit();
    this.form.reset();
  }

  // cancel from child
  public onCancel(): void {
    this.cancel.emit();
  }




}
