import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
const Header = () => {
    var donnees = JSON.parse(localStorage.getItem('CONFIGURATION'));
    return (<>
        <div className="container">
                <img src="./img/logo.png" title="Logo logiciel" className="float-left" width='250' alt="logo"/>
                <h2 className="text-muted" title="Nom de votre labo">{donnees.nom}</h2>
        </div>
    </>);
};

export default Header;