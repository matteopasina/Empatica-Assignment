import { Location } from 'src/app/model/location';
import { selectWithFilters } from './location.selectors';
import { Filter } from 'src/app/model/filter';

describe('Selectors', () => {

    it('should return italian locations', () => {
        const allLocations: Array<Location> = [
            {
                latitude: 46,
                longitude: 73,
                app_id: 'IOS_MATE',
                downloaded_at: {
                $date: 1591366035000
                },
                country: 'IT',
                id: '1'
            },
            {
                latitude: 25,
                longitude: -4,
                app_id: 'ANDROID_ALERT',
                downloaded_at: {
                $date: 1591401287000
                },
                country: 'IT',
                id: '2'
            },
            {
                latitude: 40,
                longitude: 43,
                app_id: 'ANDROID_ALERT',
                downloaded_at: {
                $date: 1591595455000
                },
                country: 'TR',
                id: '3'
            },
            {
                latitude: 31,
                longitude: 93,
                app_id: 'ANDROID_ALERT',
                downloaded_at: {
                $date: 1591585752000
                },
                country: 'CN',
                id: '4'
            },
        ];
        const expectedLocations: Array<Location> = [
            {
                latitude: 46,
                longitude: 73,
                app_id: 'IOS_MATE',
                downloaded_at: {
                $date: 1591366035000
                },
                country: 'IT',
                id: '1'
            },
            {
                latitude: 25,
                longitude: -4,
                app_id: 'ANDROID_ALERT',
                downloaded_at: {
                $date: 1591401287000
                },
                country: 'IT',
                id: '2'
            }
        ]
        const filter = new Filter();
        filter.countryCode = 'It';
        const props = {filters: filter};
        expect(selectWithFilters.projector(allLocations, props)).toEqual(expectedLocations);
    })

    it('should return IOS_MATE locations', () => {
        const allLocations: Array<Location> = [
            {
                latitude: 46,
                longitude: 73,
                app_id: 'IOS_MATE',
                downloaded_at: {
                $date: 1591366035000
                },
                country: 'IT',
                id: '1'
            },
            {
                latitude: 25,
                longitude: -4,
                app_id: 'ANDROID_ALERT',
                downloaded_at: {
                $date: 1591401287000
                },
                country: 'IT',
                id: '2'
            },
            {
                latitude: 40,
                longitude: 43,
                app_id: 'ANDROID_ALERT',
                downloaded_at: {
                $date: 1591595455000
                },
                country: 'TR',
                id: '3'
            },
            {
                latitude: 31,
                longitude: 93,
                app_id: 'ANDROID_ALERT',
                downloaded_at: {
                $date: 1591585752000
                },
                country: 'CN',
                id: '4'
            },
        ];
        const expectedLocations: Array<Location> = [
            {
                latitude: 46,
                longitude: 73,
                app_id: 'IOS_MATE',
                downloaded_at: {
                $date: 1591366035000
                },
                country: 'IT',
                id: '1'
            },
        ]
        const filter = new Filter();
        filter.identifier = 'IOS_MATE';
        const props = {filters: filter};
        expect(selectWithFilters.projector(allLocations, props)).toEqual(expectedLocations);
    })

    it('should return Morning locations', () => {
        const allLocations: Array<Location> = [
            {
                latitude: 46,
                longitude: 73,
                app_id: 'IOS_MATE',
                downloaded_at: {
                $date: 1591366035000
                },
                country: 'IT',
                id: '1'
            },
            {
                latitude: 25,
                longitude: -4,
                app_id: 'ANDROID_ALERT',
                downloaded_at: {
                $date: 1591401287000
                },
                country: 'IT',
                id: '2'
            },
            {
                latitude: 40,
                longitude: 43,
                app_id: 'ANDROID_ALERT',
                downloaded_at: {
                $date: 1591595455000
                },
                country: 'TR',
                id: '3'
            },
            {
                latitude: 31,
                longitude: 93,
                app_id: 'ANDROID_ALERT',
                downloaded_at: {
                $date: 1591585752000
                },
                country: 'CN',
                id: '4'
            },
        ];
        const expectedLocations: Array<Location> = [
            {
                latitude: 40,
                longitude: 43,
                app_id: 'ANDROID_ALERT',
                downloaded_at: {
                $date: 1591595455000
                },
                country: 'TR',
                id: '3'
            },
        ]
        const filter = new Filter();
        filter.timeOfDay = [6, 11];
        const props = {filters: filter};
        expect(selectWithFilters.projector(allLocations, props)).toEqual(expectedLocations);
    })

    it('should return Morning and ANDROID_ALERT locations', () => {
        const allLocations: Array<Location> = [
            {
                latitude: 46,
                longitude: 73,
                app_id: 'IOS_MATE',
                downloaded_at: {
                $date: 1591366035000
                },
                country: 'IT',
                id: '1'
            },
            {
                latitude: 25,
                longitude: -4,
                app_id: 'ANDROID_ALERT',
                downloaded_at: {
                $date: 1591401287000
                },
                country: 'IT',
                id: '2'
            },
            {
                latitude: 40,
                longitude: 43,
                app_id: 'ANDROID_ALERT',
                downloaded_at: {
                $date: 1591595455000
                },
                country: 'TR',
                id: '3'
            },
            {
                latitude: 31,
                longitude: 93,
                app_id: 'ANDROID_ALERT',
                downloaded_at: {
                $date: 1591585752000
                },
                country: 'CN',
                id: '4'
            },
            {
                latitude: 40,
                longitude: 43,
                app_id: 'IOS_MATE',
                downloaded_at: {
                $date: 1591595455000
                },
                country: 'TR',
                id: '5'
            },
        ];
        const expectedLocations: Array<Location> = [
            {
                latitude: 40,
                longitude: 43,
                app_id: 'ANDROID_ALERT',
                downloaded_at: {
                $date: 1591595455000
                },
                country: 'TR',
                id: '3'
            },
        ]
        const filter = new Filter();
        filter.identifier = 'ANDROID_ALERT';
        filter.timeOfDay = [6, 11];
        const props = {filters: filter};
        expect(selectWithFilters.projector(allLocations, props)).toEqual(expectedLocations);
    })

    it('should return italian and afternoon and ANDROID_ALERT locations', () => {
        const allLocations: Array<Location> = [
            {
                latitude: 46,
                longitude: 73,
                app_id: 'IOS_MATE',
                downloaded_at: {
                $date: 1591366035000
                },
                country: 'IT',
                id: '1'
            },
            {
                latitude: 25,
                longitude: -4,
                app_id: 'ANDROID_ALERT',
                downloaded_at: {
                $date: 1591401287000
                },
                country: 'IT',
                id: '2'
            },
            {
                latitude: 40,
                longitude: 43,
                app_id: 'ANDROID_ALERT',
                downloaded_at: {
                $date: 1591595455000
                },
                country: 'TR',
                id: '3'
            },
            {
                latitude: 31,
                longitude: 93,
                app_id: 'ANDROID_ALERT',
                downloaded_at: {
                $date: 1591585752000
                },
                country: 'CN',
                id: '4'
            },
            {
                latitude: 40,
                longitude: 43,
                app_id: 'IOS_MATE',
                downloaded_at: {
                $date: 1591595455000
                },
                country: 'it',
                id: '5'
            },
        ];
        const expectedLocations: Array<Location> = [
            {
                latitude: 40,
                longitude: 43,
                app_id: 'IOS_MATE',
                downloaded_at: {
                $date: 1591595455000
                },
                country: 'it',
                id: '5'
            },
        ]
        const filter = new Filter();
        filter.identifier = 'IOS_MATE';
        filter.timeOfDay = [6, 11];
        filter.countryCode = 'it';
        const props = {filters: filter};
        expect(selectWithFilters.projector(allLocations, props)).toEqual(expectedLocations);
    })

})
