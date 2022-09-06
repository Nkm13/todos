import React,{useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import button from 'react-bootstrap/Button';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import MessageDeRappel from './pages/MessageDeRappel';
import Historique from './pages/Historique';
import Configuration from './pages/Configuration';
import Statistiques from './pages/Statistiques';
import SMSsimple from './pages/SMSsimple';
import NotFound from './pages/NotFound';
import WhatsApp from './pages/WhatsApp';
import Loader from './pages/Loader';

const App = () => {
    const[loader, setLoader] = useState(true);
    useEffect(()=>
    {
      setTimeout(() => {
        setLoader(false)
      }, 1000);
    })

  return loader ? (<Loader/>) : (<>
    <div>
      <Routes>
        <Route  path="/" element={<Home/>}/>
        <Route  path="/message-de-rappel" element={<MessageDeRappel/>}/>
        <Route  path="/historique" element={<Historique/>}/>
        <Route  path="/statistiques" element={<Statistiques/>}/>
        <Route  path="/configuration" element={<Configuration/>}/>
        <Route  path="/sms-simple" element={<SMSsimple/>}/>
        <Route  path="/whatsapp" element={<WhatsApp/>}/>
        <Route  path ="*" element={<NotFound/>}/>
      </Routes> 
    </div>
  </>);
};

export default App;
