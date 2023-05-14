import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeocodingService } from '../../services/geocoding.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  @Output() myOutput = new EventEmitter<string>();

  constructor(
    private fb: FormBuilder,
    private geocodingService: GeocodingService
  ) {}
  searchForm: FormGroup;
  filteredOptions;
  selectedCity: string;
  citySearchObject;
  cityName;
  data;

  sendData() {
    this.myOutput.emit(this.data);
  }

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
    this.data = this.getData(this.searchForm);
    this.data.localisation = this.filteredOptions;
    this.sendData();
  }

  /// reinitialise la valeur de l'input date au click sur l'icon X
  resetDate(field: string) {
    this.searchForm.get(field).setValue(null);
  }

  searchCity(e) {
    const searchOption = e.target.value;

    if (searchOption.length > 4) {
      this.geocodingService.searchLocation(searchOption).subscribe((value) => {
        this.filteredOptions = value;
        this.cityName =
          this.filteredOptions.features[0].properties.city +
          ' ' +
          this.filteredOptions.features[0].properties.context;
      });
    }
  }
}
