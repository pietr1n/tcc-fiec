import React, {useState, useEffect} from 'react'
import axiosInstance from './myaxios'
import { Button } from 'react-bootstrap';
import { Container, Toast } from 'react-bootstrap';
import UserProfile from './Layouts/UserProfile';
import UserDetail from './Screens/UserDetail';
import UserForm from './Screens/UserForm';
import UsersTable from './Screens/UsersTable';
import {Route, Routes, Outlet} from 'react-router-dom';
import Users from './Screens/UserDetail';
import Header from './Screens/Header';


import { onMessageListener, requestForToken } from './firebase';

import { useSelector } from 'react-redux'

import Home from './Screens/Home';
import Auth from './Screens/Auth';
import TopCausos from './Screens/TopCausos';


const App = () => {

  const [fcmToken, setToken] = useState(null);
  const [notification, setNotification] = useState(null);
  const [isTokenFound, setTokenFound] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    requestForToken(setTokenFound, setToken)
  }, [])

  onMessageListener().then(payload => {
    setShow(true);
    setNotification({title: payload.notification.title, body: payload.notification.body})
    console.log(payload);
  }).catch(err => console.log('failed: ', err));
  

  const loggedIn = useSelector(state => state.loggedIn);

  return (  // retorna a  pagina ou porção que serah mostrada
  <div>
     <Toast onClose={() => setShow(fcmToken && fcmToken.notification)} show={show} delay={3000} autohide animation style={{
          position: 'absolute',
          top: 20,
          right: 20,
        }}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded mr-2"
              alt=""
            />
            <strong className="mr-auto">{notification && notification.title}</strong>
          </Toast.Header>
          <Toast.Body>{notification && notification.body}</Toast.Body>
          <Button onClick={() => setShow(false)}>Close Notification</Button>
          <br />
        </Toast>
        
    {!loggedIn ?  <Header /> : null }
    
  
      
    <Routes>
    {!loggedIn ? 
      <>
      <Route path='/user-details' element={<UserDetail />} />
      <Route path='/user-form' element={<UserForm />}/>
      <Route path='/user-form/:id' element={<UserForm />} />
      <Route path='/users' element={<UsersTable />} />
      <Route path='*' element={<TopCausos />} />
      <Route path='about' element={<AboutUs />} /> 
  
      </> :
      
      <>
      <Route path='Auth' element={<Auth/>} /> 
      <Route path='*'element={<TopCausos/>}/> 
      </> 
      }
    </Routes>
   
    <Outlet />
  
  </div>
  )
  
}

export default App
