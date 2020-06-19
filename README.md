# Empatica Assignment

The system is composed of three services: 
- Frontend: built with Angular 9 + ngrx

- Backend: Simple python + flask application

- DB: MongoDB

## Installation

The project is usign docker compose to run, so to start all the services just run docker-compose up from this folder and the app will be available at `http://0.0.0.0:4200/`

## Frontend

The frontend calls the REST endpoints exposed from the backend. 
It uses ngrx to store the downloads locations, then uses the selectors to filter the data shown. 
The map uses google maps JS API.

## Backend

The backend uses flask to expose some endpoints and pymongo to connect to 
MongoDB. It uses the Nominatim geoservice to reverse geocode the locations
and retrieve the country of a lat lng location.

## Database

To store the data I used MongoDB since relations are not really important
in this application. The data we store are all unrelated locations so a NoSql database
seems good, given that it can easily scale.

The database is already filled with some random data of download locations.

## Scalability

If the number of download are a lot(millions) some changes can be implemented
 to improve the performance:
- Redis (or some other caching system like memcache) can be
implemented to cache the result of the queries to the DB
- The zoom on the map can be blocked to a certain maximum level and the
get request can be modified to query just the visible part 
- Marker clustering can help visualization

## Expansion

The assignment asks how to implement real time update of the map. 
To do this I would implement a web socket connection. 
For the frontend rxjs will reflect in real time all the updates 
of the storage, there are several libraries to implement 
a web socket connection, I already used @stomp/ng2-stompjs 
that is pretty straightforward, but also socket.io is widely used. 
For the python backend I see that there is an implementation 
flask-socketio (https://flask-socketio.readthedocs.io/en/latest/ ) 
so I would probably go for that.
The connection will update the frontend every time a POST /location 
is received.

## Development servers

Everything still runs on the development servers of
angular and flask, to deploy this in production a WSGI application server (Gunicorn)
and nginx need to be used for robustness and security 
