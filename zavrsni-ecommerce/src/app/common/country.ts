export class Country {
    constructor(public id: number,
                public name: string,
                public iso3: string,
                public numericCode: number,
                public iso2: string,
                public phoneCode: string,
                public capital: string,
                public currency: string,
                public currencyName: string,
                public region: string,
                public subregion: string){}
}
