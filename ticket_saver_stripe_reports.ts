import Stripe from "stripe";
import fs from "fs";
import { Money, CurrencyCode } from "./money";

interface IChargesMetadata {
    event_label: string;
    ticket_metadata: string
}

interface ITicketMetadata {
    seat: string;
    zone: string;
    price_type: string;
    base_price_major_units: number;
}

// All Amounts are in localized currency. for example, $10.00 for en_US or 10.00€ for fr_FR
interface ReportResult {
    currency: string,
    eventLabel: string,
    totalTicketsCount: number,
    chargesRefundedCount: number,
    totalAmountCharged: string,
    totalAmountChargedBase: string,
    totalsByTicketType: {
        [price_type: string]: {
            basePrice: string,
            ticketCount: number,
            total: string
        }
    }
}

async function getChargesWithMetadataMock(
    file: string,
    key: string, value: string
): Promise<Stripe.Charge[]> {
    const mockJson = fs.readFileSync(file, 'utf8');
    let charges: Stripe.Charge[] = JSON.parse(mockJson);
    return charges.filter(charge => charge.metadata[key] === value);
}

async function getChargesByMetadata(
    stripe: Stripe,
    key: string, value: string
): Promise<Stripe.Charge[]> {
    let charges: Stripe.Charge[] = [];
    let page: undefined | string = undefined;
    do {
        const result = await stripe.charges.search({
            limit: 100,
            query: `metadata[\'${key}\']:\'${value}\'`,
            page
        });
        page = result.has_more && result.next_page || undefined
        charges.push(...result.data);
    } while (page)
    return charges;
}

function processChargesWithMetadata(
    eventLabel: string,
    charges: Stripe.Charge[],
    locale: string = 'en-US'
): ReportResult {
    let currency = CurrencyCode.get(charges[0].currency);
    let chargesRefundedCount = 0;
    let totalAmountCharged = 0;
    let totalAmountChargedBaseAtomic = 0;
    let totalTicketsCount = 0;
    const totalsByTicketTypeAtomic: {
        [price_type: string]: {
            basePriceAtomic: number,
            ticketCount: number,
            totalAtomic: number
        }
    } = {};

    for (const charge of charges) {
        const metadata = charge.metadata as unknown as IChargesMetadata;
        const chargeCurrency = CurrencyCode.get(charge.currency);
        if (chargeCurrency.currencyCode !== currency.currencyCode) {
            throw new Error(`Currency mismatch: ${chargeCurrency.currencyCode} and ${currency.currencyCode}`);
        }
        if (charge.refunded) {
            chargesRefundedCount++;
            continue;
        }

        if(!charge.paid){
            continue;
        }

        if (metadata.ticket_metadata === undefined) {
            console.log(`charge ${charge.id} has no ticket_metadata`);
            continue;
        }
        totalAmountCharged += charge.amount;
        const ticketMetadata = JSON.parse(metadata.ticket_metadata) as ITicketMetadata[];
        ticketMetadata.sort((a, b) => a.base_price_major_units - b.base_price_major_units);
        for (const ticket of ticketMetadata) {
            const basePrice = Money.fromMajor(ticket.base_price_major_units, currency);
            if (!totalsByTicketTypeAtomic[ticket.price_type]) {
                totalsByTicketTypeAtomic[ticket.price_type] = {
                    basePriceAtomic: basePrice.atomicUnits,
                    ticketCount: 0,
                    totalAtomic: 0
                };
            }
            totalTicketsCount++;
            totalsByTicketTypeAtomic[ticket.price_type].ticketCount++;
            totalsByTicketTypeAtomic[ticket.price_type].totalAtomic += basePrice.atomicUnits;
            totalAmountChargedBaseAtomic += basePrice.atomicUnits;
        }
    }

    return {
        currency: currency.currencyCode,
        eventLabel,
        totalTicketsCount,
        chargesRefundedCount,
        totalAmountCharged: Money.fromAtomic(totalAmountCharged, currency).format(locale),
        totalAmountChargedBase: Money.fromAtomic(totalAmountChargedBaseAtomic, currency).format(locale),
        totalsByTicketType: Object.fromEntries(
            Object.entries(totalsByTicketTypeAtomic).map(([price_type, { basePriceAtomic, ticketCount, totalAtomic }]) => {
                return [price_type, {
                    basePrice: Money.fromAtomic(basePriceAtomic, currency).format(locale),
                    ticketCount,
                    total: Money.fromAtomic(totalAtomic, currency).format(locale)
                }]
            })
        )
    }
}

function exportReportResult(report: ReportResult): string {
    let output = '';

    output += `Event: ${report.eventLabel}\n`;
    output += `Currency: ${report.currency}\n`;
    output += `Total Amount Charged: ${report.totalAmountCharged}\n`;
    output += `Total Amount Charged (Base): ${report.totalAmountChargedBase}\n`;
    output += `Charges Refunded Count: ${report.chargesRefundedCount}\n`;
    output += `Ticket Count: ${report.totalTicketsCount}\n\n`;

    output += `Breakdown by Ticket Type:\n`;
    
    const sortedTotals = Object.entries(report.totalsByTicketType).sort(
        ([a], [b]) => a.localeCompare(b)
    )

    for (const [ticketType, details] of sortedTotals) {
        output += `  Ticket Type: ${ticketType}\n`;
        output += `    Base Price: ${details.basePrice}\n`;
        output += `    Ticket Count: ${details.ticketCount}\n`;
        output += `    Total: ${details.total}\n\n`;
    }

    return output;
}

// Example usage
(async () => {
    const eventLabelKey = 'event_label';
    const eventLabel = 'india_yuridia.01';
    // replace with getChargesByMetadata when ready
    // const charges = await getChargesByMetadata(stripe, eventLabelKey, eventLabel);
    const charges = await getChargesWithMetadataMock('charges-dryrun.json', eventLabelKey, eventLabel);
    const result = processChargesWithMetadata(eventLabel, charges);
    const output = exportReportResult(result);
    console.log(result);
    console.log('\n\n\n\n\n');
    console.log(output);
})()