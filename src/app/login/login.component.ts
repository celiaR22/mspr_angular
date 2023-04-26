import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Login } from '../models/login';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar, private authService : AuthService) { }

  hide: boolean = true;
  errorMessage: any = [];
  loginForm: FormGroup ; 

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void{
    this.loginForm = this.fb.group({
      email:['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password:['' ,Validators.required]
    })
  }

  getFormData(data: Login): Login{
    return{
      email: data.email,
      password: data.password
    }
  }

  onSubmitForm(){
    this.errorMessage = [];
    if(this.loginForm.valid){
      //on récup la data
      const data = this.getFormData(this.loginForm.value);
      this.authService.login(data.email,data.password).subscribe((value)=>{
        console.log(value)
      })
      // on test avec la bdd si infos sont bonnes
      this.router.navigate(['/dashboard']);
      // sinon on affiche une erreur
      // this.snackBar.open("Les informations ne sont pas bonnes",'X');
    }else{
      this.getFormErrors(this.loginForm);
    }
  }

  // fonction pour recuperer les erreurs des controls du formulaire
  getFormErrors(form:FormGroup){
    for (const controlName in form.controls){
      const control = form.controls[controlName];
      if (control.invalid) {
        const controlErrors: ValidationErrors = control.errors;
        for (const errorName in controlErrors) {
          this.errorMessage[controlName] = this.getErrorMessage(controlName, errorName);
        }
      }
    }
    return this.errorMessage;
  }

  /// fonction pour afficher un message personnalider selon l'erreur
  getErrorMessage(controlName: string, errorName: string) {
    switch (errorName) {
      case 'required':
        return `Le champ ${controlName} est requis`;
      case 'pattern':
        return `Le champ ${controlName} n'est pas valide`;
      default:
        return `Le champ ${controlName} est invalide`;
    }
  }

}
