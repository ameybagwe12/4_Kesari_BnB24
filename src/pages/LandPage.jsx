import React from 'react'
import './startPage.css';
import {Link} from "react-router-dom";
import HeadPhone from "./headphone.svg"
export default function LandPage() {
  return (
    <section id="main">
                
                    <div className="main-row">
                        <div className="main-row-img">
                            <img className="head-phone-img" src={HeadPhone} alt=""/>
                        </div>
                        <div className="main-row-text">
                            <h1>Music for everyone</h1>
                            <p>Without music, life would be a mistake</p>
                            <Link to={"/home"} className="btn">
                                Start Listening
                            </Link>
                        </div>
                    </div>
            </section>
  )
}
