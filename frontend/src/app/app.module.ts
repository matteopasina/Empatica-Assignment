import { LocationsEffects } from './storage/locations/location.effects';
import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {reducer as locationsReducer} from 'src/app/storage/locations/location.reducer'
import {EffectsModule} from '@ngrx/effects';
import {environment} from './../environments/environment';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import { storageMetaReducer } from './storage/storage.metareducer';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreModule,
    StoreModule.forRoot({ locations: locationsReducer }, {
      metaReducers: [storageMetaReducer]
    }),
    EffectsModule.forRoot([LocationsEffects]),
    StoreDevtoolsModule.instrument({
      name: 'Empatica',
      logOnly: environment.production,
      maxAge: 20
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
