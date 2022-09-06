import React, {useState,useEffect} from 'react';
import {NavLink} from 'react-router-dom';
const Navbar = () => {

    const [credit, setCredit] = useState('');
    var donnees = JSON.parse(localStorage.getItem('CONFIGURATION'));
    //fonction pour les loading
    const [isLoading, setIsLoading] = useState(false);
    function loadCredit()
    {
        const axios = require('axios');
                axios({
                method: 'get',
                headers: {'X-AUTH-TOKEN':donnees.apiKey , 'Content-Type':'application/json'},
                url: 'https://www.aqilas.com/api/v1/credit'})
                .then(res => 
                {
                    // Handle success
                    setIsLoading(false)
                    setCredit(res.data.credit)
                }).catch(err => {
                    // Handle error
                    setIsLoading(false)
                });
    }

    loadCredit();

    return (
        <div className='containers p-3 bg-primary '>
            <div className="container">
                    <NavLink to="/" activeclassname="nav-active">
                        Accueil
                    </NavLink>
                    <NavLink to="/message-de-rappel" activeclassname="nav-active">
                        Message de rappel
                    </NavLink>
                    <NavLink to="/sms-simple" activeclassname="nav-active">
                        SMS simple
                    </NavLink>
                    <NavLink to="/historique" activeclassname="nav-active">
                        Historique
                    </NavLink>
                    <NavLink to="/statistiques" activeclassname="nav-active">
                        Statistiques
                    </NavLink>
                    <NavLink to="/configuration" activeclassname="nav-active">
                        Configuration
                    </NavLink>
                    <NavLink to="/whatsapp" activeclassname="nav-active">
                        WhatsApp
                    </NavLink>
                    <NavLink to="" title="Votre solde aqilas" className="navs shadow-regular position-relative top-30 end-0 translate-middle-y">
                        Credit: {credit} F CFA
                    </NavLink>
            </div>
        </div>
    );
};
export default Navbar;