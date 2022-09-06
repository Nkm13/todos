import React, {useState}from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Footer from '../pages/Footer';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';



const Historique = () => 
{
    const oldMsgs = JSON.parse(localStorage.getItem('HISTORIQUE_MESSAGE'));
    const[messagesHistorique, setMessageHistorique] = useState(oldMsgs)
    console.log(messagesHistorique)
    const handeClick = (e,index) =>
    {
        messagesHistorique.splice(index, 1);
        setMessageHistorique(messagesHistorique)
        localStorage.setItem('HISTORIQUE_MESSAGE', JSON.stringify(messagesHistorique));
    }
    const { SearchBar} = Search;
  
    const columns = 
    [
        {
            dataField: "2",
            sort: true,
            text: "Date et heure d'envoie"
        },
        { 
            dataField: "1",
            text: 'Numero du destinataires'
        },
        {
            dataField:"0",
            text: 'Contenu du message'
        },
        {
        dataField: 'df1',
        //isDummyField: true,
        text: 'Status',
        formatter: (cellContent, row) => {
          return (
            <h5>
              <span className="btn btn-success"> Délivré</span>
            </h5>
          );
        }
      }, 
    ]
    return (<>
            <div  className='mb-3'>
                <Header/>
                <Navbar/>
            </div>
            <div className='container' >
                <div className='row' >
                    <h4 className='mt-4'>Historique des messages envoyés</h4>
                        <ToolkitProvider
                            keyField="1"
                            data={messagesHistorique}
                            columns={columns }
                            search>
                            {
                                props => (
                                <div >
                                    <SearchBar { ...props.searchProps } className='form-control'/>
                                    <BootstrapTable
                                    { ...props.baseProps }
                                    rowStyle={ { backgroundColor: 'white'} }
                                    filter={ filterFactory() } pagination={ paginationFactory() }
                                    striped hover bordered={true}
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
export default Historique;