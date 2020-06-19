import {createAction, props} from '@ngrx/store';
import { Location } from 'src/app/model/location';

export enum LocationsActionTypes {
    LOAD = '[Locations] Load All Locations',
    SET = '[Locations] Set All Locations',
    REMOVEALL = '[CustomerOrder] Remove All CustomerOrders'
}

export const loadLocationsAction = createAction(LocationsActionTypes.LOAD, props<{ startDate: Date, endDate: Date }>());
export const setLocationsAction = createAction(LocationsActionTypes.SET, props<{ locations: Location[] }>());
export const removeLocationsAction = createAction(LocationsActionTypes.REMOVEALL);

export interface LoadLocationsRangeAction {
    startDate: Date;
    endDate: Date;
}