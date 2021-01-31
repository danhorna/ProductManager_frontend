export function calcPercentage(price, percentage) {
    return (((price * percentage) / 100) + price);
}

export function orderHistoricalByDate(historical) {
    //older first
    historical.historicalPrices.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date)
    })
    return historical
}

export function orderHistoricalByDateFirst(historical) {
    //older last
    historical.historicalPrices.sort(function (a, b) {
        return new Date(a.date) - new Date(b.date)
    })
    return historical
}

export function generateChartData(historical) {
    let chartData = {
        labels: [],
        data: []
    };
    let historicalFirst = orderHistoricalByDateFirst(historical);
    historicalFirst.historicalPrices.forEach(obj => {
        let date = new Date(obj.date);
        let price = calcPercentage(obj.price, obj.iva);
        chartData.labels.push(date.toLocaleDateString());
        chartData.data.push(price.toFixed(2));
    });
    return chartData
}