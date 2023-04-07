import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router, Route } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router) { }

  isValidForm: boolean = false;
  errorMessage: string ='';
  isValidEmail: boolean = false;
  isValidPassword: boolean = false;
  hide: boolean= true;
  registerForm = this.fb.group({
    email:['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    confirmEmail:['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    password:['' ,Validators.required],
    confirmPassword: ['' ,Validators.required],
    lastName: ['', Validators.required],
    firstName: ['', Validators.required],
  })

  ngOnInit(): void {
  }

  validForm(){
    this.isValidEmail = this.registerForm.value.email != this.registerForm.value.confirmEmail ? false : true;
    this.isValidPassword = this.registerForm.value.password != this.registerForm.value.confirmPassword ? false: true;

    if(this.registerForm.valid){
      if(this.isValidEmail == false){
        this.errorMessage = "probleme email";
      }else if( this.isValidPassword == false){
        this.errorMessage = "probleme mdp";
      }else{
        this.errorMessage = "";
        this.isValidForm = true;
      }
    }else{
      this.isValidForm = false;
      this.errorMessage = "veuillez remplir correctement toutes les infos";
    }
  }


  onSubmitForm(){
    this.validForm();
    if(this.isValidForm){
      // this.router.navigate(['/login']);
      /// envoie a la bdd on souscrit a l'event et on envoie sur page de login
    }
  }

}
