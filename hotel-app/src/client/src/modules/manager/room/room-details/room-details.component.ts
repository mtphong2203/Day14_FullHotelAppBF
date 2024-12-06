import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCancel, faRefresh, faSave, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ROOM_SERVICE } from '../../../../constants/injection.constant';
import { IRoomService } from '../../../../services/room/room.interface';
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
  @Input('dataApi') dataApi: any;

  // form control and api
  public form!: FormGroup;

  //response
  public message: string = '';

  public roomType: any[] = [
    { id: "Standard", name: 'Standard' },
    { id: 'Deluxe', name: 'Deluxe' },
    { id: 'Suite', name: 'Suite' },
  ];

  // icon
  public faCancel: IconDefinition = faCancel;
  public faRefresh: IconDefinition = faRefresh;
  public faSave: IconDefinition = faSave;

  constructor(@Inject(ROOM_SERVICE) private roomService: IRoomService) { }
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
      active: new FormControl(true),
    });
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    const data = this.form.value;
    if (this.isEdit) {
      this.roomService.update(this.editSelectItem.id, data).subscribe((result: any) => {
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
      });
    }
  }

  private onReset(): void {
    this.reSearch.emit();
    this.form.reset();
  }

  public onCancel(): void {
    this.cancel.emit();
  }


}
