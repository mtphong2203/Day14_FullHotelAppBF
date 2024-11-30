import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, IconDefinition, faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { RoomDetailsComponent } from "./room-details/room-details.component";
@Component({
  selector: 'app-room-list',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule, CommonModule, RoomDetailsComponent],
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.css'
})
export class RoomListComponent implements OnInit {

  // form control and api
  public searchForm!: FormGroup;
  public apiURL = 'http://localhost:8080/api/v1/rooms';
  public dataApi: any[] = [];

  // boolean
  public isShow: boolean = false;
  public isEdit: boolean = false;

  // edit object
  public editSelect: any;

  // icon
  public faSearch: IconDefinition = faSearch;
  public faPlus: IconDefinition = faPlus;
  public faEdit: IconDefinition = faEdit;
  public faTrash: IconDefinition = faTrash;

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.createForm();
    this.search();
  }

  private createForm(): void {
    this.searchForm = new FormGroup({
      keyword: new FormControl('', Validators.required),
    });
  }

  private search(): void {
    this.http.get(this.apiURL).subscribe((data: any) => {
      this.dataApi = data;
    });
  }

  public onSubmit(): void {
    if (this.searchForm.invalid) {
      return;
    }
    this.apiURL = `http://localhost:8080/api/v1/rooms/searchByNumber?keyword=${this.searchForm.value.keyword}`;
    this.search();
  }

  public onCreate(): void {
    this.isShow = true;
    this.isEdit = false;
  }

  public onCancel(): void {
    this.isShow = false;
  }

  public reSearch(): void {
    this.search();
  }

  public onEdit(id: string): void {
    this.isShow = true;
    this.editSelect = this.dataApi.find((item) => item.id === id);
    this.isEdit = true;
  }

  public onDelete(id: string): void {
    this.http.delete(`${this.apiURL}/${id}`).subscribe((result: any) => {
      if (result) {
        console.log('Deleted Success');
      } else {
        console.log('Fail to delete');
      }
      this.search();
    });
  }

}
