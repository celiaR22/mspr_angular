import { Component, OnInit } from '@angular/core';
import { FormBuilder,  FormGroup,  Validators } from '@angular/forms';
import { Login } from '../models/login';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { gestionForm } from '../share/nav-bar/form/gestionForm';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends gestionForm implements OnInit {

  constructor(private router: Router,  snackBar: MatSnackBar, private fb:FormBuilder) { 
    super(snackBar)
  }
  loginForm: FormGroup ;
  hide: boolean = true;

  superngOnInit(): void {
  }

  override ngOnInit(): void {
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
    //  const data = this.getFormData(this.loginForm.value);
      // on test avec la bdd si infos sont bonnes
      this.router.navigate(['/dashboard']);
      // sinon on affiche une erreur
      // this.snackBar.open("Les informations ne sont pas bonnes",'X');
    }else{
      this.getFormErrors(this.loginForm);
    }
  }

}
