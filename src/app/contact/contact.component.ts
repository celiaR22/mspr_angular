import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { gestionForm } from '../share/form/gestionForm';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent extends gestionForm implements OnInit {

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private router: Router) { super() }
  mailForm: FormGroup;
  isEmailSend: boolean = false;
  token: string = sessionStorage.getItem('currentUser')
  superngOnInit(): void {
  }

  override ngOnInit(): void {
    this.createForm();
  }


  createForm() {
    this.mailForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      message: ['', Validators.required],
    });
  }

  getFormData(data) {
    return {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      message: data.message
    }
  }


  onSubmit() {
    this.errorMessage = [];
    if (this.mailForm.valid) {
      //on récup la data
      const data = this.getFormData(this.mailForm.value);
      if (this.token) {
        this.router.navigate(['/search']);
        this.snackBar.open('Votre message a bien été envoyé, nous vous répondrons dans les meilleurs délais', 'X', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
        })
      } else {
        this.isEmailSend = true;
      }
    } else {
      console.log(this.getFormErrors(this.mailForm));
    }
  }
}
