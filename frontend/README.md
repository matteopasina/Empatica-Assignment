# Frontend

The frontend uses Angular 9 and ngrx. 
Yarn is used to manage dependencies.
The map is provided by Google Maps JS API.

The app is designed to be easily expandable. To add new filters
on the map only a selector and a field in the filter class is
needed.
There isn't a lot of complex logic, so I unittested only the selectors 
(since it is also a pet app).

## Run

Run `yarn install` to build the project and `yarn start` to fire up 
the angular dev server.

## Running unit tests

Run `yarn test` to execute the unit tests via [Karma](https://karma-runner.github.io).

