import { Component, HostListener, OnInit } from '@angular/core';
import { NavBar } from 'src/app/models/navbar';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor() { }

  navigations: NavBar[] = [
    {
      name: 'Mon profil',
      link: '/profil',
      icon: 'person'
    },
    {
      name: 'Rechercher',
      link: '/dashboard',
      icon: 'search'
    },
    {
      name: 'Mes plantes',
      link: '/plant',
      icon: 'local_florist',
    },
    {
      name: 'Ajouter une plante',
      link: '/add',
      icon: 'add'
    },
    {
      name: 'Se déconnecter',
      link: '/logout',
      icon: 'logout'
    }
  ];

  isMinScreen: boolean = false;

  ngOnInit(): void {
    this.onResizeScreen()
  }

  onToggleSidenav() {

  }

  /// permet un écran responsive avec affichage d'un menu burger
  @HostListener('window:resize', ['$event'])
  onResizeScreen() {
    if (window.innerWidth < 1200) {
      this.isMinScreen = true;
    } else {
      this.isMinScreen = false
    }
  }
}
