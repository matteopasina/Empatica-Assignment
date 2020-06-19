import pycountry
from geopy.geocoders import Nominatim
from geopy.exc import GeocoderServiceError

from data.constants import Errors, RequestsFields


class Geo:

    def __init__(self):
        self.geolocator = Nominatim(user_agent="empatica_assignment")
        self.countries_name_to_code = {country.name: country.alpha_2 for country in pycountry.countries}

    def retrieve_location_nominatim(self, request):
        """
        Retrieve country code using Nominatim reverse geocoding and pycountry
        Nominatim takes in input lat and lng and returns the english name of the country where
        the coordinates are
        The limitation is that Nominatim returns the name and not the country code, so we need
        pycountry to match the name with the country code, unfortunately some countries have
        different names in Nominatim and in pycountry so the code is not found (Russia)
        :param request: request with lat and lng
        :return: request with country field
        """

        try:
            location = self.geolocator.reverse((request[RequestsFields.latitude],
                                                request[RequestsFields.longitude]),
                                               language='en',
                                               zoom=0)
            if location:
                if location.address == 'Russia':
                    code = 'RU'
                else:
                    code = self.countries_name_to_code.get(location.address)
                request[RequestsFields.country] = code
                if code:
                    return request
            else:
                print('Nothing found')

        except GeocoderServiceError as e:
            print('{}: {}'.format(Errors.Geocoder, e))
            return Errors.Geocoder