// eslint-disable-next-line max-classes-per-file
export class DecimalInfo {
    // eslint-disable-next-line no-useless-constructor
    private constructor(public divisorLong: number, public divisorDecimal: number, public digits: number) { }

    static CENTS = new DecimalInfo(100, 100, 2);

    static ZERO_DECIMAL = new DecimalInfo(1, 1, 0);
}

/**
 * Currency codes from https://stripe.com/docs/currencies.
 * Zero decimal currencies don't have a big unit (like US dollars) and little unit (like cents), they just have a
 * single unit. For example Japanese Yen.
 *
 * See https://stripe.com/docs/currencies#zero-decimal
 */
export class CurrencyCode {
    // eslint-disable-next-line no-useless-constructor
    constructor(public decimalInfo: DecimalInfo, public currencyCode: string) { }

    static get(currencyCode: string): CurrencyCode {
        const Currencies: { [key: string]: CurrencyCode } = {
            USD: new CurrencyCode(DecimalInfo.CENTS, 'USD'),

            AED: new CurrencyCode(DecimalInfo.CENTS, 'AED'),

            AFN: new CurrencyCode(DecimalInfo.CENTS, 'AFN'),

            ALL: new CurrencyCode(DecimalInfo.CENTS, 'ALL'),

            AMD: new CurrencyCode(DecimalInfo.CENTS, 'AMD'),

            ANG: new CurrencyCode(DecimalInfo.CENTS, 'ANG'),

            AOA: new CurrencyCode(DecimalInfo.CENTS, 'AOA'),

            ARS: new CurrencyCode(DecimalInfo.CENTS, 'ARS'),

            AUD: new CurrencyCode(DecimalInfo.CENTS, 'AUD'),

            AWG: new CurrencyCode(DecimalInfo.CENTS, 'AWG'),

            AZN: new CurrencyCode(DecimalInfo.CENTS, 'AZN'),

            BAM: new CurrencyCode(DecimalInfo.CENTS, 'BAM'),

            BBD: new CurrencyCode(DecimalInfo.CENTS, 'BBD'),

            BDT: new CurrencyCode(DecimalInfo.CENTS, 'BDT'),

            BGN: new CurrencyCode(DecimalInfo.CENTS, 'BGN'),

            BIF: new CurrencyCode(DecimalInfo.ZERO_DECIMAL, 'BIF'),

            BMD: new CurrencyCode(DecimalInfo.CENTS, 'BMD'),

            BND: new CurrencyCode(DecimalInfo.CENTS, 'BND'),

            BOB: new CurrencyCode(DecimalInfo.CENTS, 'BOB'),

            BRL: new CurrencyCode(DecimalInfo.CENTS, 'BRL'),

            BSD: new CurrencyCode(DecimalInfo.CENTS, 'BSD'),

            BWP: new CurrencyCode(DecimalInfo.CENTS, 'BWP'),

            BZD: new CurrencyCode(DecimalInfo.CENTS, 'BZD'),

            CAD: new CurrencyCode(DecimalInfo.CENTS, 'CAD'),

            CDF: new CurrencyCode(DecimalInfo.CENTS, 'CDF'),

            CHF: new CurrencyCode(DecimalInfo.CENTS, 'CHF'),

            CLP: new CurrencyCode(DecimalInfo.ZERO_DECIMAL, 'CLP'),

            CNY: new CurrencyCode(DecimalInfo.CENTS, 'CNY'),

            COP: new CurrencyCode(DecimalInfo.CENTS, 'COP'),

            CRC: new CurrencyCode(DecimalInfo.CENTS, 'CRC'),

            CVE: new CurrencyCode(DecimalInfo.CENTS, 'CVE'),

            CZK: new CurrencyCode(DecimalInfo.CENTS, 'CZK'),

            DJF: new CurrencyCode(DecimalInfo.ZERO_DECIMAL, 'DJF'),

            DKK: new CurrencyCode(DecimalInfo.CENTS, 'DKK'),

            DOP: new CurrencyCode(DecimalInfo.CENTS, 'DOP'),

            DZD: new CurrencyCode(DecimalInfo.CENTS, 'DZD'),

            EGP: new CurrencyCode(DecimalInfo.CENTS, 'EGP'),

            ETB: new CurrencyCode(DecimalInfo.CENTS, 'ETB'),

            EUR: new CurrencyCode(DecimalInfo.CENTS, 'EUR'),

            FJD: new CurrencyCode(DecimalInfo.CENTS, 'FJD'),

            FKP: new CurrencyCode(DecimalInfo.CENTS, 'FKP'),

            GBP: new CurrencyCode(DecimalInfo.CENTS, 'GBP'),

            GEL: new CurrencyCode(DecimalInfo.CENTS, 'GEL'),

            GIP: new CurrencyCode(DecimalInfo.CENTS, 'GIP'),

            GMD: new CurrencyCode(DecimalInfo.CENTS, 'GMD'),

            GNF: new CurrencyCode(DecimalInfo.ZERO_DECIMAL, 'GNF'),

            GTQ: new CurrencyCode(DecimalInfo.CENTS, 'GTQ'),

            GYD: new CurrencyCode(DecimalInfo.CENTS, 'GYD'),

            HKD: new CurrencyCode(DecimalInfo.CENTS, 'HKD'),

            HNL: new CurrencyCode(DecimalInfo.CENTS, 'HNL'),

            HRK: new CurrencyCode(DecimalInfo.CENTS, 'HRK'),

            HTG: new CurrencyCode(DecimalInfo.CENTS, 'HTG'),

            HUF: new CurrencyCode(DecimalInfo.CENTS, 'HUF'),

            IDR: new CurrencyCode(DecimalInfo.CENTS, 'IDR'),

            ILS: new CurrencyCode(DecimalInfo.CENTS, 'ILS'),

            INR: new CurrencyCode(DecimalInfo.CENTS, 'INR'),

            ISK: new CurrencyCode(DecimalInfo.CENTS, 'ISK'),

            JMD: new CurrencyCode(DecimalInfo.CENTS, 'JMD'),

            JPY: new CurrencyCode(DecimalInfo.ZERO_DECIMAL, 'JPY'),

            KES: new CurrencyCode(DecimalInfo.CENTS, 'KES'),

            KGS: new CurrencyCode(DecimalInfo.CENTS, 'KGS'),

            KHR: new CurrencyCode(DecimalInfo.CENTS, 'KHR'),

            KMF: new CurrencyCode(DecimalInfo.ZERO_DECIMAL, 'KMF'),

            KRW: new CurrencyCode(DecimalInfo.ZERO_DECIMAL, 'KRW'),

            KYD: new CurrencyCode(DecimalInfo.CENTS, 'KYD'),

            KZT: new CurrencyCode(DecimalInfo.CENTS, 'KZT'),

            LAK: new CurrencyCode(DecimalInfo.CENTS, 'LAK'),

            LBP: new CurrencyCode(DecimalInfo.CENTS, 'LBP'),

            LKR: new CurrencyCode(DecimalInfo.CENTS, 'LKR'),

            LRD: new CurrencyCode(DecimalInfo.CENTS, 'LRD'),

            LSL: new CurrencyCode(DecimalInfo.CENTS, 'LSL'),

            MAD: new CurrencyCode(DecimalInfo.CENTS, 'MAD'),

            MDL: new CurrencyCode(DecimalInfo.CENTS, 'MDL'),

            MGA: new CurrencyCode(DecimalInfo.ZERO_DECIMAL, 'MGA'),

            MKD: new CurrencyCode(DecimalInfo.CENTS, 'MKD'),

            MMK: new CurrencyCode(DecimalInfo.CENTS, 'MMK'),

            MNT: new CurrencyCode(DecimalInfo.CENTS, 'MNT'),

            MOP: new CurrencyCode(DecimalInfo.CENTS, 'MOP'),

            MRO: new CurrencyCode(DecimalInfo.CENTS, 'MRO'),

            MUR: new CurrencyCode(DecimalInfo.CENTS, 'MUR'),

            MVR: new CurrencyCode(DecimalInfo.CENTS, 'MVR'),

            MWK: new CurrencyCode(DecimalInfo.CENTS, 'MWK'),

            MXN: new CurrencyCode(DecimalInfo.CENTS, 'MXN'),

            MYR: new CurrencyCode(DecimalInfo.CENTS, 'MYR'),

            MZN: new CurrencyCode(DecimalInfo.CENTS, 'MZN'),

            NAD: new CurrencyCode(DecimalInfo.CENTS, 'NAD'),

            NGN: new CurrencyCode(DecimalInfo.CENTS, 'NGN'),

            NIO: new CurrencyCode(DecimalInfo.CENTS, 'NIO'),

            NOK: new CurrencyCode(DecimalInfo.CENTS, 'NOK'),

            NPR: new CurrencyCode(DecimalInfo.CENTS, 'NPR'),

            NZD: new CurrencyCode(DecimalInfo.CENTS, 'NZD'),

            PAB: new CurrencyCode(DecimalInfo.CENTS, 'PAB'),

            PEN: new CurrencyCode(DecimalInfo.CENTS, 'PEN'),

            PGK: new CurrencyCode(DecimalInfo.CENTS, 'PGK'),

            PHP: new CurrencyCode(DecimalInfo.CENTS, 'PHP'),

            PKR: new CurrencyCode(DecimalInfo.CENTS, 'PKR'),

            PLN: new CurrencyCode(DecimalInfo.CENTS, 'PLN'),

            PYG: new CurrencyCode(DecimalInfo.ZERO_DECIMAL, 'PYG'),

            QAR: new CurrencyCode(DecimalInfo.CENTS, 'QAR'),

            RON: new CurrencyCode(DecimalInfo.CENTS, 'RON'),

            RSD: new CurrencyCode(DecimalInfo.CENTS, 'RSD'),

            RUB: new CurrencyCode(DecimalInfo.CENTS, 'RUB'),

            RWF: new CurrencyCode(DecimalInfo.ZERO_DECIMAL, 'RWF'),

            SAR: new CurrencyCode(DecimalInfo.CENTS, 'SAR'),

            SBD: new CurrencyCode(DecimalInfo.CENTS, 'SBD'),

            SCR: new CurrencyCode(DecimalInfo.CENTS, 'SCR'),

            SEK: new CurrencyCode(DecimalInfo.CENTS, 'SEK'),

            SGD: new CurrencyCode(DecimalInfo.CENTS, 'SGD'),

            SHP: new CurrencyCode(DecimalInfo.CENTS, 'SHP'),

            SLL: new CurrencyCode(DecimalInfo.CENTS, 'SLL'),

            SOS: new CurrencyCode(DecimalInfo.CENTS, 'SOS'),

            SRD: new CurrencyCode(DecimalInfo.CENTS, 'SRD'),

            STD: new CurrencyCode(DecimalInfo.CENTS, 'STD'),

            SZL: new CurrencyCode(DecimalInfo.CENTS, 'SZL'),

            THB: new CurrencyCode(DecimalInfo.CENTS, 'THB'),

            TJS: new CurrencyCode(DecimalInfo.CENTS, 'TJS'),

            TOP: new CurrencyCode(DecimalInfo.CENTS, 'TOP'),

            TRY: new CurrencyCode(DecimalInfo.CENTS, 'TRY'),

            TTD: new CurrencyCode(DecimalInfo.CENTS, 'TTD'),

            TWD: new CurrencyCode(DecimalInfo.CENTS, 'TWD'),

            TZS: new CurrencyCode(DecimalInfo.CENTS, 'TZS'),

            UAH: new CurrencyCode(DecimalInfo.CENTS, 'UAH'),

            UGX: new CurrencyCode(DecimalInfo.ZERO_DECIMAL, 'UGX'),

            UYU: new CurrencyCode(DecimalInfo.CENTS, 'UYU'),

            UZS: new CurrencyCode(DecimalInfo.CENTS, 'UZS'),

            VND: new CurrencyCode(DecimalInfo.ZERO_DECIMAL, 'VND'),

            VUV: new CurrencyCode(DecimalInfo.ZERO_DECIMAL, 'VUV'),

            WST: new CurrencyCode(DecimalInfo.CENTS, 'WST'),

            XAF: new CurrencyCode(DecimalInfo.ZERO_DECIMAL, 'XAF'),

            XCD: new CurrencyCode(DecimalInfo.CENTS, 'XCD'),

            XOF: new CurrencyCode(DecimalInfo.ZERO_DECIMAL, 'XOF'),

            XPF: new CurrencyCode(DecimalInfo.ZERO_DECIMAL, 'XPF'),

            YER: new CurrencyCode(DecimalInfo.CENTS, 'YER'),

            ZAR: new CurrencyCode(DecimalInfo.CENTS, 'ZAR'),

            ZMW: new CurrencyCode(DecimalInfo.CENTS, 'ZMW'),
        };
        const code = Currencies[currencyCode.toUpperCase()];
        if (!code) {
            throw Error('uknown currency code.');
        }
        return code;
    }
}

