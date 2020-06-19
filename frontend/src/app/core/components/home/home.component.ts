import { LocationsFacade } from './../../../storage/locations/location.facade';
import { DataService } from './../../services/data.service';
import { Country } from './../../../model/country';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { DayTime } from 'src/app/model/dayTime';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { Location } from 'src/app/model/location';
import { openClosed } from 'src/app/animations';
import { Filter } from 'src/app/model/filter';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: openClosed
})
export class HomeComponent implements OnInit {

  formControl = new FormControl();
  countries: Country[];
  timesOfDay: DayTime[];
  identifiers: Set<string> = new Set();
  locations: Location[];
  appliedFilter = new Filter();
  filteredCountries: Observable<Country[]>;
  maxDate: Date = new Date();
  startDate: Date;
  endDate: Date;

  constructor(private dataService: DataService,
              private locationsFacade: LocationsFacade) { }

  ngOnInit() {
    // Retrieve all the countries
    this.dataService.getCountries().subscribe((supportedCountries: Country[]) => {
      if(supportedCountries) {
        this.countries = supportedCountries;

        this.filteredCountries = this.formControl.valueChanges.pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value?.name),
          map(name => name ? this._filter(name) : this.countries.slice())
        );
      }
    });
    // Retrieve all the day times
    this.dataService.getTimeRanges().subscribe((timeRanges: DayTime[]) => {
      if (timeRanges) {
        this.timesOfDay = timeRanges;
      }
    });
    // Subscribe to the storage to get all the locations to show on the map
    this.locationsFacade.getAllLocations().subscribe((locations: Location[]) => {
      if (locations) {
        this.locations = locations;
        for (const location of this.locations) {
          this.identifiers.add(location.app_id);
        }
      }
    });
  }

  onChangeCountry(code: string) {
    this.appliedFilter.countryCode = code;
    this.appliedFilter = Object.assign({}, this.appliedFilter);
  }

  onChangeTime(range: number[]) {
    this.appliedFilter.timeOfDay = range;
    this.appliedFilter = Object.assign({}, this.appliedFilter);
  }

  onChangeIndentifier(identifier: string) {
    this.appliedFilter.identifier = identifier;
    this.appliedFilter = Object.assign({}, this.appliedFilter);
  }

  updateStartDate(event: MatDatepickerInputEvent<Date>) {
    this.startDate = event.value;
  }

  updateEndDate(event: MatDatepickerInputEvent<Date>) {
    this.endDate = event.value;
  }

  getStartDate() {
    return localStorage.getItem('StartDate');
  }

  getEndDate() {
    return localStorage.getItem('EndDate');
  }

  searchDownloads() {
    if (this.startDate && this.endDate) {
      this.startDate = this.convertToUTC(this.startDate);
      this.endDate = this.convertToUTC(this.endDate);

      this.locationsFacade.loadLocations(this.startDate, this.endDate);
    }
  }

  locationsLoaded() {
    if (this.locations && this.locations.length) {
      return true;
    }
    return false;
  }

  convertToUTC(date: Date) {
    return new Date(date.getTime() - (1000 * 60 * date.getTimezoneOffset()));
  }

  displayFn(country: Country): string {
    return country && country.name ? country.name : '';
  }

  resetFilters() {
    this.formControl.reset();
    this.appliedFilter = new Filter();
  }

  private _filter(name: string): Country[] {
    const filterValue = name.toLowerCase();
    return this.countries.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
}
