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
  @Input('pageInfo') pageInfo: any;

  public pageLimit: number = 2;

  @Output() edit: EventEmitter<string> = new EventEmitter<string>();
  @Output() delete: EventEmitter<string> = new EventEmitter<string>();
  @Output() changeSize: EventEmitter<number> = new EventEmitter<number>();
  @Output() changePageNumber: EventEmitter<number> = new EventEmitter<number>();

  public faEdit: IconDefinition = faEdit;
  public faTrash: IconDefinition = faTrash;
  public faAngleRight: IconDefinition = faAngleRight;
  public faAngleDoubleRight: IconDefinition = faAngleDoubleRight;
  public faAngleLeft: IconDefinition = faAngleLeft;
  public faAngleDoubleLeft: IconDefinition = faAngleDoubleLeft;

  public onEdit(item: string) {
    this.edit.emit(item);
  }

  public onDelete(item: string) {
    this.delete.emit(item);
  }

  public onChangeSize(item: any) {
    this.changeSize.emit(item);
  }

  // get total page
  public getPageList(): number[] {
    const start: number = Math.max(0, this.pageInfo?.number - this.pageLimit);
    const end: number = Math.min(this.pageInfo?.totalPages - 1, this.pageInfo?.number + this?.pageLimit);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  public onChangePageNumber(item: number) {
    this.changePageNumber.emit(item);
  }



}
