import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCancel, faRefresh, faSave, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { USER_SERVICE } from '../../../../constants/injection.constant';
import { IUserService } from '../../../../services/user/user.interface';
import { MasterListDetailComponent } from '../../master-list-detail/master-list-detail.component';
import { UserMasterDto } from '../../../../models/user/user-master-dto.model';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule, CommonModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent extends MasterListDetailComponent<UserMasterDto> implements OnChanges {

  @Output() resetForm: EventEmitter<void> = new EventEmitter<void>();

  constructor(@Inject(USER_SERVICE) private userService: IUserService) { super() }

  ngOnChanges(changes: SimpleChanges): void {
    this.createForm();
    this.patchValue();
  }

  private patchValue(): void {
    if (this.isEditMode && this.selectedItem) {
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
    if (this.isEditMode && this.selectedItem) {
      this.userService.update(this.selectedItem.id, data).subscribe((result: UserMasterDto) => {
        if (result) {
          this.message = 'Update successfully!';
        } else {
          this.message = 'Fail to update!';
        }
        this.resetForm.emit();
      });
    } else {
      this.userService.create(data).subscribe((result: UserMasterDto) => {
        if (result) {
          this.message = 'Create successfully!';
        } else {
          this.message = 'Fail to create!';
        }
        this.onReset();
      });
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
