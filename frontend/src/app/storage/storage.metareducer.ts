import { LOCATIONS_KEY } from './locations/location.constant';
import {Action, ActionReducer} from '@ngrx/store';
import {merge, pick} from 'lodash-es';

// the keys from state which we'd like to save.
const stateKeys = [LOCATIONS_KEY];
// the key for the local storage.
const localStorageKey = '__app_storage__';

// key is the local storage key used to save the state
function setSavedState(state: any, key: string) {
  localStorage.setItem(localStorageKey, JSON.stringify(state));
}
function getSavedState(key: string): any {
  return JSON.parse(localStorage.getItem(localStorageKey));
}

export function storageMetaReducer<S, A extends Action = Action>(reducer: ActionReducer<S, A>) {
  let onInit = true; // after load/refresh…
  return (state: S, action: A): S => {
    // reduce the nextState.
    const nextState = reducer(state, action);
    // init the application state.
    if (onInit) {
      onInit = false;
      const savedState = getSavedState(localStorageKey);
      return merge(nextState, savedState);
    }
    // save the next state to the application storage.
    const stateToSave = pick(nextState, stateKeys);
    setSavedState(stateToSave, localStorageKey);
    return nextState;
  };
}
