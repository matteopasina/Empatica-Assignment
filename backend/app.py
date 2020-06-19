#!/usr/bin/env python
from flask import Flask, request, Response
from bson.json_util import dumps
from datetime import datetime

from data.constants import Errors, RequestsFields
from core.mongo_handler import MongoHandler
from core.geo import Geo

app = Flask(__name__)

mongo = MongoHandler()


@app.route('/countries', methods=['GET'])
def get_all_countries():
    countries = mongo.all_countries()
    if countries == Errors.MongoDBConnection:
        return Response(Errors.MongoDBConnection, status=500)
    return Response(dumps(countries), status=200)


@app.route('/timeRanges', methods=['GET'])
def get_all_time_ranges():
    time_ranges = mongo.all_time_ranges()
    if time_ranges == Errors.MongoDBConnection:
        return Response(Errors.MongoDBConnection, status=500)
    return Response(dumps(time_ranges), status=200)


@app.route('/locationsInRange', methods=['GET'])
def get_locations_in_range():
    start_date = request.args.get(RequestsFields.start_date)
    end_date = request.args.get(RequestsFields.end_date)
    locations = mongo.locations_in_range(start_date, end_date)

    if locations == Errors.InvalidDate:
        return Response(Errors.InvalidDate, status=500)

    if locations == Errors.MongoDBQuery:
        return Response(Errors.MongoDBQuery, status=500)

    if locations == Errors.MongoDBConnection:
        return Response(Errors.MongoDBConnection, status=500)

    new_locs = []
    for location in locations:
        location['id'] = str(location['_id'])
        location.pop('_id')
        new_locs.append(location)
    return Response(dumps(new_locs), status=200)


@app.route('/location', methods=['POST'])
def insert_location():
    post_request = request.get_json()
    try:
        post_request[RequestsFields.downloaded_at] = \
            datetime.strptime(post_request[RequestsFields.downloaded_at], RequestsFields.date_format)
    except ValueError:
        return Response(Errors.InvalidDate, status=500)

    data = Geo().retrieve_location_nominatim(post_request)
    insert_result = mongo.insert_one_location(data)

    if insert_result == Errors.MongoDBConnection:
        return Response(Errors.MongoDBConnection, status=500)

    if insert_result == Errors.Geocoder:
        return Response(Errors.Geocoder, status=500)

    return Response('Insert Successful', status=200)


# For the purpose of the exercise CORS is deactivated
@app.after_request
def after_request(response):
    header = response.headers
    header['Access-Control-Allow-Origin'] = '*'
    return response


if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0')
