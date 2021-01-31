export function calcPercentage(price,percentage) {
    return (((price * percentage) / 100) + price);
}

export function orderHistoricalByDate(historical) {
    historical.historicalPrices.sort(function(a,b){
        return new Date(b.date) - new Date(a.date)
    })
    return historical
}