import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { gestionForm } from '../share/form/gestionForm';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserInformation } from '../models/user';
import { AuthService } from '../services/auth.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent extends gestionForm implements OnInit {
  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    super();
  }
  hide: boolean = true;
  registerForm: FormGroup;

  superngOnInit(): void {}

  override ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.registerForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      confirmEmail: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          this.emailMatchValidator,
        ],
      ],
      password: ['', Validators.required],
      confirmPassword: ['', [Validators.required, this.passwordMatchValidator]],
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern('[0][1-9][0-9]{8}')],
      ],
      birthdate: ['', [Validators.required]],
    });
  }

  getFormData(data: any): UserInformation {
    return {
      email: data.email,
      password: data.password,
      firstname: data.firstname,
      lastname: data.lastname,
      birthdate: data.birthdate,
      phone: data.phoneNumber,
    };
  }

  onSubmitForm() {
    if (this.registerForm.valid) {
      const data = this.getFormData(this.registerForm.value);
      this.authService.signup(data).subscribe({
        next: (value) => {
          console.log(value);
        },
        error: (error: any) => {
          this.snackBar.open(error.error.message, 'X', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        },
      });
    } else {
      this.getFormErrors(this.registerForm);
    }
  }

  emailMatchValidator: ValidatorFn = (
    control: FormGroup
  ): ValidationErrors | null => {
    const email = control.parent?.get('email').value;
    const confirmEmail = control.value;
    if (email !== confirmEmail) {
      return { emailNotIdentical: true };
    }
    return null;
  };

  passwordMatchValidator: ValidatorFn = (
    control: FormGroup
  ): ValidationErrors | null => {
    const password = control.parent?.get('password').value;
    const confirmPassword = control.value;
    if (password !== confirmPassword) {
      return { passwordNotIdentical: true };
    }
    return null;
  };

  /// validator pour le format de date et vérifier si majeur ou pas
  //- a voir si j'arrive a faire marcher plus tard

  // dateValidator(): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: any } | null => {
  //     const dateStr = control.value;
  //     const validDate = this.validateDateFr(dateStr);

  //     if (validDate) {
  //       const [day, month, year] = dateStr.split('/');
  //       const birthDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  //       const today = new Date();
  //       var age = today.getFullYear() - birthDate.getFullYear();
  //       const monthDiff = today.getMonth() - birthDate.getMonth();

  //       if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
  //         age--;
  //       }

  //       if (age >= 18) {
  //         return null;
  //       }
  //     }

  //     return { 'dateAndAge': true };
  //   };
  // }

  // validateDateFr(dateStr: string): boolean {
  //   const pattern = /^([1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  //   return pattern.test(dateStr);
  // }
}
