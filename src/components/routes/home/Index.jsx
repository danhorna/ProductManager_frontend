import React, {useState, useEffect} from 'react';
import ProductsTable from './ProductsTable'
import { getAllProducts } from '../../../js/apicalls';
import Loading from '../../utils/Loading';

function HomeIndex() {
    const [state, setState] = useState({
        loaded: false,
        data: []
    })

    useEffect(()=>{
        const fetchData = async() => {
            let products = await getAllProducts();
            setState({
                loaded: true,
                data: products
            })
        }
        if (!state.loaded) {
            fetchData()
        }
    })

    return (
        <div className="page-content mt-4 h-100">
            <div className="container h-100">
                <div className="row h-100">
                    <div className="col-12">
                        {!state.loaded ? <Loading type="spin" color="white"/> : <ProductsTable list={state.data}/>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeIndex