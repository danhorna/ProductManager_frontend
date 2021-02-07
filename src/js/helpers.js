export function calcPercentage(price, percentage) {
    return (((price * percentage) / 100) + price);
}

export function orderHistoricalByDateLast(historical) {
    //older last
    let aux = historical.slice(0);
    aux.sort(function (a, b) {
        return new Date(a.date) - new Date(b.date)
    })
    return aux
}

export function orderHistoricalByDateFirst(historical) {
    //older first
    let aux = historical.slice(0);
    aux.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date)
    })
    return aux
}

export function generateChartData(historical) {
    let chartData = {
        labels: [],
        data: []
    };
    historical.forEach(obj => {
        let date = new Date(obj.date);
        let price = calcPercentage(obj.price, obj.iva);
        chartData.labels.push(date.toLocaleDateString());
        chartData.data.push(price.toFixed(2));
    });
    return chartData
}