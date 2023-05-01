import { Component, OnInit } from '@angular/core';
import { User, UserInformation } from '../models/user';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  informationsProfil: UserInformation = {
    lastname: 'Rojas',
    firstname: 'célia',
    birthdate: '22/12/1996',
    email: 'celia.rojas@outlook.fr',
    phone: '0679715017',
    picture: null
  }

  constructor() { }

  ngOnInit(): void {
  }

}
