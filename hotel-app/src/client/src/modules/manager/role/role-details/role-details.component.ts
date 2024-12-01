import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCancel, faRefresh, faSave, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-role-details',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule],
  templateUrl: './role-details.component.html',
  styleUrl: './role-details.component.css'
})
export class RoleDetailsComponent implements OnChanges {

  // form and api control
  public form!: FormGroup;
  public apiURL: string = 'http://localhost:8080/api/v1/roles';

  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
  @Output() response: EventEmitter<any> = new EventEmitter<any>();
  @Input('isEdit') isEdit: any;
  @Input('selectedItem') selectedItem: any;
  @Input('dataApi') dataApi: any;

  // resposne
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
      name: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      description: new FormControl('', Validators.maxLength(500)),
      isActive: new FormControl(true),
    });
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    this.validateForm();
    const data = this.form.value;
    if (this.isEdit) {
      this.http.put(`${this.apiURL}/${this.selectedItem.id}`, data).subscribe((result) => {
        if (result) {
          this.message = 'Update successfully';
        } else {
          this.message = 'Fail to update';
        }
        this.response.emit();
      });
    } else {
      this.http.post(this.apiURL, data).subscribe((result) => {
        if (result) {
          this.message = 'Create successfully';
        } else {
          this.message = 'Fail to create';
        }
        this.response.emit();
      });
    }
  }

  private validateForm(): void {
    if (this.dataApi.find((item: any) => item.name == this.form.value.name)) {
      this.message = 'Name is already exist!';
    }
  }

  public onCancel(): void {
    this.cancel.emit();
  }

}
