import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRegistered, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { AUTH_SERVICE } from '../../../constants/injection.constant';
import { IAuthService } from '../../../services/auth/auth.interface';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {


  public form!: FormGroup;

  public faRegister: IconDefinition = faRegistered;


  constructor(@Inject(AUTH_SERVICE) private authService: IAuthService, private router: Router) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.form = new FormGroup({
      firstName: new FormControl('', Validators.maxLength(30)),
      lastName: new FormControl('', Validators.maxLength(30)),
      username: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      active: new FormControl(false),
    });
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const data = this.form.value;
    this.authService.register(data).subscribe(
      (result) => {
        console.log('Registration successful', result);
        this.router.navigate(['/auth/login']);
      });
  }
}
