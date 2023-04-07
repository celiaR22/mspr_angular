import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '../models/login';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar) { }

  hide: boolean = true;// affichage du mot de passe
  errorMessage: string = '';

  loginForm: FormGroup = this.fb.group({
    email:['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    password:['' ,Validators.required]
  })

  ngOnInit(): void {
  }

  getFormData(data: any): Login{
    return{
      email: data.email,
      password: data.password
    }
  }

  onSubmitForm(){
    if(this.loginForm.valid){
      console.log('valid')
      //on récup la data
      const data = this.getFormData(this.loginForm.value);
      // on test avec la bdd
      // si info sont bonne on redirige vers dashboard
      this.router.navigate(['/dashboard']);
      // sinon on affiche une erreur
      // this.snackBar.open("Les informations ne sont pas bonnes",'X');
    }else{
      console.log(this.loginForm.errors)
      this.errorMessage = "pas bien remplis";
    }

  }

}
