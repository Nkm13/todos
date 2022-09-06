import React,{useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import Navbar from '../components/Navbar';
import Footer from '../pages/Footer';
import Header from '../components/Header';
import axios from 'axios';

const MessageDeRappel = () =>
{
  var donnees = JSON.parse(localStorage.getItem('CONFIGURATION'));

  const [message, setMessage] = useState(donnees.msg)
  const [apercu, setApercu] = useState(donnees.msg);
  const [template, setTemplate] = useState(donnees.msg);
  const [destinataires, setDestinataires] = useState([{
        contact:'',
        name:'',
        second_name:'',
        msg : message,
      }]);


  //fonction pour les loading

  const [isLoading, setIsLoading] = useState(false);


  //fonction pour le rendu du template 
  
  const handleChangeTemplate = (e) => 
  {

    setTemplate(e.target.value)
    genererApercu(e.target.value)

  }
  
 //fonction pour l'ajout dechamp du formulaire

  const handleAddDestinataire = ()=>
  {
    setDestinataires([...destinataires, 
      {
        contact : '',
        name : '',
        second_name : '',
        msg : message
      }])
  }

  //fonction pour la suppression du formulaire

  const handleRemoveDestinataire = (e,index) =>
  {
    console.log(index);
    const dest = [...destinataires];
    dest.splice(index,1);
    setDestinataires(dest);
  };

  //fonction pour la saisir du formulaire

  const handleChange = (e,index) => 
  {
    var dest = destinataires
    if (e.target.name=='name') dest[index].name = e.target.value
    else dest[index].second_name = e.target.value
    setDestinataires(dest)
    genererApercu(template,index)
  }


  const handleChangeTel = (e,index) => 
  {

    console.log(e.target.name);
    const dest = destinataires
        console.log(e.target.value)
        let tmp_destinataires= [...destinataires]
        tmp_destinataires[index].contact=e.target.value
    setDestinataires(tmp_destinataires)
  }

  //fonction genererApercu 

  function genererApercu(temp,i=0)
  {
    var conc = destinataires[i].contact
    var message = temp.replace('$NAME', destinataires[i].name )
        message = message.replace('$SECOND_NAME', destinataires[i].second_name )
        setApercu (message)
  }

  //fonction pour generer les messages

  function generateMessages()
  {
    var messages = [];
    destinataires.map((dest,index)=>
    {
    var message = template.replace('$NAME', dest.name )
      message = message.replace('$SECOND_NAME', dest.second_name )
    messages.push({
      'text': message,
      'to': "+226"+dest.contact
    })
    })

    return messages
  }

  //fonction pour gerer la soumission

  const handleSubmit = (e) => 
  {

    e.preventDefault();
    setIsLoading(true);
    var messagesGene = generateMessages();
    const axios = require('axios')
      axios({
      method: 'post',
      headers: {'X-AUTH-TOKEN':donnees.apiKey , 'Content-Type':'application/json'},
      url: 'https://www.aqilas.com/api/v1/bulksms',
      data: {
          'from' : donnees.sender_id,
          'messages': messagesGene,
      }})
      .then(res => {
        setIsLoading(false)
          Swal.fire(
            {
              showLoaderOnConfirm: true,
              position: 'center',
              icon: 'success',
              title: 'Message envoyé avec succès',
              showConfirmButton: false,
              timer: 1500
              })

          if(localStorage.getItem('HISTORIQUE_MESSAGE') !== null || localStorage.getItem('HISTORIQUE_MESSAGE') !== undefined ) 
          {
            messagesGene.map((messageGene,index)=>
            {
              let messages_historique = JSON.parse(localStorage.getItem('HISTORIQUE_MESSAGE'));
              let new_message = [messageGene.text,messageGene.to,new Date()];
              let ajouts_message = messages_historique.push(new_message);
              localStorage.setItem('HISTORIQUE_MESSAGE', JSON.stringify(messages_historique));
            });
            setDestinataires([
              { 
                contact : ' ',
                name : ' ',
                second_name : ' ',
                msg : message,
              }])
          } 
          else
          {
            messagesGene.map((messageGene,index)=>
            {
              let messages_historique = [];
              let new_message = [messageGene.text,messageGene.to,new Date()];
              let addMessage = messages_historique.push(new_message);
              localStorage.setItem('HISTORIQUE_MESSAGE', JSON.stringify(messages_historique));
            });
            setDestinataires([
              { 
                contact : ' ',
                name : ' ',
                second_name : ' ',
                msg : message,
              }])
          }
      }).catch(err => {
          // Handle error
          setIsLoading(false)
          Swal.fire({
              icon: 'error',
              title: 'Echec',
              text: 'Message non envoyé \n' 
              + err.response.data.message,
              })
              setDestinataires([
              { 
                contact : ' ',
                name : ' ',
                second_name : ' ',
                msg : message,
              }])
      });
      }


    return (<>
            <div className='mb-3'>
                <Header/>
                <Navbar />
            </div>
            <div className='container'>
              <div className="row">
                <div className="col-sm-8">
                  <table className="table">
                    <thead className="text-center">
                      <tr>
                        <th scope="col"><label htmlFor="contact">Telephone</label></th>
                        <th scope="col"><label htmlFor="name">Nom</label></th>
                        <th scope="col"><label htmlFor="second_name">Prenom</label></th>
                      </tr>
                    </thead>
                  </table>
                  <form onSubmit={handleSubmit}>
                    {destinataires.map((destinataire, index) =>(

                    <div key={index} className="input-group mb-3 center">

                      { destinataires.length >= 2 &&
                        (<button type="button" onClick={(e)=>handleRemoveDestinataire(e,index)} className="btn btn-danger ">-</button>)
                        }
                        
                      <input type="text" name="contact" required value={destinataire.contact} onChange={e =>handleChangeTel(e,index)} aria-label="contact" maxLength="8" minLength="8" className="form-control"/>

                      {/* //{ console.log(destinataire)}*/}

                      <input type="text" name="name" required value={destinataire.name} onChange={e => handleChange(e,index)} aria-label="name" className="form-control"/>
                      
                      <input type="text" required name="second_name" value={destinataire.second_name} onChange={e =>handleChange(e,index)} aria-label="second_name" className="form-control"/>

                    </div>
                    ))}
                      
                      {
                        destinataires.length >= 1 && !isLoading && 
                        (

                        <button type="button" onClick={handleAddDestinataire} className="btn btn-primary me-2">Ajouter</button>

                        )
                      }
                      {
                        destinataires.length >= 1 && !isLoading && 
                        (

                        <button disabled={isLoading}  className="btn btn-success">Envoyer</button>

                        )
                      }

                        <div className="text-muted">
                      {
                          isLoading && 
                          <span class="spinner-border text-primary me-2" role="status"></span>
                      }
                      {
                      isLoading && 
                      "Envoie en cours ..."
                      }
                      </div>
                </form>
                </div>
                <div className="col-sm-4 mt-5">
                  <div className="card">
                    <div className="card-header bg-primary text-light">
                      Aperçu
                    </div>
                    <div className="card-body">
                      <p className="card-text">
                        {apercu}
                      </p>
                    </div>
                  </div>
                  <div className="card mt-5">
                    <div className="card-header bg-primary text-light">
                      Template
                    </div>
                    <div className="card-body">
                      <p className="card-text">
                        <textarea name="msg" className='form-control' onChange={e => handleChangeTemplate(e)} value={template} id="msg" rows="3" placeholder="Le message">  </textarea></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
                <Footer />
            </>
            );   

}

export default MessageDeRappel;