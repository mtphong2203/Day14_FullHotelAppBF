import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormatDatePipe } from '../../pipe/format-date.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPhoneAlt, faEnvelopeCircleCheck, faLocation, IconDefinition } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormatDatePipe, FontAwesomeModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  public contact!: FormGroup;
  public time: number = 90;

  // icon
  public faPhone: IconDefinition = faPhoneAlt;
  public faEmail: IconDefinition = faEnvelopeCircleCheck;
  public faLocation: IconDefinition = faLocation;

  // img
  public image: string = './assets/images/contact.jpg';

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

}
