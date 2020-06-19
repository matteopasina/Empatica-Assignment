from datetime import datetime

from pymongo import MongoClient, errors

from data.constants import MongoDB, Errors, RequestsFields


class MongoHandler(MongoClient):

    def __init__(self):
        try:
            self.client = MongoClient(MongoDB.CONNECTION)
            self.locations = self.client.empatica.locations
            self.countries = self.client.empatica.countries
            self.time_ranges = self.client.empatica.time_ranges
        except (errors.ConnectionFailure, errors.ServerSelectionTimeoutError):
            print("{}: {}".format(Errors.MongoDBConnection, MongoDB.CONNECTION))
            self.client = None

    def all_countries(self):
        """
        Retrieves all the countries in mongoDB in the format {name: countryname, code: countrycode}
        :return: pymongo cursor
        """
        if not self.client:
            return Errors.MongoDBConnection

        try:
            locations = self.countries.find({}, {'_id': 0})
            return locations
        except TypeError as e:
            print('{}: {}'.format(Errors.MongoDBQuery, e))
            return Errors.MongoDBQuery

    def all_time_ranges(self):
        """
        Retrieves all the day times in mongoDB (morning, afternoon, evening, night)
        :return: pymongo cursor
        """
        if not self.client:
            return Errors.MongoDBConnection

        try:
            time_ranges = self.time_ranges.find({}, {'_id': 0})
            return time_ranges
        except TypeError as e:
            print('{}: {}'.format(Errors.MongoDBQuery, e))
            return Errors.MongoDBQuery

    def locations_in_range(self, start_date, end_date):
        """
        Retrieves all the download locations in mongoDB
        in the range start_date to end_date
        :param start_date: datetime
        :param end_date: datetime
        :return: pymongo cursor
        """
        if not self.client:
            return Errors.MongoDBConnection

        try:
            start_date = datetime.strptime(start_date, RequestsFields.get_date_format)
            end_date = datetime.strptime(end_date, RequestsFields.get_date_format)
        except ValueError as e:
            print('{}: {}'.format(Errors.InvalidDate, e))
            return Errors.InvalidDate

        try:
            locations = self.locations.find({RequestsFields.downloaded_at:
                                            {"$gte": start_date, "$lte": end_date}})
        except TypeError as e:
            print('{}: {}'.format(Errors.MongoDBQuery, e))
            return Errors.MongoDBQuery
        return locations

    def insert_one_location(self, request):
        """
        Insert in mongoDB some data
        :param request: data to insert
        :return: ok or error
        """
        try:
            return self.locations.insert_one(request)
        except TypeError as e:
            print('{}: {}'.format(Errors.MongoDBQuery, e))
            return Errors.MongoDBQuery






