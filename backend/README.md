# Backend
REST API to retrieve locations of app downloads

## Getting Started

For running this project you need python 3.6+, flask, pyMongo, geopy, pycountry, but don't worry everything 
is containerized :)

### Request

`GET /countries`

### Response

Returns all the countries in the database

### Request

`GET /timeRanges`

### Response

Returns all the daytimes in the database

### Request

`GET /locationsInRange`

Query params: 
- startDate
- endDate

### Response

Returns all the locations downloads in the startDate - endDate range

### Request

`POST /location`

Adds a location of download in the database

Swagger of the POST body:
```
type: object
properties:
  latitude:
    type: number
  longitude:
    type: number
  app_id:
    type: string
  downloaded_at:
    type: string
    example: "2020-06-20 09:00:00"
```

Example of a POST:
```
{
	"latitude": 41.088,
	"longitude": 0.490,
	"app_id": "ISO_APP",
	"downloaded_at": "2020-06-20 09:00:00"
}

```
### Response

200 OK if query when fine, 500 in case of error

## Postman

In the postman folder there is a collection and an environment to query the backend

## Unittest

There is not a lot of logic since the backend is basically just an interface to the database, there is only one unittest that you can run with `python3 -m unittest`
