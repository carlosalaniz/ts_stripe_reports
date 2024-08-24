
export interface ITicketSale {
    eventLabel: string;
    ticketMetadata: ITicketMetadata[]
}

export interface IChargesMetadata  {
    el: string;
    tm: string;
    [key: string]: any;
} 

export interface ITicketMetadata {
    seat: string;
    priceType: string;
    basePriceMajorUnits: number;
    comp: boolean;
}

// All Amounts are in localized currency. for example, $10.00 for en_US or 10.00€ for fr_FR
export interface ReportResult {
    currency: string,
    eventLabel: string,
    totalTicketsCount: number,
    chargesRefundedCount: number,
    totalChargedAmount: string,
    totalChargedBaseAmount: string,
    totalsByTicketType: {
        [price_type: string]: {
            basePrice: string,
            ticketCount: number,
            totalAmount: string,
            netAmount: string,
            compsCount: number,
        }
    }
}

export function serializeTicketMetadata(ticketMetadataList: ITicketMetadata[]): string {
    return ticketMetadataList.map((ticketMetadata) => `${ticketMetadata.seat},${ticketMetadata.priceType},${ticketMetadata.basePriceMajorUnits},${ticketMetadata.comp ? 1 : 0}`).join(";");
}

export function deserializeTicketMetadata(serializedTicketMetadata: string): ITicketMetadata[] {
    return serializedTicketMetadata.split(";").map((ticketMetadataString) => {
        const [seat, priceType, basePriceMajorUnitsString, compString] = ticketMetadataString.split(",");
        return {
            seat,
            priceType,
            basePriceMajorUnits: parseInt(basePriceMajorUnitsString),
            comp: compString === "1"
        }
    });
}

export function ticketSaleToChargeMetadata(ticketSale: ITicketSale): IChargesMetadata {
    return {
        el: ticketSale.eventLabel,
        tm: serializeTicketMetadata(ticketSale.ticketMetadata)
    }
}

export function chargeMetadataToTicketSale(metadata: IChargesMetadata): ITicketSale {
    return {
        eventLabel: metadata.el,
        ticketMetadata: deserializeTicketMetadata(metadata.tm)
    }
}
// tests
function testSerializeDeserializeTicketMetadata() {
    const ticketMetadataList: ITicketMetadata[] = [{
        seat: "A1",
        priceType: "Adult",
        basePriceMajorUnits: 1000,
        comp: false
    },
    {
        seat: "A2",
        priceType: "Adult",
        basePriceMajorUnits: 1000,
        comp: false
    },
    {
        seat: "A3",
        priceType: "Adult",
        basePriceMajorUnits: 1000,
        comp: false
    },
    {
        seat: "A4",
        priceType: "Adult",
        basePriceMajorUnits: 1000,
        comp: false
    },
    {
        seat: "A5",
        priceType: "Adult",
        basePriceMajorUnits: 1000,
        comp: false
    },
    {
        seat: "A6",
        priceType: "Adult",
        basePriceMajorUnits: 1000,
        comp: false
    },
    {
        seat: "A7",
        priceType: "Adult",
        basePriceMajorUnits: 1000,
        comp: false
    },
    {
        seat: "A8",
        priceType: "Adult",
        basePriceMajorUnits: 1000,
        comp: false
    },
    {
        seat: "A9",
        priceType: "Adult",
        basePriceMajorUnits: 1000,
        comp: false
    },
    {
        seat: "A10",
        priceType: "Adult",
        basePriceMajorUnits: 1000,
        comp: false
    },
    {
        seat: "A11",
        priceType: "Adult",
        basePriceMajorUnits: 1000,
        comp: false
    },
    {
        seat: "A12",
        priceType: "Adult",
        basePriceMajorUnits: 1000,
        comp: false
    },
    {
        seat: "A13",
        priceType: "Adult",
        basePriceMajorUnits: 1000,
        comp: false
    },
    {
        seat: "A14",
        priceType: "Adult",
        basePriceMajorUnits: 1000,
        comp: false
    },
    {
        seat: "A15",
        priceType: "Adult",
        basePriceMajorUnits: 1000,
        comp: false
    },
    {
        seat: "A16",
        priceType: "Adult",
        basePriceMajorUnits: 1000,
        comp: false
    }
    ]
    const serialized = serializeTicketMetadata(ticketMetadataList);
    const deserialized = deserializeTicketMetadata(serialized);
    console.log(ticketMetadataList, serialized, deserialized);
}
// testSerializeDeserializeTicketMetadata()