export class Filter {
    countryCode: string;
    timeOfDay: number[];
    identifier: string;

    constructor() {
        this.countryCode = null;
        this.timeOfDay = null;
        this.identifier = null;
    }
}