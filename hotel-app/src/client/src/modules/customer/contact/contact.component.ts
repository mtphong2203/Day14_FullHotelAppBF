import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormatDatePipe } from '../../pipe/format-date.pipe';
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormatDatePipe],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  public contact!: FormGroup;
  public time: number = 90;
  public isShow: Boolean = false;

  ngOnInit(): void {
    this.contact = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
      message: new FormControl('', Validators.maxLength(255))
    });
    this.onSubmit();
  }
  public onSubmit(): void {
    console.log(this.contact.value);
  }

  public onCreate(): void {
    this.isShow = !this.isShow;
  }




}
