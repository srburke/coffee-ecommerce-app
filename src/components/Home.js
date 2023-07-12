import React from 'react'
import '../styles/home.css';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import Coffee from './Coffee';
import { useEffect, useState } from 'react';
import { collection, query, doc, getDocs, getDoc, where, addDoc } from "firebase/firestore";
import { db, auth } from "../config/firebase";


// import '.../'

const Home = (props) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = () => {
            const productsArray = [];
            const path = `products-${props.type.toUpperCase()}`;

            getDocs(collection(db, path)).then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    productsArray.push({ ...doc.data(), id: doc.id })
                    console.log(doc.id, " => ", doc.data());
                })
                setProducts(productsArray);
            }).catch((error) => {
                console.log(error.message);
            });
        }
        getProducts();
    }, [])


    return (
        <>
            <main>
                <section className="home">
                    <div className="home-bg"></div>
                    <div className="container-fluid" id="home-cont">
                        <div className='container' id="intro" >
                            <div className='section' >
                                <div className="row">
                                    <div class="col-lg-6" id="intro-title">
                                        <h1 className="text-lg-start text-md-center text-sm-center home-title">MEET YOUR <br />  COFFEE NEEDS</h1>

                                        <h3 className="text-lg-start" style={{ marginTop: "2rem", fontSize: "1.5rem" }}>By Awakening Your Senses, One Bag at a Time</h3>

                                        <button type="button" class="btn btn-primary" id="subscribe-btn" style={{ marginTop: "1rem", backgroundColor: "hsl(150, 55%, 25%)", borderColor: "hsl(150, 55%, 25%)", marginRight: "14rem" }}>Explore Now</button>
                                    </div>

                                    <div class="col-lg-6" id="intro-photo">
                                        <img src="./images/gluten-free-non-dairy-creamer.png" alt="Coffee Photo" id="introImg" />
                                    </div>

                                </div>

                                <div className="row">


                                </div>
                            </div>

                        </div>



                    </div>
                </section>

                <section>
                    <h1 className="text-lg-start text-md-center text-sm-center home-title" style={{ color: "#ffffff" }}>Medium <br /> </h1>
                    <Coffee products={products} />
                </section>
            </main>




        </>
    )
}

export default Home