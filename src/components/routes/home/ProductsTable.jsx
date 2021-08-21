import React from 'react';
import { useHistory } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGem, faFileInvoice } from '@fortawesome/free-solid-svg-icons'

function ProductsTableTwo({ list }) {
    const history = useHistory();
    const columns = [
        {
            name: "_id",
            label: "ID",
            options: {
                display: false,
                searchable: false
            }
        },
        {
            name: "codePlus",
            label: "Código",
            options: {
                sort: true,
                customBodyRender: (data) => {
                    return (
                        <React.Fragment>
                            {data.code} {data.new ? <FontAwesomeIcon icon={faGem} size="ls" color="#718BF5" /> : null} {data.priceUpdated ? <FontAwesomeIcon icon={faFileInvoice} size="ls" color="green" /> : null}
                        </React.Fragment>
                    )
                }
            }
        },
        {
            name: "name",
            label: "Nombre",
            options: {
                sort: true,
            }
        },
        {
            name: "price",
            label: "Precio sin IVA",
            options: {
                sort: true,
                searchable: false,
                customBodyRender: data => "$" + data.toFixed(2)
            }
        },
        {
            name: "priceWithIva",
            label: "Precio con IVA",
            options: {
                sort: true,
                searchable: false,
                customBodyRender: data => "$" + data.toFixed(2)
            }
        },
        {
            name: "myPrice",
            label: "Precio a la venta",
            options: {
                sort: true,
                searchable: false,
                customBodyRender: data => "$" + data.toFixed(2)
            }
        },
        {
            name: "new",
            options: {
                display: false,
                searchable: false
            }
        }
    ];

    const options = {
        download: false,
        filter: false,
        print: false,
        selectableRowsHeader: false,
        selectableRows: 'none',
        onRowClick: rowData => history.push("/product/" + rowData[0])
    };
    return (
        <React.Fragment>
            <MUIDataTable
                title={"Lista de productos"}
                data={list}
                columns={columns}
                options={options}
            />
        </React.Fragment>
    )
}

export default ProductsTableTwo;