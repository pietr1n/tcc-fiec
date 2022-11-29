import React from 'react'
import { Form, Button, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import axiosInstance from '../myaxios';
//import { GoogleLogin } from 'react-google-login';
import { GoogleLogin } from '@react-oauth/google';
import './login.css'
import logoGoogle from "../images/google.svg"


const Auth = (props) => {
  const [form, setform] = React.useState({email: "", password: ""})
  const dispatch = useDispatch();

  const responseGoogle = async (response) => {
    console.log(response);
    const tokenId = response.credential;
    const res = await axiosInstance.post("/auth/loginWithGoogle", { tokenId })
    const data = await res.data;
    const token = data.token;
    localStorage.setItem("token", token);
    const res2 = await axiosInstance.post("/messages/register", { fcmToken: props.token })
    dispatch({type: "LOGIN"});
  }
  

  const handleChange = e => {
    e.preventDefault();
    setform({...form, [e.target.name]: e.target.value})
  }

  const signIn = async () => {
    const res = await axiosInstance.post("/auth/signIn", form);
    const data = await res.data;
    const token = data.token;
    localStorage.setItem("token", token);
    dispatch({type: "LOGIN"});
  }
  return (
    
        <div className="container">
        <form action="#">
            <div className="title">Login</div>
            <div className="conectado">
                <input type="checkbox" name="" /><span>Entrar como revisor</span>
            </div>
            <div className="google">
                <button type="submit"><Link to ={"*"}>Login com <img src={logoGoogle}/></Link></button>
            </div>
        </form>
      </div>
  )
}

export default Auth