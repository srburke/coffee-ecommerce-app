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
    const [cartItems, setCartItems] = useState([]);

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
            <div className='coffee-bg'>
                <div className="container text-center" style={{ paddingTop: "3rem", paddingBottom: "3rem" }}>
                    <div className="row justify-content-center align-self-center" id="coffeeRow" style={{ paddingBottom: "2rem" }}>
                        {products.map((product) => (
                            <div className="col-lg-4 col-md-6 col-sm-8">
                                <ProductCard
                                    key={product.id}
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
