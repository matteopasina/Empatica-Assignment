import unittest
from unittest.mock import Mock, patch

from core.geo import Geo

import sys
sys.modules['Nominatim'] = Mock()


class TestGeo(unittest.TestCase):

    def setUp(self):
        self.geo = Geo()

    @patch('Nominatim.reverse')
    def test_retrieve_location_nominatim(self, mocked_reverse):
        mocked_reverse.return_value = 'Italy'
        actual_data = self.geo.retrieve_location_nominatim({'latitude': 45, 'longitude': 9})
        expected_data = {'latitude': 45, 'longitude': 9, 'country': 'IT'}
        self.assertEqual(actual_data, expected_data)

