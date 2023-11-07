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

                                        <h3 className="text-lg-start" style={{ marginTop: "2rem", fontSize: "1.5rem", paddingBottom: "2rem" }}>Awaken Your Senses, One Bag at a Time</h3>

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
                                <div className="col-lg-5 col-md-12">
                                    <h1 className="type-title text-lg-start text-md-start text-sm-center">Explore Our <br /> Roast Levels </h1>
                                    <p className="para-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum repellat quaerat voluptatibus placeat nam, commodi optio pariatur est quia magnam eum harum corrupti dicta, aliquam sequi voluptate quas. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum repellat quaerat voluptatibus placeat nam, commodi optio pariatur est quia magnam eum harum corrupti dicta, aliquam sequi voluptate quas.</p>
                                </div>


                                <div className="col">
                                    <div className="roast-container">
                                        <button className="roast-button" id="roast-text">    <a href='/coffee-ecommerce-app/light' className="nav-link" >
                                        </a>Light</button>



                                        <img src="./images/banner-1.jpg" alt="Coffee Photo" id="banner" />

                                    </div>

                                </div>

                                <div className="col">
                                    <div className="roast-container">
                                        <button className="roast-button" id="roast-text">    <a href='/coffee-ecommerce-app/medium' className="nav-link" >
                                        </a>Medium</button>

                                        <img src="./images/banner-1.jpg" alt="Coffee Photo" id="banner" />
                                    </div>
                                </div>


                                <div className="col">
                                    <div className="roast-container">
                                        <button className="roast-button" id="roast-text">    <a href='/coffee-ecommerce-app/dark' className="nav-link" >
                                        </a>Dark</button>

                                        <img src="./images/banner-1.jpg" alt="Coffee Photo" id="banner" />
                                    </div>

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