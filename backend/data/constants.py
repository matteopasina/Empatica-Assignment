

class MongoDB:
    CONNECTION = 'mongodb://mongodb:27017/'


class Errors:
    InvalidDate = 'Invalid date format'
    MongoDBQuery = 'Error performing query on MongoDB'
    MongoDBConnection = 'Error while connecting to MongoDB'
    Geocoder = 'Error while connecting to Geocoder service'


class RequestsFields:
    start_date = 'startDate'
    end_date = 'endDate'
    latitude = 'latitude'
    longitude = 'longitude'
    downloaded_at = 'downloaded_at'
    app_id = 'app_id'
    country = 'country'
    date_format = '%Y-%m-%d %H:%M:%S'
    get_date_format = '%Y-%m-%dT%H:%M:%S.%fZ'
