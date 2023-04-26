import { Component, OnInit } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-gestionForm',
  template: ''
})
export class gestionForm implements OnInit {

  constructor(private snackBar: MatSnackBar) { }
  errorMessage: any = []; 

  ngOnInit(): void {
  }

  // fonction pour recuperer les erreurs des controls du formulaire
  getFormErrors(form:FormGroup){
    /// on vérifie les erreurs de confirm mdp et email (les erreurs s'affichent a par )
    if(form.errors){
      const controlErrors: ValidationErrors = form.errors;
        for (const errorName in controlErrors) {
          this.errorMessage[errorName] = this.getErrorMessage(errorName, errorName);
        }
    }
    for (const controlName in form.controls){
      const control = form.controls[controlName];   
      if (control.invalid) {
        const controlErrors: ValidationErrors = control.errors;
        for (const errorName in controlErrors) {
          this.errorMessage[controlName] = this.getErrorMessage(controlName, errorName);
        }
      }
    }
    console.log(this.errorMessage)
    return this.errorMessage;
  }

  /// fonction pour afficher un message personnalider selon l'erreur
  getErrorMessage(controlName: string, errorName: string) {
    switch (errorName) {
      case 'required':
        return `Le champ est requis.`;
      case 'pattern':
        return `Le champ n'est pas valide.`;
      case 'emailMismatch':
        return 'Les emails ne sont pas identiques'
      case 'passwordMismatch':
        return 'Les mots de passes ne sont pas identiques'
      default:
        return `Le champ ${controlName} est invalide`;
    }
  }

}
