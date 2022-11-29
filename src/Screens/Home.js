import React from 'react'
import './home.css'
import homeImage from "../images/info.png"
import detail from "../images/detail.svg"
import logo from "../images/Logo.svg"
import { Link } from 'react-router-dom'


const Home = () => {
    return (
        <div className='home'>

            <div className="black">
                <img src={detail} alt="" />
            </div>
            <div className="all">
                <div className="container">
                    <img id="logo" src={logo}/>
                    <button onclick="" id="btn_sobre">
                        <img id="info" src={homeImage} alt="Icon Info" />
                        <Link to={"About"}>Sobre nós</Link>
                        
                    </button>
                </div>
                <div id="container_texts">
                    <div className="texts" >
                        <p id="text_1">História<br/>
                            que<br/>
                                gente fala</p>
                            <p id="text_2">"Não sou velha. Sou uma <br />
                                adolescente vintage."</p>
                                <div className="btns_flex">
                                <button className="btns" id="session"><Link id="sessão" to ={"Auth"}>Inicie sua sessão</Link></button>
                            </div>
                        </div>
                           
                    </div>
                </div>
            </div>
        
    )
}

export default Home;