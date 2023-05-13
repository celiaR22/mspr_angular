import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeocodingService } from '../../services/geocoding.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

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
  selectedCity: string;
  citySearchObject;

  ngOnInit(): void {
    this.createForm();
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
      localisation: {},
      startDate: dataValue.startDate,
      endDate: dataValue.endDate,
    };
  }

  submitForm() {
    const data = this.getData(this.searchForm);
    data.localisation = this.citySearchObject;
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
        this.filteredOptions = value;
      });
    }
  }

  onCitySelected(event: MatAutocompleteSelectedEvent): void {
    const selectedCity = event.option.value;
    const option = this.filteredOptions.find(
      (o) => o.display_name === selectedCity
    );
    this.citySearchObject = option;
  }
}
