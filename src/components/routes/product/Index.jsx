import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../utils/Loading';
import { getProductById, getHistoricalByProductId } from '../../../js/apicalls';
import InformationBox from './InformationBox';
import PricesBox from './PricesBox';
import { orderHistoricalByDateFirst, orderHistoricalByDateLast, generateChartData } from '../../../js/helpers';
import ChartBox from './ChartBox';

function ProductIndex() {

    const [state, setState] = useState({
        loading: true,
        productData: null
    })

    const { productid } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            const product = await getProductById(productid);
            const historical = await getHistoricalByProductId(productid);
            const historicalOrderedFirst = orderHistoricalByDateFirst(historical.historicalPrices);
            const historicalOrderedLast = orderHistoricalByDateLast(historical.historicalPrices);
            const chartData = generateChartData(historicalOrderedLast);
            setState({
                loading: false,
                productData: product,
                historical: historicalOrderedFirst,
                chartData
            })
        }
        if (state.loading) {
            fetchData()
        }
    })

    function content() {
        return (
            <div className="m-4">
                <div className="container p-0">
                    <div className="row">
                        <div className="col-md-6">
                            <InformationBox product={state.productData} /></div>
                        <div className="col-md-6">
                            <PricesBox product={state.productData}/>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-12">
                            <ChartBox chartData={state.chartData}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="page-content h-100">
            {state.loading ? <Loading type="spin" color="white" /> : content()}
        </div>
    )
}

export default ProductIndex;