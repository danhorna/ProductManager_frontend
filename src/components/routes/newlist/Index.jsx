import React, { useEffect, useState } from 'react';
import XLSX from "xlsx";
import { make_cols } from '../../../js/listColumns';
import { sendList } from '../../../js/apicalls';
import LoadedList from './LoadedList'
import DatePicker from 'react-date-picker';

function NewListIndex() {

    const SheetJSFT = [
        "xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt", "ods", "fods", "uos", "sylk", "dif", "dbf", "prn", "qpw", "123", "wb*", "wq*", "html", "htm"
    ].map(function (x) { return "." + x; }).join(",");

    const [state, setState] = useState({
        data: { products: [], res: {} },
        cols: [],
        loading: false,
        loaded: false,
        error: false,
        fileError: false,
        dateError: false,
        listDate: new Date()
    });

    useEffect(() => {
        if (state.loading) {
            sendList(state.data, state.listDate)
                .then((res) => {
                    setState({
                        ...state,
                        data: { products: [], res: res.data },
                        loaded: true,
                        loading: false
                    })
                })
                .catch((e) => {
                    console.log(e)
                })
        }
    })

    function handleChange(ee) {
        const files = ee.target.files;
        if (files && files[0]) {
            /* Boilerplate to set up FileReader */
            const reader = new FileReader();
            const rABS = !!reader.readAsBinaryString;

            reader.onload = e => {
                /* Parse data */
                const bstr = e.target.result;
                const wb = XLSX.read(bstr, {
                    type: rABS ? "binary" : "array",
                    bookVBA: true
                });
                /* Get first worksheet */
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                /* Convert array of arrays */
                const data = XLSX.utils.sheet_to_json(ws);
                let duplicateCodes = data
                    .map(e => e.code)
                    .map((e, i, final) => final.indexOf(e) !== i && i)
                    .filter(obj => data[obj])
                    .map(e => data[e].code)
                if (duplicateCodes.length) {
                    ee.target.value = null;
                    console.log(duplicateCodes);
                    setState({
                        ...state,
                        error: true
                    })
                }
                else {
                    /* Update state */
                    setState({
                        ...state,
                        fileError: false,
                        error: false,
                        data: {
                            products: data
                        },
                        cols: make_cols(ws["!ref"])
                    });
                }
            };

            if (rABS) {
                reader.readAsBinaryString(files[0]);
            } else {
                reader.readAsArrayBuffer(files[0]);
            }
        }
    }

    function handleFile() {
        if (state.listDate && state.data.products.length) {
            setState({
                ...state,
                loading: true,
                fileError: false,
                dateError: false
            })
        }
        else {
            if (!state.data.products.length) {
                setState({
                    ...state,
                    fileError: true
                })
            }
            else {
                setState({
                    ...state,
                    dateError: true
                })
            }
        }
    }

    function loader() {
        return (
            <div className="card border-secondary mb-3 mt-5 pb-3 col-md-4 offset-md-4 p-0 text-center">
                <div className="card-header">Cargar nueva lista de precios</div>
                <div className="card-body text-secondary">
                    {state.error ?
                        <div className="alert alert-danger" role="alert">
                            ¡Hay codigos de producto repetidos!
                    </div>
                        :
                        ""
                    }
                    <div className="row">
                        <div className="col-md-3 text-left">
                            Lista:
                        </div>
                        <div className="col-md-9">
                            <input
                                type="file"
                                className="form-control-file"
                                id="file"
                                accept={SheetJSFT}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-md-3 text-left">
                            Fecha:
                        </div>
                        <div className="col-md-9 text-left">
                            <DatePicker
                                onChange={(value) => setState({
                                    ...state,
                                    listDate: value,
                                    dateError: false
                                })}
                                value={state.listDate}
                                format="dd/MM/y"
                            />
                        </div>
                    </div>

                </div>

                <div className="row">
                    <div className="col-md-12">
                        {state.loading ?
                            <div className="spinner-border text-dark" role="status"></div>
                            :
                            <button type="submit" className="btn text-center btn-primary mb-2" onClick={handleFile}>
                                Cargar
                            </button>
                        }
                        {state.fileError ?
                            <p className="text-danger mb-0"><small>*Error en el archivo</small></p>
                            : ""
                        }
                        {state.dateError ?
                            <p className="text-danger mb-0"><small>*Error en la fecha</small></p>
                            : ""
                        }
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="container page-content">
            <div className="row">
                <div className="col-md-12">
                    {!state.loaded ? loader() : <LoadedList response={state.data.res} />}
                </div>
            </div>
        </div>
    )
}

export default NewListIndex