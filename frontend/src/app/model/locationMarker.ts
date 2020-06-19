import { Location } from './location';

export class LocationMarker {
    position: {
        lat: number;
        lng: number;
    };
    options: {};
    title: string;
    appId: string;
    downloadedAt: Date;
    country: string;

    constructor(location: Location) {
        this.position = {
                          lat: location.latitude,
                          lng: location.longitude
                        };
        this.appId = location.app_id;
        this.downloadedAt = new Date(location.downloaded_at.$date);
        this.country = location.country;
    }
}