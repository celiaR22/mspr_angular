import { Component } from '@angular/core';
import * as Leaflet from 'leaflet';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  receivedData;

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
  ngOnInit() {}
  // initMarkers() {
  //   const initialMarkers = [
  //     {
  //       position: { lat: 43.616615, lng: 3.844962 },
  //       draggable: false,
  //     },
  //     {
  //       position: { lat: 43.604854, lng: 3.886189 },
  //       draggable: false,
  //     },
  //     {
  //       position: { lat: 43.598823, lng: 3.848149 },
  //       draggable: false,
  //     },
  //   ];
  //   for (let index = 0; index < initialMarkers.length; index++) {
  //     const data = initialMarkers[index];
  //     const marker = this.generateMarker(data, index);
  //     marker
  //       .addTo(this.map)
  //       .bindPopup(`<b> 3 Plantes à garder chez Jordan.</b>`);
  //     this.map.panTo(data.position);
  //     this.markers.push(marker);
  //   }
  // }

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
    //this.initMarkers();
  }

  mapClicked($event: any) {
    // console.log($event.latlng.lat, $event.latlng.lng);
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
      console.log(this.receivedData.localisation.features[0].geometry);
      this.map.setView(
        [
          this.receivedData.localisation.features[0].geometry.coordinates[1],
          this.receivedData.localisation.features[0].geometry.coordinates[0],
        ],
        14
      );
    }
  }

  getData(data) {
    this.resetMap(data);
  }
}
