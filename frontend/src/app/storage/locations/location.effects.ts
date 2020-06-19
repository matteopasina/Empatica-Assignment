import { LocationsService } from 'src/app/core/services/locations.service';
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap } from 'rxjs/operators';
import {EMPTY } from 'rxjs';
import { LocationsActionTypes, LoadLocationsRangeAction, loadLocationsAction, setLocationsAction } from './location.actions';
import { Location } from 'src/app/model/location';


@Injectable()
export class LocationsEffects {

    loadLocations$ = createEffect(() => this.actions$.pipe(
        ofType(LocationsActionTypes.LOAD),
        mergeMap((action: LoadLocationsRangeAction) =>
            this.locationsService.getLocationsInRange(action.startDate, action.endDate)
                .pipe(
                    map((locations: Location[]) => (setLocationsAction({locations})),
                        catchError(() => EMPTY)
                    ))
        )
    ));

    constructor(private actions$: Actions, private locationsService: LocationsService) {
    }
}
