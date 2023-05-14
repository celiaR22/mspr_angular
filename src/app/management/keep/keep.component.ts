import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Keep } from 'src/app/models/keep';
import { KeepService } from 'src/app/services/keep.service';

@Component({
  selector: 'app-keep',
  templateUrl: './keep.component.html',
  styleUrls: ['./keep.component.scss']
})
export class KeepComponent implements OnInit {

  constructor(private keepService: KeepService, private router: Router, private snackBar: MatSnackBar) { }
  keeps: Keep[];

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.keepService.getKeepByUser().subscribe({
      next: (value) => {
        console.log(value)
        this.keeps = value['keeps']

      },
      error: (error: any) => {
        this.snackBar.open(error.error.message, 'X', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
        })
      },
    })
  }

  addKeep() {
    this.router.navigate(['addKeep'])
  }

}
