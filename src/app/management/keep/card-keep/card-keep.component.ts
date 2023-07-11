import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Keep } from 'src/app/models/keep';
import { KeepService } from 'src/app/services/keep.service';

@Component({
  selector: 'app-card-keep',
  templateUrl: './card-keep.component.html',
  styleUrls: ['./card-keep.component.scss']
})
export class CardKeepComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private keepService: KeepService) { }

  @Input() keeps: Keep[];
  activatedRouteIsSearch: boolean = false;

  ngOnInit(): void {
    this.checkActivatedRoute()
  }

  checkActivatedRoute() {
    const currentRoute = this.route.snapshot;
    if (currentRoute.routeConfig.path === 'search') {
      this.activatedRouteIsSearch = true;
    }
  }

  updateKeep(idKeep: number) {
    this.router.navigate([`keep/${idKeep}`]);
  }

  applyToKeep(idKeep: number) {
    this.keepService.applyToKeep(idKeep).subscribe({
      next: (value) => {
        console.log(value)
      },
      error: (error: any) => {
        console.log(error)
      },
    });
  }

}
