import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faCompass, IconDefinition } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  public form!: FormGroup;
  public apiUrl: string = 'http://localhost:8080/api/auth';

  public faUser: IconDefinition = faUser;
  public faCompass: IconDefinition = faCompass;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),

    });
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    const data = this.form.value;
    this.http.post(`${this.apiUrl}/login`, data)
      .subscribe((result: any) => {
        if (result) {
          console.log(result);
          localStorage.setItem('authToken', result.token);
          this.router.navigate(['/']);
        }
      });
  }

}
