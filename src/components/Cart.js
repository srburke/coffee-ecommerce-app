import React from 'react'
import { useState, useEffect } from 'react';
import { collection, getDocs, where, query } from "firebase/firestore";
import { Button } from 'react-bootstrap';
import CartProduct from './CartProduct.js'
import { db, auth } from "../config/firebase";

const Cart = () => {
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

    const [cartProducts, setCartProducts] = useState([]); // State to store cart products

    // Check if a user is logged in
    if (loggeduser) {
        // Define getCart function to retrieve cart products
        const getCart = async () => {
            const cartArray = [];
            const path = `cart-${loggeduser[0].uid}`;

            // Query the cart collection to get the user's cart items
            getDocs(collection(db, path)).then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // Populate the cart array with cart item data
                    cartArray.push({ ...doc.data(), id: doc.id })
                });
                // Update the cartProducts state with the retrieved cart items
                setCartProducts(cartArray);
            }).catch((error) => {
                console.log(error);
            })
        }

        // Fetch cart items
        getCart();
    }

    // Function to calcualte the total cost of items in the cart
    function getTotalCost() {
        let totalCost = 0;

        cartProducts.map((item) => {
            // Calculate the cost of each item and add it to the total
            totalCost += (item.quantity * item.currentProd.productPrice)
        });
        // Format the total cost to two decimal places
        return totalCost.toFixed(2);
    }

    // Calculate the total number of products in the cart
    const productsCount = cartProducts.reduce((sum, product) => sum + product.quantity, 0);

    return (
        <>
            {productsCount > 0 && loggeduser ?
                <>
                    <h5>Items in your cart:</h5>

                    {cartProducts.map((cartProduct) => (
                        // Map over the cart products and render a cart product component for each
                        <CartProduct key={cartProduct.id} cartProduct={cartProduct} userid={loggeduser[0].uid} />
                    ))}

                    <h5>Subtotal ({productsCount}): {getTotalCost()}</h5>
                    <Button variant="success">
                        Purchase items!
                    </Button>
                </>
                :
                <h4>There are no items in your cart!</h4> // Display a message if the cart is empty or the user is not logged in

            }

        </>
    )
}

export default Cart;