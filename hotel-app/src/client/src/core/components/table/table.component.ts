import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faAngleDoubleLeft, faAngleDoubleRight, faAngleLeft, faAngleRight, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {

  @Input('data') data: any[] = [];
  @Input('columns') columns: any[] = [];
  @Input('pageSizes') pageSizes: number[] = [];
  @Input('currentPage') currentPage: any;
  @Input('totalPages') totalPages: any;
  @Input('pageNumber') pageNumber: any;
  @Input('pageSize') pageSize: any;
  @Input('totalElements') totalElements: any;

  public pageLimit: number = 2;

  @Output() edit: EventEmitter<void> = new EventEmitter<void>();
  @Output() delete: EventEmitter<void> = new EventEmitter<void>();
  @Output() changeSize: EventEmitter<void> = new EventEmitter<void>();
  @Output() changePageNumber: EventEmitter<void> = new EventEmitter<void>();

  public faEdit: IconDefinition = faEdit;
  public faTrash: IconDefinition = faTrash;
  public faAngleRight: IconDefinition = faAngleRight;
  public faAngleDoubleRight: IconDefinition = faAngleDoubleRight;
  public faAngleLeft: IconDefinition = faAngleLeft;
  public faAngleDoubleLeft: IconDefinition = faAngleDoubleLeft;

  public onEdit(item: any) {
    this.edit.emit(item);
  }

  public onDelete(item: any) {
    this.delete.emit(item);
  }

  public onChangeSize(item: any) {
    this.changeSize.emit(item);
  }

  // get total page
  public getPageList(): number[] {
    const start: number = Math.max(0, this.pageNumber - this.pageLimit);
    const end: number = Math.min(this.totalPages - 1, this.pageNumber + this.pageLimit);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  public onChangePageNumber(item: any) {
    this.changePageNumber.emit(item);
  }



}
