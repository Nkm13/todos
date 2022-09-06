import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Footer from '../pages/Footer';
import axios from 'axios';
export default class Configuration extends React.Component
{
  constructor(props)
  {
    super(props);

    //Recuperation de donnees de configuration stockes dans le local storage
    var donnees = JSON.parse(localStorage.getItem('CONFIGURATION'));

    this.state  = 
    {
      nom : donnees.nom,      
      sender_id : donnees.sender_id,        
      msg :donnees.msg ,      
      apiKey : donnees.apiKey,        
    };
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this)
  }

  handleChange(e)
  {
    const name = e.target.name;
    const type = e.target.type;
    const value = type === 'checkbox' ? e.target.checked : e.target.value

    this.setState({
      [name]: value,
    })
  }


  handleSubmit(e) 
  {
    e.preventDefault();
    const data = this.state;
    console.log(data);
    //Envoie de donnees de configuration dans le local storage
    localStorage.setItem('CONFIGURATION', JSON.stringify(data));
    this.setState
    ({
      nom : '',      
      sender_id : '',        
      apiKey : '',        
      msg : ''        
    })
  }


  render () {
    return ( <>
      <div  className='mb-3'>
          <Header/>
          <Navbar />
      </div>
      <div className='container '>
        <div className='row'>
          <div className='col-md-4'>
            <form onSubmit={this.handleSubmit} >

              <label htmlFor="nom">Nom du labo </label>
              <input type='text' required className='form-control' id='nom' name="nom" value ={this.state.nom} onChange={this.handleChange}/>

              <label htmlFor="sender_id">SenderId </label>
              <input type='text' minLength="4" required maxLength="11" className='form-control' id='sender_id' name="sender_id" value={this.state.sender_id} onChange={this.handleChange}/>

              <label htmlFor="apiKey">ApiKey </label>
              <input type='text' required className='form-control' id='apiKey' name="apiKey" value={this.state.apiKey} onChange={this.handleChange}/>

              <label htmlFor="msg">Template message </label>
              <textarea  id='msg' required rows="3" className='form-control' name="msg" value={this.state.msg} onChange={this.handleChange}></textarea> 

              <button className='btn btn-primary mt-2'>Enregistrer</button>

            </form> 
          </div>
        </div>
      </div>
                <Footer />
            </>)}
}