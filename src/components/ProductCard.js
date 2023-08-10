import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import { collection, query, doc, getDocs, getDoc, where, addDoc } from "firebase/firestore";
import { db, auth } from "../config/firebase";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../styles/productCard.css';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {

    return (
        <>

            <section className="container">
                <div className="card_container">
                    <div class="card_content">
                        <div>
                            <article className="card-article">
                                <div className="card-image">
                                    <Link to={`/product/${product.roastLevel}/${product.id}`}><img variant="top" src={product.productImg} className="card-img" /></Link>
                                    <div className="card-shadow"></div>
                                </div>
                                <div className="card-data">
                                    <div className="card-title">{product.companyName} - {product.productName}</div>
                                    <div className="card-text">${product.productPrice}</div>
                                </div>
                                <Link to={`/product/${product.roastLevel}/${product.id}`}><Button variant="primary">Details</Button></Link>
                                {/* <Button data-bs-toggle="modal"
                    data-bs-target="#cartModal" style={{ background: "#191970", borderColor: "#191970" }} onClick={() => addToCart(product)}>Add to Cart</Button> */}
                            </article>
                        </div>
                    </div>
                </div >
            </section>
        </>

    )





}
export default ProductCard;
