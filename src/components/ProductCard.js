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

            <Card>
                <Card.Body>
                    <Link to={`/product/${product.roastLevel}/${product.id}`}><Card.Img variant="top" src={product.productImg} className="images" /></Link>
                    <Card.Title>{product.companyName} - {product.productName}</Card.Title>
                    <Card.Text>${product.productPrice}</Card.Text>

                    <Link to={`/product/${product.roastLevel}/${product.id}`}><Button variant="primary">Details</Button></Link>
                    {/* <Button data-bs-toggle="modal"
                        data-bs-target="#cartModal" style={{ background: "#191970", borderColor: "#191970" }} onClick={addToCart}>Add to Cart</Button> */}


                </Card.Body>


            </Card >
        </>

    )





}
export default ProductCard;
