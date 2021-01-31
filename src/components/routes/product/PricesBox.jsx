import React from 'react';

function PricesBox({ product, historical }) {

    function getLastHistorical() {
        const lastDate = new Date(historical.historicalPrices[0].date)
        return lastDate.toLocaleDateString()
    }
    return (
        <div className="card mb-3" style={{ maxWidth: '450px' }}>
            <div className="card-header text-center">Precios</div>
            <div className="card-body">
                <h5>Venta: <span className="text-primary">${(product.myPrice).toFixed(2)}</span></h5>
                <hr />
                <h6 className="mb-2 mt-4">Proveedor: <span className="text-primary">${(product.price).toFixed(2)}</span></h6>
                <h6>Proveedor + IVA({product.iva}%): <span className="text-primary">${(product.priceWithIva).toFixed(2)}</span></h6>
            </div>
            <div className="card-footer text-muted">
                Ultima actualización: {getLastHistorical()}
            </div>
        </div>
    )
}

export default PricesBox;