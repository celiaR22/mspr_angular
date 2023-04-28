import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { gestionForm } from '../share/nav-bar/form/gestionForm';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends gestionForm implements OnInit {

  constructor(private router: Router, private snackBar: MatSnackBar, private fb: FormBuilder) {
    super()
  }
  hide: boolean = true;
  registerForm: FormGroup;

  superngOnInit(): void {
  }

  override ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
        confirmEmail: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"), this.emailMatchValidator]],
        password: ['', Validators.required],
        confirmPassword: ['', [Validators.required, this.passwordMatchValidator]],
        lastName: ['', Validators.required],
        firstName: ['', Validators.required],
      },
    )
  }

  getFormData(data: any) {
    return {
      email: data.email,
      confirmEmail: data.confirmEmail,
      password: data.password,
      confirmPassword: data.confirmPassword,
      lastName: data.lastName,
      firstName: data.firstName,
    }
  }

  onSubmitForm() {
    if (this.registerForm.valid) {
      //on récup la data
      const data = this.getFormData(this.registerForm.value);
      // on test avec la bdd si infos sont bonnes
      this.router.navigate(['/dashboard']);
      // sinon on affiche une erreur
      this.snackBar.open("Les informations ne sont pas bonnes", 'X');
    } else {
      this.getFormErrors(this.registerForm);
    }
  }

  emailMatchValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const email = control.parent?.get('email').value;
    const confirmEmail = control.value;
    if (email !== confirmEmail) {
      return { 'emailNotIdentical': true };
    }
    return null;
  };

  passwordMatchValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const password = control.parent?.get('password').value;
    const confirmPassword = control.value;
    if (password !== confirmPassword) {
      return { 'passwordNotIdentical': true };
    }
    return null;
  };

  getMessageErrorConfirm(field: string, confirmError: string) {
    const fieldError = Object.keys(this.errorMessage).includes(field);
    const confirmErrorField = Object.keys(this.errorMessage).includes(confirmError)
    if (fieldError && !confirmErrorField) {
      return this.errorMessage[field]
    }
    else if (fieldError && !confirmErrorField) {
      return this.errorMessage.field
    }
    else if (!fieldError && confirmErrorField) {
      return this.errorMessage.confirmError
    }
  }

}
