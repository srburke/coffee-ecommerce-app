import React from 'react'
import '../styles/home.css';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';
import Coffee from './Coffee';
import { useEffect, useState } from 'react';
import { collection, query, doc, getDocs, getDoc, where, addDoc } from "firebase/firestore";
import { db, auth } from "../config/firebase";
import { useParams } from 'react-router-dom';

const Home = () => {

    return (
        <>
            <main>
                <section className="home">
                    <div className="home-bg"></div>
                    <div className="container-fluid" id="home-cont">
                        <div className='container' id="intro" >
                            <div className='section'>
                                <div className="row justify-content-center align-text-center g-2 ">
                                    <div class="col-lg-6 col-md-8" id="intro-title" >
                                        <h1 className="text-lg-start text-md-center text-sm-center home-title">MEET YOUR <br />  COFFEE NEEDS</h1>

                                        <h3 className="text-lg-start" style={{ marginTop: "2rem", fontSize: "1.5rem" }}>By Awakening Your Senses, One Bag at a Time</h3>

                                        <button type="button" class="btn btn-primary" id="subscribe-btn" style={{ marginTop: "1rem", backgroundColor: "hsl(150, 55%, 25%)", borderColor: "hsl(150, 55%, 25%)", marginRight: "14rem" }}>Explore Now</button>
                                    </div>


                                    <div className="col-lg-6 col-md-6">
                                        <div className="image-container">
                                            <div className="home-image" id="intro-photo">

                                                <img src="./images/homePhoto.png" alt="Coffee Photo" id="introImg" />
                                                <div className="img-shadow"></div>

                                            </div>
                                        </div>

                                    </div>

                                </div>


                            </div>

                        </div>

                    </div>
                </section>

                <section style={{ paddingBottom: "3em", paddingTop: "1rem" }} className="link-sect">
                    <div className="container-fluid" id="roast-cont">
                        <div className="container">
                            <div className="row justify-content-center align-text-center g-2">
                                <div class="col-lg-6">

                                    < h1 className="type-title text-lg-start text-md-center text-sm-center">Explore Our <br /> Roast Levels </h1>
                                    <p>lorem</p>
                                </div>


                                <div class="col">
                                    <a href='/coffee-type/light' className="nav-link" id='link'>
                                        <h1 className="text-lg-start text-md-center text-sm-center">Light <br /> </h1></a>

                                </div>

                                <div class="col">
                                    <a href='/coffee-type/medium' className="nav-link" id='link'>
                                        <h1 className="text-lg-start text-md-center text-sm-center">Medium <br /> </h1></a>

                                </div>


                                <div class="col">
                                    <a href='/coffee-type/dark' className="nav-link" id='link'>
                                        <h1 className="text-lg-start text-md-center text-sm-center">Dark<br /> </h1></a>

                                </div>


                            </div>
                        </div>
                    </div>

                </section>
            </main >




        </>
    )
}

export default Home