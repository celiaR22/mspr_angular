import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, HostListener, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, map, shareReplay } from 'rxjs';
import { NavBar } from 'src/app/models/navbar';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService, private snackBar: MatSnackBar, private router: Router) { }

  navigations: NavBar[] = [
    {
      name: 'Rechercher',
      link: '/search',
      icon: 'search'
    },
    {
      name: 'Mes plantes',
      link: '/plants',
      icon: 'local_florist',
    },
    {
      name: 'Gardes',
      link: '/keeps',
      icon: 'dynamic_feed'
    },
    {
      name: 'Mon profil',
      link: '/profil',
      icon: 'person'
    },
    {
      name: 'Notification',
      link: '/notification',
      icon: 'notifications'
    },
    {
      name: 'Message',
      link: '/message',
      icon: 'chat'
    }
  ];

  navigationsFooter: NavBar[] = [
    {
      name: 'Contact',
      link: '/contact',
    },
    {
      name: 'Conditions générales d\'utilisations',
      link: '/cgu',
    },
    {
      name: 'Politique de confidentialitée',
      link: '/politique',
    },
  ];

  ngOnInit(): void {
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
      },
      error: (error: any) => {
        this.snackBar.open('Erreur de deconnexion', 'X', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
    });
  }
}