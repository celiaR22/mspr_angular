import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeocodingService } from '../../services/geocoding.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private geocodingService: GeocodingService
  ) {}
  searchForm: FormGroup;
  filteredOptions;

  ngOnInit(): void {
    this.createForm();
    // this.searchForm.get('firstName').valueChanges
    // .pipe(
    //   this.search(value))
    // )
    // .subscribe((results: any[]) => {
    //   console.log(results);
    // });
  }

  createForm() {
    this.searchForm = this.fb.group({
      localisation: [''],
      startDate: [''],
      endDate: [''],
    });
  }

  getData(dataForm: FormGroup) {
    const dataValue = dataForm.value;
    return {
      localisation: dataValue.localisation,
      startDate: dataValue.startDate,
      endDate: dataValue.endDate,
    };
  }

  submitForm() {
    const data = this.getData(this.searchForm);
    console.log(data);
  }

  /// reinitialise la valeur de l'input date au click sur l'icon X
  resetDate(field: string) {
    this.searchForm.get(field).setValue(null);
  }

  searchCity(e) {
    const searchOption = e.target.value;

    if (searchOption.length) {
      this.geocodingService.searchLocation(searchOption).subscribe((value) => {
        console.log(value);

        this.filteredOptions = value;
      });
    }
  }
}
