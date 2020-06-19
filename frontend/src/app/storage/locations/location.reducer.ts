import * as LocationsActions from './location.actions';
import { locationsAdapter, LocationsState } from './location.constant';
import {Action, createReducer, on} from '@ngrx/store';

export const initialState: LocationsState = locationsAdapter.getInitialState();

const locationsReducer = createReducer(
    initialState,
    on(LocationsActions.setLocationsAction, (state, {locations}) => {
        return locationsAdapter.setAll(locations, state);
    }),
    on(LocationsActions.removeLocationsAction, (state, {}) => {
        return locationsAdapter.removeAll(state);
    })
);

export function reducer(state: LocationsState | undefined, action: Action) {
    return locationsReducer(state, action);
}


