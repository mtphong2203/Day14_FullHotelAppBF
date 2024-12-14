import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RoomMasterDto } from '../../../models/room/room-master-dto.model';
import { IconDefinition } from '@fortawesome/angular-fontawesome';
import { faCancel, faRefresh, faSave } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-master-list-detail',
  standalone: true,
  imports: [],
  templateUrl: './master-list-detail.component.html',
  styleUrl: './master-list-detail.component.css'
})
export class MasterListDetailComponent<T> {
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
  @Input('selected-item') selectedItem: T | null | undefined = null;
  @Input('isEdit') isEditMode: boolean = false;

  // form control and api
  public form!: FormGroup;

  //response
  public message: string = '';

  public faCancel: IconDefinition = faCancel;
  public faRefresh: IconDefinition = faRefresh;
  public faSave: IconDefinition = faSave;
}