export class Money {
    private _atomicUnits: number;

    // eslint-disable-next-line no-underscore-dangle
    public get atomicUnits() { return this._atomicUnits; }

    private _majorUnits: number;

    // eslint-disable-next-line no-underscore-dangle
    public get majorUnits() { return this._majorUnits; }

    private currency;

    // eslint-disable-next-line no-useless-constructor
    private constructor(arg: { atomicUnits?: number, majorUnits?: number, currency: CurrencyCode }) {
        this.currency = arg.currency;
        if (arg.atomicUnits != null && !Number.isNaN(arg.atomicUnits)) {
            // eslint-disable-next-line no-underscore-dangle
            this._atomicUnits = arg.atomicUnits;
            // eslint-disable-next-line no-underscore-dangle
            this._majorUnits = Money.toMajorFromAtomicUnits(arg.atomicUnits, arg.currency);
        } else if (arg.majorUnits != null && !Number.isNaN(arg.majorUnits)) {
            // eslint-disable-next-line no-underscore-dangle
            this._majorUnits = arg.majorUnits;
            // eslint-disable-next-line no-underscore-dangle
            this._atomicUnits = Money.toAtomicFromMajorUnits(arg.majorUnits, arg.currency);
        } else {
            throw Error('one of atomicUnits or majorUnits should be set.');
        }
    }

