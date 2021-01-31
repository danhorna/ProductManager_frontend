import React from 'react';
import { Line } from "react-chartjs-2";
import Paper from '@material-ui/core/Paper';



function ChartBox({ chartData }) {
    const decimals = 0
    const data = {
        labels: chartData.labels,
        datasets: [
            {
                label: "Second dataset",
                data: chartData.data,
                fill: false,
                borderColor: "#742774"
            }
        ]
    };

    return (
        <React.Fragment>
            <Paper className="bg-light p-4">
                <Line
                    data={data}
                    options={{
                        title: {
                            display: true,
                            text: 'Historial de precios(proveedor + iva)',
                            fontSize: 20
                        },
                        legend: {
                            display: false
                        },
                        tooltips: {
                            callbacks: {
                                label: function (tooltipItem) {
                                    return tooltipItem.yLabel;
                                }
                            }
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    // Include a dollar sign in the ticks
                                    callback: function(value, index, values) {
                                        return '$' + value.toFixed(decimals);
                                    }
                                }
                            }]
                        }
                    }}
                />
            </Paper>
        </React.Fragment>
    )
}

export default ChartBox;