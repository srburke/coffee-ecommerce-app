import React, { useEffect, useState } from 'react';
import '../styles/style.css';
import '../styles/coffee.css';
import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Cart from '../components/Cart';
import { collection, query, doc, getDocs, getDoc, where, addDoc } from "firebase/firestore";

import { db, auth } from "../config/firebase";

const Coffee = (props) => {

    const [products, setProducts] = useState([]);

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

    useEffect(() => {
        // getProducts function to retrieve products from the db
        const getProducts = () => {
            // Initialize an array to store the retrieved products
            const productsArray = [];
            // Construct the Firestore collection path absed on the 'type' prop (light, medium, dark)
            const path = `products-${props.type.toUpperCase()}`;

            // Fetch documents from the specifed Firestore collection
            getDocs(collection(db, path)).then((querySnapshot) => {
                // Loop through the retrieved documents
                querySnapshot.forEach((doc) => {
                    // Create an object representing the product data and include its Firestore ID
                    productsArray.push({ ...doc.data(), id: doc.id })
                    // Log the Firestore document ID and its data to the console (for debugging)
                    console.log(doc.id, " => ", doc.data());
                })

                // Update the state with the fetched products
                setProducts(productsArray);
            }).catch((error) => {
                // Handle any errors that may occur during the Firestore fetch
                console.log(error.message);
            });
        }
        // Call the 'getProducts' function when the component is mounted
        getProducts();
    }, []) // Empty dependency array ensures this effect runs only once when the component mounts.

    return (
        <>
            <div className='coffee-bg'>
                <div className="container text-center" style={{ paddingTop: "3rem", paddingBottom: "3rem" }}>
                    <div className="row justify-content-center align-self-center" id="coffeeRow" style={{ paddingBottom: "2rem" }}>
                        // For each product in the products array, render the following block
                        {products.map((product) => (
                            <div className="col-lg-4 col-md-6 col-sm-8">
                                <ProductCard
                                    // Key prop to unique identifier
                                    key={product.id}
                                    // Pass the product data as a prop to the ProductCard component
                                    product={product}
                                />
                            </div>

                        ))}

                    </div>


                </div>
            </div>

        </>
    )
}
export default Coffee;
