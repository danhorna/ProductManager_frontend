import React, {useState, useEffect} from 'react';
import ProductsTable from './ProductsTable'
import { getAllProducts } from '../../../js/apicalls';

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

    function loading() {
        return <p>Cargando</p>
    }

    return (
        <div className="page-content mt-4">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        {!state.loaded ? loading() : <ProductsTable list={state.data}/>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeIndex