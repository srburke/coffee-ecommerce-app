import React from 'react'
import { useState, useContext, useEffect } from 'react';
import { collection, updateDoc, getDocs, where, addDoc, doc, query } from "firebase/firestore";
import { Button, container, Modal } from 'react-bootstrap';
import CartProduct from './CartProduct.js'
import { db, auth } from "../config/firebase";
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
    const navigate = useNavigate();
    function GetCurrentUser() {
        const [user, setUser] = useState('');

        useEffect(() => {
            auth.onAuthStateChanged(userlogged => { /**  Listens for changes to the auth state. If a user is logged in, getusers function is called  */
                if (userlogged) {
                    const getUsers = async () => { // Queries the users collection using query method and where clause to filter by the logged-in user's uid.
                        const q = query(collection(db, "users"), where("uid", "==", userlogged.uid));
                        // console.log(q);
                        const data = await getDocs(q); // getDocs method is used to retrieve the documents matching the query
                        setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))); // setUser function is used to update the user state with the retrieved data
                    };
                    getUsers();
                } else {
                    setUser(null);
                }
            })
        }, [])
        return user
    }
    const loggeduser = GetCurrentUser();
    // console.log(loggeduser);



    const [cartProducts, setCartProducts] = useState([]);
    if (loggeduser) {
        const getCart = async () => {
            const cartArray = [];
            const path = `cart-${loggeduser[0].uid}`;

            getDocs(collection(db, path)).then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    cartArray.push({ ...doc.data(), id: doc.id })
                });
                setCartProducts(cartArray);
            }).catch((error) => {
                console.log(error);
            })
        }
        getCart();
    }

    function getData(id) {
        let productData = cartProducts.find(product => product.id === id);
    }

    function getTotalCost() {
        let totalCost = 0;

        cartProducts.map((item) => {
            totalCost += (item.quantity * item.currentProd.productPrice)
        });
        return totalCost.toFixed(2);
    }


    const productsCount = cartProducts.reduce((sum, product) => sum + product.quantity, 0);

    return (
        <>
            {productsCount > 0 && loggeduser ?
                <>
                    <h5>Items in your cart:</h5>

                    {cartProducts.map((cartProduct) => (
                        <CartProduct key={cartProduct.id} cartProduct={cartProduct} userid={loggeduser[0].uid} />
                    ))}

                    <h5>Subtotal ({productsCount}): {getTotalCost()}</h5>
                    <Button variant="success">
                        Purchase items!
                    </Button>
                </>
                :
                <h4>There are no items in your cart!</h4>

            }

        </>
    )
}

export default Cart;