import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Footer from '../pages/Footer';
import Swal from 'sweetalert2';

function WhatsApp () {
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit= (e) =>
    {
        e.preventDefault();
        setIsLoading(true);
        const axios = require('axios');
            axios({
            method: 'post',
            headers: {'Authorization': 'Bearer EAAGVJA6rU4wBAIQzjs9TGLRYGWkuhweTZBfAkkZCKV8OAkSkNEDtJn79C7ZBGpywYYJoZAL4kUo6KsZBE0dFxAIdXSxIqGaQ20ZBjmYzoMpMa18RoAD4rhegoRodKgm1U75J8KUpUZBHaPmX03YkrZBGSUS49ulFUXfbWbn13Vz2lA4eZC1lJSm5RTZAAZCnRZCt17kEm36G2tjOwQZDZD'},
            url: 'https://graph.facebook.com/v14.0/110173621753232/messages',
            
            data: { 
                "messaging_product": "whatsapp",
                "recipient_type": "individual",
                "to": "22654584443",
                "type" : "template"
                /* "type" : "image", 
                "image":{ "link": "https://www.referenseo.com/wp-content/uploads/2019/03/image-attractive.jpg"}
                },*/
                "template":{
                    "name": "scolarite_ecole",
                    "language":{
                        "code": "en_US" },
                    "components": [{
                            "type" : "body",
                            "parameters":[ {
                                "type" : "text",
                                "text" : "imag",
                                },
                            {
                                "type" : "text",
                                "text":"yoo"
                                },
                            {
                                "type" : "text",
                                "text":"yoo"
                                },
                            {"type": "date_time",
                            "date_time": {
                            "fallback_value": "MONTH DAY, YEAR"
                            }}]
                        }]
                } 
                
            }})
            .then(res => 
            {
                setIsLoading(false);
                console.log(res)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Message envoyé avec succès',
                    showConfirmButton: false,
                    timer: 1500
                    })
                
            }).catch(err => {
                setIsLoading(false);
                // Handle error
                Swal.fire({
                    icon: 'error',
                    title: 'Echec',
                    text: 'Message non envoyé \n' 
                    + err.response.data.message,
                    })
            });
        

    }
        return (<>
            <div  className='mb-3'>
                <Header/>
                <Navbar />
            </div>
            <div className="container">
                <div className="row">
                    <ul className="nav justify-content-end">
                        <li className="nav-item">
                            <button className="btn btn-secondary btn-sm"><i className="bi bi-plus-square me-1"></i>Importer contacts</button>
                        </li>
                        <li className="nav-item ms-2">
                            <button className="btn btn-secondary btn-sm"><i className="bi bi-plus-square me-1"></i>Importer résultats</button>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6 m-auto mt-'>
                        <form onSubmit={handleSubmit}>
                        <label htmlFor="nom">Telephone </label>
                        <input type='text'  className='form-control' id='tel' name="tel" />

                        <label htmlFor="msg">Message</label>
                        <textarea  id='msg'  rows="3" className='form-control' name="msg"></textarea> 

                        <div className="col-md-12 mb-3">
                        {
                            !isLoading && 
                        <button className='btn btn-primary mt-2' disabled={isLoading}>
                            Envoyer
                        </button>
                        }
                        <br/>
                        <div className="text-muted">
                            {
                                isLoading && 
                                <span className="spinner-border text-primary me-2" role="status"></span>
                            }
                            {
                                isLoading && 
                            "Envoie en cours ..."
                            }
                        </div>
                    </div>

                        </form> 
                    </div>
                </div>
            </div>

            <Footer />
        </>);
}

export default WhatsApp;