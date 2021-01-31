import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../utils/Loading';
import { getProductById, getHistoricalByProductCode } from '../../../js/apicalls';
import InformationBox from './InformationBox';
import PricesBox from './PricesBox';
import { orderHistoricalByDate } from '../../../js/helpers';

function ProductIndex() {

    const [state, setState] = useState({
        loading: true,
        productData: null
    })

    const { productid } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            let product = await getProductById(productid);
            let historical = await getHistoricalByProductCode(product.code);
            let historicalOrdered = orderHistoricalByDate(historical);
            setState({
                loading: false,
                productData: product,
                historical: historicalOrdered
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
                            <PricesBox product={state.productData} historical={state.historical}/>
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