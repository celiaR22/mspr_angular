import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { gestionForm } from '../share/form/gestionForm';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends gestionForm implements OnInit {
  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    super();
  }
  loginForm: FormGroup;
  hide: boolean = true;

  superngOnInit(): void {}

  override ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: ['', Validators.required],
    });
  }

  getFormData(data: User): User {
    return {
      email_user: data.email_user,
      password_user: data.password_user,
    };
  }

  onSubmitForm() {
    this.errorMessage = [];
    if (this.loginForm.valid) {
      //on récup la data
      const data = this.getFormData(this.loginForm.value);
      // on test avec la bdd si infos sont bonnes
      this.authService.login(data).subscribe({
        next: (value) => {
          this.router.navigate(['/dashboard']);
        },
        error: (error: any) => {
          this.snackBar.open(error.error.message, 'X', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        },
      });
    } else {
      this.getFormErrors(this.loginForm);
    }
  }
}
