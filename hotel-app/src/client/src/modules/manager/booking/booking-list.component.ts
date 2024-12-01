import { Component, OnInit } from '@angular/core';
import { RoomDetailsComponent } from "../room/room-details/room-details.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faSearch, faEdit, faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BookingDetailsComponent } from "./booking-details/booking-details.component";

@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, CommonModule, BookingDetailsComponent],
  templateUrl: './booking-list.component.html',
  styleUrl: './booking-list.component.css'
})
export class BookingListComponent implements OnInit {


  // form and api control
  public searchForm!: FormGroup;
  public apiURL: string = 'http://localhost:8080/api/v1/bookings';
  public dataApi: any[] = [];

  // boolean
  public isShow: boolean = false;
  public isEdit: boolean = false;

  // response
  public response: string = '';

  // edit object
  public selectedItem: any;

  // icon
  public faPlus: IconDefinition = faPlus;
  public faSearch: IconDefinition = faSearch;
  public faEdit: IconDefinition = faEdit;
  public faTrash: IconDefinition = faTrash;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.createForm();
    this.search();
  }

  private createForm(): void {
    this.searchForm = new FormGroup({
      status: new FormControl(null, Validators.required),
    });
  }

  private search(): void {
    this.http.get(this.apiURL).subscribe((data: any) => {
      this.dataApi = data;
    })
  }

  // form search submit
  public onSubmit(): void {
    this.apiURL = `http://localhost:8080/api/v1/bookings/search?keyword=${this.searchForm.value.status}`;
    this.search();
  }

  // create to show form details
  public onCreate(): void {
    this.isShow = true;
    this.isEdit = false;
  }

  // edit to show form details
  public onEdit(id: string): void {
    this.isShow = true;
    this.isEdit = true;
    this.selectedItem = this.dataApi.find((item) => item.id === id);
  }

  // delete object
  public onDelete(id: string): void {
    this.http.delete(`${this.apiURL}/${id}`).subscribe((result) => {
      if (result) {
        this.response = 'Delete success!';
      } else {
        this.response = 'Fail to delete!';
      }
      this.search();
    });

  }

  // click cancel from child to hidden form details
  public onCancelDetail(): void {
    this.isShow = false;
  }

  // submit form create or edit -> reset form list
  public onResetForm(): void {
    this.search();
  }






}
