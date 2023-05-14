import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Keep } from 'src/app/models/keep';

@Component({
  selector: 'app-card-keep',
  templateUrl: './card-keep.component.html',
  styleUrls: ['./card-keep.component.scss']
})
export class CardKeepComponent implements OnInit {

  constructor(private router: Router) { }

  @Input() keeps: Keep[];

  ngOnInit(): void {
  }

  detailKeep(idKeep: number) {
    this.router.navigate([`keep/${idKeep}`]);
  }

}
