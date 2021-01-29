import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../utils/Loading';
import { getProductById } from '../../../js/apicalls';

function ProductIndex() {

    const [state, setState] = useState({
        loading: true,
        productData: null
    })

    const { productid } = useParams()

    useEffect(() => {
        const fetchData = async() => {
            let product = await getProductById(productid);
            setState({
                loading: false,
                productData: product
            })
        }
        if (state.loading) {
            fetchData()
        }
    })

    return (
        <div className="page-content h-100">
            {state.loading ? <Loading type="spin" color="white" /> : ""}
        </div>
    )
}

export default ProductIndex;