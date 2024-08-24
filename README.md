### Stripe report generato

This script can generate stripe reports on the following format:

### interface used
```ts
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
```

## JSON
```json
{
  "currency": "USD",
  "eventLabel": "india_yuridia.01",
  "totalTicketsCount": 128,
  "chargesRefundedCount": 2,
  "totalAmountCharged": "$18,935.86",
  "totalAmountChargedBase": "$15,912.00",
  "totalsByTicketType": {
    "P5": {
      "basePrice": "$79.00",
      "ticketCount": 20,
      "total": "$1,580.00"
    },
    "P1": {
      "basePrice": "$159.00",
      "ticketCount": 66,
      "total": "$10,494.00"
    },
    "P3": {
      "basePrice": "$119.00",
      "ticketCount": 4,
      "total": "$476.00"
    },
    "P6": {
      "basePrice": "$59.00",
      "ticketCount": 14,
      "total": "$826.00"
    },
    "P4": {
      "basePrice": "$99.00",
      "ticketCount": 20,
      "total": "$1,980.00"
    },
    "P2": {
      "basePrice": "$139.00",
      "ticketCount": 4,
      "total": "$556.00"
    }
  }
}
```

## Text based
```txt
Event: india_yuridia.01
Currency: USD
Total Amount Charged: $18,935.86
Total Amount Charged (Base): $15,912.00
Charges Refunded Count: 2
Ticket Count: 128

Breakdown by Ticket Type:
  Ticket Type: P1
    Base Price: $159.00
    Ticket Count: 66
    Total: $10,494.00

  Ticket Type: P2
    Base Price: $139.00
    Ticket Count: 4
    Total: $556.00

  Ticket Type: P3
    Base Price: $119.00
    Ticket Count: 4
    Total: $476.00

  Ticket Type: P4
    Base Price: $99.00
    Ticket Count: 20
    Total: $1,980.00

  Ticket Type: P5
    Base Price: $79.00
    Ticket Count: 20
    Total: $1,580.00

  Ticket Type: P6
    Base Price: $59.00
    Ticket Count: 14
    Total: $826.00


```