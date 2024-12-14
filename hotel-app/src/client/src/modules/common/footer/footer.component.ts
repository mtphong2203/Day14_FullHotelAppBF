import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEnvelopeOpen, faPhoneVolume, faMapLocationDot, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [DatePipe, FontAwesomeModule, RouterLink, ReactiveFormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  public form!: FormGroup;
  public date: Date = new Date(2024, 4, 1);

  // icon
  public faEnvelope: IconDefinition = faEnvelopeOpen;
  public faPhoneVolume: IconDefinition = faPhoneVolume;
  public faMap: IconDefinition = faMapLocationDot;

  public email: string = '';

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', Validators.required),
    });
  }

  public onSubmit(): void {
    console.log(this.email);
    this.form.reset();
  }
}