    private static toMajorFromAtomicUnits(atomicUnits: number, currency: CurrencyCode): number {
        return +(atomicUnits / currency.decimalInfo.divisorDecimal).toFixed(currency.decimalInfo.digits);
    }

    private static toAtomicFromMajorUnits(majorUnits: number, currency: CurrencyCode): number {
        return (majorUnits * currency.decimalInfo.divisorDecimal);
    }

    static fromAtomic(atomicUnits: number, currency: CurrencyCode | string) {
        let currency_code: CurrencyCode;
        if (typeof currency === "string") {
            currency_code = CurrencyCode.get(currency)
        } else {
            currency_code = currency;
        }
        return new Money({ atomicUnits, currency: currency_code });
    }


    static fromMajor(majorUnits: number, currency: CurrencyCode) {
        return new Money({ majorUnits, currency });
    }

    /**
      * Format an amount, e.g. "$12.34" or "¥1000".
      *
      * The symbol used comes from the currency code; the provided locale determines
      * other formatting details like whether the symbol goes before or after the number,
      * whether points or commas are used for decimal separation, etc.
      */
    public format(locale: string): string {
        const formatter = new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: this.currency.currencyCode,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            // currencyDisplay: "narrowSymbol"
        });
        return formatter.format(this.majorUnits);
    }
}