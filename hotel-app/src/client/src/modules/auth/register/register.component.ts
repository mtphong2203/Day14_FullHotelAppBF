import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRegistered, IconDefinition } from '@fortawesome/free-solid-svg-icons';

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

  public apiUrl: string = 'http://localhost:8080/api/auth/register';

  constructor(private http: HttpClient, private router: Router) { }

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
    this.http.post(this.apiUrl, data).subscribe(
      (result) => {
        console.log('Registration successful', result);
        this.router.navigate(['/auth/login']);
      },
      (error) => {
        console.error('Registration failed', error);
        if (error.status === 400) {
          console.log(data);
          // Lỗi từ server, có thể có thông tin chi tiết trong response body
          console.error('Response body:', error.error);
          alert('Lỗi: Dữ liệu đăng ký không hợp lệ. Vui lòng kiểm tra lại.');
        } else if (error.status === 500) {
          alert('Lỗi hệ thống. Vui lòng thử lại sau.');
        } else {
          alert('Có lỗi xảy ra, vui lòng thử lại.');
        }
      }
    );

  }

}
