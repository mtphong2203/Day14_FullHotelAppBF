import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCancel, faRefresh, faSave, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ROOM_SERVICE } from '../../../../constants/injection.constant';
import { IRoomService } from '../../../../services/room/room.interface';
import { MasterListDetailComponent } from '../../master-list-detail/master-list-detail.component';
import { RoomMasterDto } from '../../../../models/room/room-master-dto.model';
import { RoomType } from '../../../../models/common/room-type.model';
@Component({
  selector: 'app-room-details',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule, CommonModule],
  templateUrl: './room-details.component.html',
  styleUrl: './room-details.component.css'
})
export class RoomDetailsComponent extends MasterListDetailComponent<RoomMasterDto> implements OnChanges {

  @Output() reSearch: EventEmitter<void> = new EventEmitter<void>();

  public roomType: RoomType[] = [
    { id: "Standard", name: 'Standard' },
    { id: 'Deluxe', name: 'Deluxe' },
    { id: 'Suite', name: 'Suite' },
  ];

  constructor(@Inject(ROOM_SERVICE) private roomService: IRoomService) { super() }
  ngOnChanges(changes: SimpleChanges): void {
    this.createForm();
    this.patchData();
  }

  private patchData(): void {
    if (this.isEditMode && this.selectedItem) {
      this.form.patchValue(this.selectedItem);
    }
  }

  private createForm(): void {
    this.form = new FormGroup({
      number: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      type: new FormControl(null, Validators.required),
      capacity: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      active: new FormControl(true),
    });
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    const data = this.form.value;
    if (this.isEditMode && this.selectedItem) {
      this.roomService.update(this.selectedItem.id, data).subscribe((result: any) => {
        if (result) {
          this.message = 'Update success!';
        } else {
          this.message = 'Fail to update!';
        }
        this.onReset();
      });
    } else {
      this.roomService.create(data).subscribe((result: any) => {
        if (result) {
          this.message = 'Create success!';
        } else {
          this.message = 'Fail to create!';
        }
        this.onReset();
        this.form.reset();
      });
    }
  }

  private onReset(): void {
    this.reSearch.emit();
  }

  public onCancel(): void {
    this.cancel.emit();
  }


}
