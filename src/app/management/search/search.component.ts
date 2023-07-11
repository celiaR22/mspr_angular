
import { Component } from '@angular/core';
import * as Leaflet from 'leaflet';
import { forkJoin } from 'rxjs';
import { Keep } from 'src/app/models/keep';
import { KeepService } from 'src/app/services/keep.service';
import { FrenchDatePipe } from 'src/app/share/pipe/date-format.pipe';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  constructor(private keepService: KeepService, private frenchDatePipe: FrenchDatePipe, private changeDetectorRef: ChangeDetectorRef) { }
  receivedData;
  keeps: Keep[];
  locations;
  map!: Leaflet.Map;
  markers: Leaflet.Marker[] = [];
  options = {
    layers: [
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }),
    ],
    zoom: 12,
    center: { lat: 47.233774, lng: -1.546605 },
  };
  displayKeep: Boolean = false;

  ngOnInit() {
    this.loadData();
  }

  generateMarker(data: any, index: number) {
    var greenIcon = Leaflet.icon({
      iconUrl: '../../../assets/image/markeIcon.png',

      iconSize: [28, 38], // size of the icon
      shadowSize: [50, 64], // size of the shadow
      iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62], // the same for the shadow
      popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
    });
    return Leaflet.marker(data.position, {
      draggable: data.draggable,
      icon: greenIcon,
    })
      .on('click', (event) => this.markerClicked(event, index))
      .on('dragend', (event) => this.markerDragEnd(event, index));
  }

  onMapReady($event: Leaflet.Map) {
    this.map = $event;
  }

  mapClicked($event: any) {
    console.log($event.latlng.lat, $event.latlng.lng);
  }

  markerClicked($event: any, index: number) {
    // console.log($event.latlng.lat, $event.latlng.lng);
  }

  markerDragEnd($event: any, index: number) {
    // console.log($event.target.getLatLng());
  }

  resetMap(data) {
    if (this.map) {
      this.receivedData = data;
      this.map.setView(
        [
          this.receivedData.localisation.features[0].geometry.coordinates[1],
          this.receivedData.localisation.features[0].geometry.coordinates[0],
        ],
        14
      );
    }
  }

  loadData() {
    const sources = [
      this.keepService.getAllKeppExceptUserCo(),
      this.keepService.getLocations(),
    ]
    forkJoin(sources).subscribe((response) => {
      this.keeps = response[0]['keeps'];
      this.locations = response[1]['locations']
      this.getLocationByKeep();
      this.getMarkers();
    })
  }

  getLocationByKeep() {
    this.keeps.map((keep) => {
      const city = this.locations.filter((location) => location.address_id == keep.location_id)
      keep.location = city[0]
    })
  }


  getMarkers() {
    this.keeps.forEach((keep, index) => {
      const geoCoding = {
        position: { lat: keep.location['latitude_location'], lng: keep.location['longitude_location'] },
        draggable: false,
      };
      const formattedStartDate = this.frenchDatePipe.transform(keep.start_date_keep);
      const formattedendDate = this.frenchDatePipe.transform(keep.end_date_keep);
      const popupContent = ` <mat-card class="example-card" >
          <img mat-card-image src="../../../../assets/image/plante1.jpg" width="50px" heigth="50px">
          <img mat-card-image src="../../../../assets/image/plante2.jpg" width="50px" heigth="50px">
          <img mat-card-image src="../../../../assets/image/plante2.jpg" width="50px" heigth="50px">
          <mat-card-content>
              <p class="localisation">${keep.location['city']}</p>
              <p class="date">${formattedStartDate} - ${formattedendDate}</p>
              <div>
                  3 plantes à garder.
                  Arrosé matin et soir
              </div>
          </mat-card-content>
      </mat-card>`
      const marker = this.generateMarker(geoCoding, index);
      marker.addTo(this.map).bindPopup(popupContent)
      this.map.panTo(geoCoding['position']);
      marker.on('popupopen', (event) => {
        const popup = event.popup;
        popup.getElement().addEventListener('click', () => {
          console.log(this.keeps)
          console.log(keep)
          this.keeps = [keep]

          this.changeDetectorRef.detectChanges();
        });
      });
    });

  }


  getData(data) {
    this.resetMap(data);
  }
}
