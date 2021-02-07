import React from 'react';
import { Link } from 'react-router-dom';

function LoadedList({ response }) {
    return (
        <div className="card bg-ligh mb-3 mt-5 pb-3 col-md-4 offset-md-4 p-0">
            <div className="card-header text-center">Lista cargada</div>
            <div className="card-body text-secondary">
                <ul className="list-group">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        Nuevos
                        <span>{response.created}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        Precios actualizados
                        <span>{response.priceUpdated}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        Fechas actualizadas
                        <span>{response.dateUpdated}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        Errores al actualizar fechas
                        <span>{response.dateUpdateErrors}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        Historias agregadas
                        <span>{response.historicalAdded}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        Errores al crear historias
                        <span>{response.historicalErrors}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        Errores al crear
                        <span>{response.creationErrors}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        Errores al actualizar precios
                        <span>{response.priceUpdateErrors}</span>
                    </li>
                </ul>
            </div>
            <div className="row">
                <div className="col-md-12 text-center">
                    <Link className="btn btn-primary" to="/">Inicio</Link>
                </div>
            </div>
        </div>
    )
}

export default LoadedList