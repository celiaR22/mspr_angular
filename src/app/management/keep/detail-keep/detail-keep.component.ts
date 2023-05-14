import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Keep } from 'src/app/models/keep';
import { KeepService } from 'src/app/services/keep.service';


@Component({
  selector: 'app-detail-keep',
  templateUrl: './detail-keep.component.html',
  styleUrls: ['./detail-keep.component.scss']
})
export class DetailKeepComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private keepService: KeepService, private snackBar: MatSnackBar) { }
  idKeep: number;
  keep: Keep;

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.keepService.getKeepByUser().subscribe({
      next: (value) => {
        this.idKeep = +this.activatedRoute.snapshot.params['id'];
        this.keep = value['keeps'].find((keep) => keep.keep_id == this.idKeep)
      },
      error: (error: any) => {
        this.snackBar.open(error.error.message, 'X', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
        })
      },
    })
  }

}
