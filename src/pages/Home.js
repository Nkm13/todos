import React from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Footer from '../pages/Footer';
import {NavLink} from 'react-router-dom';

const Home = () => 
{
    return (<>
            <div  className='mb-3'>
                <Header/>
                <Navbar />
            </div>
            <div className='container'>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="card my-3">
                            <div className="card-body">
                                <h5 className="card-title">MESSAGES DE RAPPEL</h5>
                                <p className="card-text"></p>
                                <NavLink className="btn btn-primary" to="/message-de-rappel">Voir plus</NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="card my-3">
                            <div className="card-body">
                                <h5 className="card-title">SMS SIMPLE</h5>
                                <p className="card-text"></p>
                                <NavLink className="btn btn-success" to="/sms-simple">Voir plus</NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="card my-3"  >
                            <div className="card-body">
                                <h5 className="card-title">HISTORIQUE</h5>
                                <p className="card-text"></p>
                                <NavLink className="btn btn-danger" to="/historique">Voir plus</NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="card my-3"  >
                            <div className="card-body">
                                <h5 className="card-title">STATISTIQUES</h5>
                                <p className="card-text"></p>
                                <NavLink className="btn btn-warning" to="/statistiques">Voir plus</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                <Footer />
            </>
            );
};

export default Home;