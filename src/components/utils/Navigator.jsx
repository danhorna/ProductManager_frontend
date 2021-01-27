import React from 'react';
import { Link } from 'react-router-dom';
// import $ from 'jquery'
function Navigator() {

    // function handleToggle(){
    //     $('#sidebar, #content').toggleClass('active');
    // }
    return (
        <div className="container">
            {/* <button id="sidebarCollapse" type="button" className="btn btn-light bg-white rounded-pill shadow-sm px-4 mb-4" onClick={handleToggle}><i className="fa fa-bars mr-2"></i><small className="text-uppercase font-weight-bold">Toggle</small></button> */}
            <div className="vertical-nav bg-white" id="sidebar">
                <div className="py-4 px-3 mb-4 bg-light">
                    <div className="media d-flex align-items-center">
                        {/* <img src="https://res.cloudinary.com/mhmd/image/upload/v1556074849/avatar-1_tcnd60.png" alt="..." width="65" class="mr-3 rounded-circle img-thumbnail shadow-sm" /> */}
                        <div className="media-body">
                            <h4 className="m-0">Cerrajeria</h4>
                        </div>
                    </div>
                </div>
                <p className="text-gray font-weight-bold text-uppercase px-3 small pb-4 mb-0">Main</p>
                <ul className="nav flex-column bg-white mb-0">
                    <li className="nav-item">
                        <Link className="nav-link text-dark font-italic bg-light" to="/"><i className="fa fa-th-large mr-3 text-primary fa-fw"></i>Inicio</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-dark font-italic" to="/newlist"><i className="fa fa-address-card mr-3 text-primary fa-fw"></i>Cargar lista</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navigator