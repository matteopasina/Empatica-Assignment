import { LocationMarker } from './../../../../model/locationMarker';
import { Location } from 'src/app/model/location';
import { LocationsFacade } from './../../../../storage/locations/location.facade';
import { Component, ViewChild, OnInit, Input,
  OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import {MapInfoWindow, MapMarker} from '@angular/google-maps';
import { Subscription } from 'rxjs/internal/Subscription';
import { Filter } from 'src/app/model/filter';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnChanges, OnDestroy {
  @Input() filter: Filter;
  @ViewChild(MapInfoWindow, {static: false}) infoWindow: MapInfoWindow;

  // empatica office
  center = {lat: 45.4536763, lng: 9.1596479};

  markerOptions = {draggable: false};
  markers: LocationMarker[] = [];
  zoom = 4;
  subscriptions: Subscription[] = [];
  infoWindowData: LocationMarker;

  constructor(private locationsFacade: LocationsFacade) { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    // When the filter changes, filter the locations and draw the markers
    if (changes.filter) {

      this.subscriptions.push(this.locationsFacade.getLocationFiltered(changes.filter.currentValue).subscribe(
        (locationsFiltered: Location[]) => {
          if (locationsFiltered) {
            this.markers = [];
            for (const data of locationsFiltered) {

              const marker: LocationMarker = new LocationMarker(data);
              marker.options = this.markerOptions;

              this.markers.push(marker);
            }
          }
      }));
    }
  }

  openInfoWindow(marker: MapMarker, mapMarker: LocationMarker) {
    this.infoWindowData = mapMarker;
    this.infoWindow.open(marker);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
