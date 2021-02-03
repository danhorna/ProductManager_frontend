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
        file: {},
        data: { products: [], res: {} },
        cols: [],
        loading: false,
        loaded: false,
        error: false,
        listDate: new Date()
    });

    useEffect(() => {
        if (state.data.products.length) {
            let duplicateCodes = state.data.products
                .map(e => e.code)
                .map((e, i, final) => final.indexOf(e) !== i && i)
                .filter(obj => state.data.products[obj])
                .map(e => state.data.products[e].code)
            if (!duplicateCodes.length) {
                sendList(state.data, state.listDate)
                    .then((res) => {
                        setState({
                            ...state,
                            data: { products: [], res: res.data },
                            loaded: true
                        })
                    })
                    .catch((e) => {
                        console.log(e)
                    })
            }
            else {
                console.log(duplicateCodes)
                setState({
                    ...state,
                    error: true,
                    loading: false,
                    data: { products: [] }
                })
            }
        }

    }, [state])

    function handleChange(e) {
        e.target.value = null
    }

    function handleFile() {
        console.log('que')
        if (state.listDate && state.file.name) {
            console.log('so')
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
                /* Update state */
                setState({
                    ...state,
                    loading: true,
                    data: {
                        products: data
                    },
                    cols: make_cols(ws["!ref"])
                });
            };

            if (rABS) {
                reader.readAsBinaryString(state.file);
            } else {
                reader.readAsArrayBuffer(state.file);
            }
            setState({
                ...state,
                file: {}
            })
        }
        else{
            console.log('qwe')
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
                                    listDate: value
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
                            <button type="submit" className="btn text-center btn-primary" onClick={handleFile}>
                                Cargar
                            </button>
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