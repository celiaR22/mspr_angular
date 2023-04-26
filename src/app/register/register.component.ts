import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router, Route } from '@angular/router';
import { gestionForm } from '../share/nav-bar/form/gestionForm';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends gestionForm implements OnInit {

  constructor(private router: Router,  snackBar: MatSnackBar, private fb:FormBuilder) { 
    super(snackBar)
  }
  hide: boolean= true;
  registerForm: FormGroup ;

  superngOnInit(): void {
  }

  override ngOnInit(): void {
      this.createForm();
  }

  createForm(): void{
    this.registerForm = this.fb.group(
      {
        email:['', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
        confirmEmail:['', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
        password:['' ,Validators.required],
        confirmPassword: ['' ,Validators.required],
        lastName: ['', Validators.required],
        firstName: ['', Validators.required],
      },
      {
        validators: Validators.compose([this.emailMatchValidator, this.passwordMatchValidator]),
      }
    )
  }

  getData(data:any){
    return{
      email:data.email,
      confirmEmail:data.confirmEmail,
      password:data.password,
      confirmPassword: data.confirmPassword,
      lastName: data.lastName,
      firstName: data.firstName,
    }
  }

  onSubmitForm(){
    this.errorMessage = [];
    if(this.registerForm.valid){
      //on récup la data
    //  const data = this.getFormData(this.registerForm.value);
      // on test avec la bdd si infos sont bonnes
      // this.router.navigate(['/dashboard']);
      // sinon on affiche une erreur
      // this.snackBar.open("Les informations ne sont pas bonnes",'X');
    }else{
      //faire une gestion des erreurs pour confirmmail et confirm password
      this.getFormErrors(this.registerForm);
    }
  }

  emailMatchValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const email = control.get('email');
    const confirmEmail = control.get('confirmEmail');
    return email && confirmEmail && email.value !== confirmEmail.value ? { emailMismatch: true } : null;
  };

  passwordMatchValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password && confirmPassword && password.value !== confirmPassword.value ? { passwordMismatch: true } : null;
  };

}
