import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import { loadLocationsAction, setLocationsAction, removeLocationsAction } from './location.actions';
import { Location } from 'src/app/model/location';
import { selectAllLocations, selectWithFilters, selectDownloadsPerCountry, selectDownloadsPerDayTime } from './location.selectors';
import { Observable } from 'rxjs';
import { Filter } from 'src/app/model/filter';

@Injectable({
    providedIn: 'root'
})
export class LocationsFacade {

    constructor(private store: Store<any>) {
    }

    getAllLocations(): Observable<Location[]> {
        return this.store.select(selectAllLocations);
    }

    getLocationFiltered(filters: Filter): Observable<Location[]> {
        return this.store.select(selectWithFilters, {filters});
    }

    getPerDayTime() {
        return this.store.select(selectDownloadsPerDayTime);
    }

    getPerCountry() {
        return this.store.select(selectDownloadsPerCountry);
    }

    loadLocations(startDate: Date, endDate: Date) {
        localStorage.setItem('StartDate', startDate.toISOString());
        localStorage.setItem('EndDate', endDate.toISOString());
        return this.store.dispatch(loadLocationsAction({ startDate, endDate }));
    }

    setLocations(locations: Location[]) {
        return this.store.dispatch(setLocationsAction({ locations }));
    }

    removeAllLocations() {
        return this.store.dispatch(removeLocationsAction());
    }
}
