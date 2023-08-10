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
                                <div className="row">
                                    <div class="col-lg-6" id="intro-title" >
                                        <h1 className="text-lg-start text-md-center text-sm-center home-title">MEET YOUR <br />  COFFEE NEEDS</h1>

                                        <h3 className="text-lg-start" style={{ marginTop: "2rem", fontSize: "1.5rem" }}>By Awakening Your Senses, One Bag at a Time</h3>

                                        <button type="button" class="btn btn-primary" id="subscribe-btn" style={{ marginTop: "1rem", backgroundColor: "hsl(150, 55%, 25%)", borderColor: "hsl(150, 55%, 25%)", marginRight: "14rem" }}>Explore Now</button>
                                    </div>

                                    <div className="container-fluid" id="intro-photo">


                                        <div class="col-lg-6">
                                            <img src="./images/homePhoto.png" alt="Coffee Photo" id="introImg" />
                                        </div>
                                    </div>

                                </div>

                                <div className="row">

                                </div>
                            </div>

                        </div>

                    </div>
                </section>

                <section style={{ marginBottom: "3em" }}>
                    <div className="row justify-content-center">
                        <div class="col-8">
                            <a href='/coffee-type/light' className="nav-link" id='link'>
                                <h1 className="text-lg-start text-md-center text-sm-center type-title" style={{ color: "black" }}>Light <br /> </h1></a>

                        </div>
                        <div className="row justify-content-center g-2 ms-4">
                            <div class="col-6">
                                <a href='/coffee-type/medium' className="nav-link" id='link'>
                                    <h1 className="text-lg-start text-md-center text-sm-center type-title" style={{ color: "black" }}>Medium <br /> </h1></a>

                            </div>
                        </div>
                        <div className="row justify-content-center g-4 ms-4">
                            <div class="col-2">
                                <a href='/coffee-type/dark' className="nav-link" id='link'>
                                    <h1 className="text-lg-start text-md-center text-sm-center type-title" style={{ color: "black" }}>Dark<br /> </h1></a>

                            </div>
                        </div>



                    </div>


                    {/* <div className='container'>
                        <Row xs={1} md={3} className="g-4" id="coffeeRow">
                            {products.map((product) => (
                                <Col align="center">
                                    <ProductCard
                                        key={product.id}
                                        product={product}

                                    />
                                </Col>
                            ))}

                        </Row>
                    </div> */}
                </section>
            </main>




        </>
    )
}

export default Home