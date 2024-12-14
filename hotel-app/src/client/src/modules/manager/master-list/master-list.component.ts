import { Component, OnInit } from '@angular/core';
import { PageInfo } from '../../../models/response.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-master-list',
  standalone: true,
  imports: [],
  templateUrl: './master-list.component.html',
  styleUrl: './master-list.component.css'
})
export class MasterListComponent<T> {

  public selectedItem: T | null | undefined = null;
  public isEditMode: boolean = false;

  public currentPage: number = 0;
  public currentPageSize: number = 10;
  public pageInfo: PageInfo | null = null;

  public faPlus = faPlus;
  public faSearch = faSearch;

  public isShowDetail: boolean = false;
  public keyword: string = '';
  public searchForm!: FormGroup;
  public dataApi: T[] = [];

  public pageSizes: number[] = [5, 10, 15, 20];

  public createForm(): void {
    this.searchForm = new FormGroup({
      keyword: new FormControl('', [Validators.required]),
    });
  }




}
