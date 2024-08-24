import Stripe from "stripe";
import fs from "fs";
import { Money, CurrencyCode } from "./money";
import { ReportResult, IChargesMetadata, ITicketMetadata, deserializeTicketMetadata, ticketSaleToChargeMetadata, chargeMetadataToTicketSale } from "./helpers";


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
            totalAtomic: number,
            netAtominc: number,
            compsCount: number,
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

        if (!charge.paid) {
            continue;
        }

        if (metadata.tm === undefined) {
            console.log(`charge ${charge.id} has no ticket_metadata`);
            continue;
        }

        totalAmountCharged += charge.amount;
        const ticketMetadata = chargeMetadataToTicketSale(metadata).ticketMetadata;
        ticketMetadata.sort((a, b) => a.basePriceMajorUnits - b.basePriceMajorUnits);
        for (const ticket of ticketMetadata) {
            const basePrice = Money.fromMajor(ticket.basePriceMajorUnits, currency);
            if (!totalsByTicketTypeAtomic[ticket.priceType]) {
                totalsByTicketTypeAtomic[ticket.priceType] = {
                    basePriceAtomic: basePrice.atomicUnits,
                    compsCount: 0,
                    ticketCount: 0,
                    totalAtomic: 0,
                    netAtominc: 0,
                };
            }
            totalTicketsCount++;
            totalsByTicketTypeAtomic[ticket.priceType].ticketCount++;
            totalsByTicketTypeAtomic[ticket.priceType].totalAtomic += basePrice.atomicUnits;
            if (ticket.comp) {
                totalsByTicketTypeAtomic[ticket.priceType].compsCount++;
            } else {
                totalsByTicketTypeAtomic[ticket.priceType].netAtominc += basePrice.atomicUnits;
            }
            totalAmountChargedBaseAtomic += basePrice.atomicUnits;
        }
    }

    return {
        currency: currency.currencyCode,
        eventLabel,
        totalTicketsCount,
        chargesRefundedCount,
        totalChargedAmount: Money.fromAtomic(totalAmountCharged, currency).format(locale),
        totalChargedBaseAmount: Money.fromAtomic(totalAmountChargedBaseAtomic, currency).format(locale),
        totalsByTicketType: Object.fromEntries(
            Object.entries(totalsByTicketTypeAtomic).map(([price_type, ticketTotals]) => {
                return [price_type, {
                    basePrice: Money.fromAtomic(ticketTotals.basePriceAtomic, currency).format(locale),
                    ticketCount: ticketTotals.ticketCount,
                    totalAmount: Money.fromAtomic(ticketTotals.totalAtomic, currency).format(locale),
                    netAmount: Money.fromAtomic(ticketTotals.netAtominc, currency).format(locale),
                    compsCount: ticketTotals.compsCount,
                }]
            })
        )
    }
}

function exportReportResult(report: ReportResult): string {
    let output = '';

    output += `Event: ${report.eventLabel}\n`;
    output += `Currency: ${report.currency}\n`;
    output += `Total Amount Charged: ${report.totalChargedAmount}\n`;
    output += `Total Amount Charged (Base): ${report.totalChargedBaseAmount}\n`;
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
        output += `    TotalAmount: ${details.totalAmount}\n`;
        output += `    Comps: ${details.compsCount}\n`;
        output += `    Net Amount: ${details.netAmount}\n\n`;
    }

    return output;
}

function generateReportTxt(stripe:Stripe, eventLabel:string){
    const EVENT_LABEL_KEY: keyof IChargesMetadata = 'el';
    // switch to getChargesByMetadata when ready
    const charges = getChargesWithMetadataMock('charges-dryrun.json', EVENT_LABEL_KEY, eventLabel);
    // const charges = getChargesByMetadata(stripe, EVENT_LABEL_KEY, eventLabel);
}


// Example usage
(async () => {
    const eventLabelKey = 'el';
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