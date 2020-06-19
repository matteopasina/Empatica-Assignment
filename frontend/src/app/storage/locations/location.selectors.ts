import { LOCATIONS_KEY, locationsAdapter, LocationsState } from './location.constant';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import { Location } from 'src/app/model/location';

export const selectLocationsState = createFeatureSelector<LocationsState>(LOCATIONS_KEY);

export const {
    selectIds,
    selectEntities,
    selectAll: selectAllLocations,
    selectTotal: selectLocationsTotal,
} = locationsAdapter.getSelectors(selectLocationsState);

export const dayTimes = [
    { name: 'Night',
      range: [0, 5]},
    { name: 'Morning',
      range: [6, 11]},
    { name: 'Afternoon',
      range: [12, 17]},
    { name: 'Evening',
      range: [18, 23]
    }
]

// Creates a map dayTime: number of downloads from the store
export const selectDownloadsPerDayTime = createSelector(
    selectAllLocations,
    (locations: Array<Location>) => {
        const downloadsPerDayTime: Map<string, Location[]> = new Map<string, Location[]>();
        for (const location of locations) {
            const date = new Date(location.downloaded_at.$date);
            for (const dayTime of dayTimes) {
                if (date.getUTCHours() >= dayTime.range[0] && date.getUTCHours() <= dayTime.range[1]) {
                    if (downloadsPerDayTime.has(dayTime.name)) {
                        downloadsPerDayTime.get(dayTime.name).push(location);
                    } else {
                        downloadsPerDayTime.set(dayTime.name, [location]);
                    }
                }
            }
        }

        return downloadsPerDayTime;
    }
);

// Creates a map countryCode: number of downloads from the store
export const selectDownloadsPerCountry = createSelector(
    selectAllLocations,
    (locations: Array<Location>) => {
        const locationsByCountry: Map<string, Location[]> = new Map<string, Location[]>();
        for (const location of locations) {
            if (locationsByCountry.has(location.country)) {
                locationsByCountry.get(location.country).push(location);
            } else {
                locationsByCountry.set(location.country, [location]);
            }
        }

        return locationsByCountry;
    }
);


// Select from the store the locations based on the filter
export const selectWithFilters = createSelector(
    selectAllLocations,
    (locations: Array<Location>, props) => {

        if (locations && (props.filters.countryCode || props.filters.timeOfDay || props.filters.identifier)) {
            let filteredLocationsByCountry: Location[] = locations;
            let filteredLocationsByTime: Location[] = locations;
            let filteredLocationsByIdentifier: Location[] = locations;

            if (props.filters.countryCode) {
                filteredLocationsByCountry = locations.filter(
                    (location: Location) =>
                    location.country.toLowerCase() === props.filters.countryCode.toLowerCase());
            }
            if (props.filters.timeOfDay) {
                filteredLocationsByTime = locations.filter(
                    (location: Location) => new Date(location.downloaded_at.$date).getUTCHours() >= props.filters.timeOfDay[0]
                                            && new Date(location.downloaded_at.$date).getUTCHours() <= props.filters.timeOfDay[1]);
            }
            if (props.filters.identifier) {
                filteredLocationsByIdentifier = locations.filter((location: Location) => location.app_id === props.filters.identifier);
            }

            return filteredLocationsByCountry.filter(value => filterCallback(value, filteredLocationsByTime))
                                      .filter(value => filterCallback(value, filteredLocationsByIdentifier));

        } else {
            return locations;
        }
    }
);

export function filterCallback(value: Location, filteredLocations: Location[]) {
    if (filteredLocations !== undefined) {
        return filteredLocations.includes(value)
    } else {
        return true;
    }
}


