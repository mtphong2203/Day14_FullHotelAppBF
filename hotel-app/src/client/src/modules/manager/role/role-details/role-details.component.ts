import { Component, EventEmitter, Inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCancel, faRefresh, faSave, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ROLE_SERVICE } from '../../../../constants/injection.constant';
import { IRoleService } from '../../../../services/role/role.interface';
import { MasterListDetailComponent } from '../../master-list-detail/master-list-detail.component';
import { RoleMasterDto } from '../../../../models/role/role-master.model';

@Component({
  selector: 'app-role-details',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule],
  templateUrl: './role-details.component.html',
  styleUrl: './role-details.component.css'
})
export class RoleDetailsComponent extends MasterListDetailComponent<RoleMasterDto> implements OnChanges {

  @Output() response: EventEmitter<any> = new EventEmitter<any>();

  constructor(@Inject(ROLE_SERVICE) private roleService: IRoleService) { super() }

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
      name: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      description: new FormControl('', Validators.maxLength(500)),
      active: new FormControl(true),
    });
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    const data = this.form.value;
    if (this.isEditMode && this.selectedItem) {
      this.roleService.update(this.selectedItem.id, data).subscribe((result: RoleMasterDto) => {
        if (result) {
          this.message = 'Update successfully';
        } else {
          this.message = 'Fail to update';
        }
        this.response.emit();
      });
    } else {
      this.roleService.create(data).subscribe((result: RoleMasterDto) => {
        if (result) {
          console.log(result);
          this.message = 'Create successfully';
        } else {
          this.message = 'Fail to create';
        }
        this.response.emit();
        this.form.reset();
      });
    }
  }

  public onCancel(): void {
    this.cancel.emit();
  }

}
