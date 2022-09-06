import React, {useState} from 'react';
import Navbar from '../components/Navbar';
import { InputTags } from 'react-bootstrap-tagsinput';
import Swal from 'sweetalert2';
import 'react-bootstrap-tagsinput/dist/index.css';
import Footer from '../pages/Footer';
import Header from '../components/Header';

const SMSsimple = () => 
{

    const [telephone, setTelephone] = useState([]);
    const [msg, setMsg] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    const handleChange=(e) =>
    {
        const name = e.target.name;
        const type = e.target.type;
        const value = type === 'checkbox' ? e.target.checked : e.target.value

        setMsg(value)
    }

    const handlerSubmit=(e)=>
    {
        e.preventDefault();
        setIsLoading(true);
        
        var donnees = JSON.parse(localStorage.getItem('CONFIGURATION'));
        var apiKey = donnees.apiKey;
        var sender_id = donnees.sender_id;
        var tel = telephone.map((telephones)=>('+226'+telephones))
        console.log(tel);
        const axios = require('axios');
            axios({
            method: 'post',
            headers: {'X-AUTH-TOKEN':apiKey , 'Content-Type':'application/json'},
            url: 'https://www.aqilas.com/api/v1/sms',
            data: {
                from: sender_id,
                text: msg,
                to: tel,
            }})
            .then(res => 
            {
                setIsLoading(false)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Message envoyé avec succès',
                    showConfirmButton: false,
                    timer: 1500
                    })

                if(localStorage.getItem('HISTORIQUE_MESSAGE') !== null || localStorage.getItem('HISTORIQUE_MESSAGE') !== undefined ) 
                {
                    let messages_historique = JSON.parse(localStorage.getItem('HISTORIQUE_MESSAGE'));
                    let new_message = [msg,tel+"",new Date()];
                    let ajouts_message = messages_historique.push(new_message);
                    localStorage.setItem('HISTORIQUE_MESSAGE', JSON.stringify(messages_historique));
                    setMsg([]);
                    setTelephone([]);
                } else
                {

                    let messages_historique = [];
                    let new_message = [msg,tel+"",new Date().toLocaleString()];
                    let addMessage = messages_historique.push(msg,telephone,new Date());
                    localStorage.setItem('HISTORIQUE_MESSAGE', JSON.stringify(messages_historique));
                    setMsg([]);
                    setTelephone([]);
                }
                //Historique
                
                //console.log(oldMsg);
                
            }).catch(err => {
                // Handle error
                setIsLoading(false)
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
            <div className='container'>
                <div className='row'>
                    <div className="col-md-12 mb-3">
                        <label htmlFor="telephone" className="form-label">Destinataires</label>
                        <div className='input-group'>
                            <InputTags values={telephone} minLength="1" required id="telephone" onTags={(value) => setTelephone(value.values)} />
                            <button className='btn btn-danger'  type='button' data-testid='button-clearAll'
                            onClick={() => {setTelephone([])}}> Effacer </button>
                        </div>
                    </div>
                    <div className="col-md-12 mb-3">
                        <label htmlFor="msg" className="form-label">Message</label>
                        <textarea name="msg" onChange={handleChange} required value={msg} className='form-control' id="msg" rows="3" placeholder="Le message"></textarea>
                    </div>
                    <div className="col-md-12 mb-3">
                        {
                            !isLoading && 
                        <button className='btn btn-primary mt-2' onClick={handlerSubmit} disabled={isLoading}>
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
                </div>
            </div>
                <Footer />

            </>);
};
export default SMSsimple;