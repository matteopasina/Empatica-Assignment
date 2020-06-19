import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Location } from 'src/app/model/location';

export const LOCATIONS_KEY = 'locations';

export interface LocationsState extends EntityState<Location> {}

export const locationsAdapter: EntityAdapter<Location> = createEntityAdapter<Location>();
