import React, {useState,useEffect} from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Footer from '../pages/Footer';
import {NavLink} from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';

function Statistiques()
{
    const oldMsgs = JSON.parse(localStorage.getItem('HISTORIQUE_MESSAGE'));
    const[messagesHistorique, setMessageHistorique] = useState(oldMsgs);
    const[nbMsgJour, setNbMsgJour] = useState(0);
    const[nbMsgMois, setNbMsgMois] = useState(0)
    /* function chargerStats()
    {
        var today = new Date();
        
        messagesHistorique.map((msg,index) =>
        {
            var dMsg = new Date(msg[2]);
            //console.log(dMsg);
            if (today.getDay()==dMsg.getDay() && today.getMonth()== dMsg.getMonth() && today.getFullYear()==dMsg.getFullYear() )  
            {
                nbMsgJour=12
            }
            if (today.getMonth()==dMsg.getMonth() && today.getFullYear()==dMsg.getFullYear() )  
            {
                setNbMsgMois(nbMsgMois + 1)
            }
        }
        );
    } */
    useEffect(() => {
    var today = new Date();
    console.log(messagesHistorique);
        messagesHistorique.forEach(function(msg)
        {
            var dMsg = new Date(msg[2]);
            console.log(msg[2]);
            
            if (today.getDay()===dMsg.getDay() && today.getMonth()=== dMsg.getMonth() && today.getFullYear()===dMsg.getFullYear() )  
            {
               setNbMsgJour(nbMsgJour+1)
            }
            if (today.getMonth()===dMsg.getMonth() && today.getFullYear()===dMsg.getFullYear() )  
            {
                setNbMsgMois(12 + 1)
            }
        }
        );
  }, []); 
    //chargerStats()
    const { SearchBar} = Search;
  
    const columns = 
    [
        {
            dataField: "2",
            sort: true,
            text: "Date et heure d'envoie",
            formatter : function(cell,row)
            {
                var d = new Date(row[2])
                return d.toLocaleString()
            }
        },
        { 
            dataField: "1",
            text: 'Numero du destinataires',
        },
        {
            dataField:"0",
            text: 'Contenu du message',
        },
        {
        dataField: 'df1',
        isDummyField: true,
        text: 'Status',
        formatter: (cellContent, row) => { 
          return (
            <h5>
              <span className="btn btn-success"> Délivré</span>
            </h5>
          );
        }
      },
    ];
    return (<>
            <div  className='mb-3'>
                <Header/>
                <Navbar />
            </div>
            <div className='container'>
                <div className='row'>
                    <div className="col-sm-3">
                        <div className="card my-3">
                            <div className="card-body">
                                <h5 className="card-title">Envoie du jour</h5>
                                <p className="card-text"><span className="badge bg-danger">{nbMsgJour}</span></p>
                                <button className="btn btn-primary">Voir plus</button>
                            </div>
                        </div>
                    </div> 
                    <div className="col-sm-3">
                        <div className="card my-3">
                            <div className="card-body">
                                <h5 className="card-title">Envoie de ce mois</h5>
                                <p className="card-text"><span className="badge bg-danger">{nbMsgMois}</span></p>
                                <button className="btn btn-success" >Voir plus</button> 
                            </div>
                        </div>
                    </div> 
                    <div className="col-sm-3">
                        <div className="card my-3">
                            <div className="card-body">
                                <h5 className="card-title">Envoie du mois passé</h5>
                                <p className="card-text"><span className="badge bg-danger">...</span></p>
                                <button className="btn btn-warning" >Voir plus</button>
                            </div>
                        </div>
                    </div> 
                    <div className="col-sm-3">
                        <div className="card my-3">
                            <div className="card-body">
                                <h5 className="card-title">Tous les envois</h5>
                               <p className="card-text"><span className="badge bg-danger ">{oldMsgs.length}</span></p>
                                <button className="btn btn-danger" >Voir plus</button>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
            <div className='container' >
                <div className='row' >
                        <ToolkitProvider
                            keyField="index"
                            data = {messagesHistorique }
                            columns={ columns }
                            search>
                            {
                                props => (
                                <div >
                                    <SearchBar { ...props.searchProps } className='form-control my-3'/>
                                    <BootstrapTable
                                    { ...props.baseProps }
                                    rowStyle={ { backgroundColor: 'white'} }
                                    filter={ filterFactory() } pagination={ paginationFactory() }
                                    striped bordered={true}
                                    />
                                </div>
                                )
                            }
                        </ToolkitProvider>
                </div>
            </div> 
                <Footer />

            </>);
};

export default Statistiques;