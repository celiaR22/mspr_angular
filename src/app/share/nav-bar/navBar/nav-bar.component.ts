import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, HostListener, OnInit } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { NavBar } from 'src/app/models/navbar';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService) { }

  navigations: NavBar[] = [
    {
      name: 'Rechercher',
      link: '/search',
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
      name: 'Mon profil',
      link: '/profil',
      icon: 'person'
    },
    // {
    //   name: 'Se déconnecter',
    //   link: '/logout',
    //   icon: 'logout'
    // }
  ];

  ngOnInit(): void {
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  logout() {
    this.authService.logout();
  }
}
