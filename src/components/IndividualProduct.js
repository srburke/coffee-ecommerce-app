import { collection, query, doc, getDocs, getDoc, where, addDoc } from "firebase/firestore";
import { Card, Button } from 'react-bootstrap';
import { db, auth } from "../config/firebase";
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';


const IndividualProduct = (props) => {
    const [successMsg, setSuccessMsg] = useState(''); // State for success message
    const [errorMsg, setErrorMsg] = useState(''); // State for error message
    const { type, id } = useParams(); // Extract type and id from the route paramters
    const [currentProd, setCurrentProd] = useState(''); // State to store the current product

    function GetCurrentUser() {
        const [user, setUser] = useState(''); // State for the current user
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

    function GetProductData() {
        useEffect(() => {
            // Get a specific product document from Firestore based on type and id
            const getProduct = async () => {
                const docRef = doc(db, `products-${type.toUpperCase()}`, id);
                const docSnap = await getDoc(docRef);
                setCurrentProd(docSnap.data());
            };
            getProduct();
        }, [])
        return currentProd; // Return specific product as current product
    }
    GetProductData(); // Call the GetProductData function to fetch product data

    const addToCart = () => {
        if (loggeduser) {
            // If user is logged in, add the product to their cart in Firestore.
            addDoc(collection(db, `cart-${loggeduser[0].uid}`), {
                currentProd, quantity: 1
            }).then(() => {
                console.log('Product added to cart');
                setSuccessMsg('Product added to cart');
            }).catch((error) => {
                console.log(error.message);
            })
        } else {
            setErrorMsg('You need to login first');
        }
    }
    return (
        <>
            {currentProd ?
                // Check if current product exists, if so, render the following content
                <div className="container-fluid" style={{
                    backgroundColor: "hsla(23, 39%, 9%, 1)", paddingTop: "5rem", paddingBottom: "5rem"
                }}>

                    <div className="row g-0" style={{ backgroundColor: "hsla(23, 39%, 9%, 1)", borderRadius: ".25rem", marginLeft: "20rem" }}>
                        <div className="col-md-4" style={{ borderRadius: ".5rem 0 0 .5rem", backgroundColor: "#fff" }}>
                            <img src={currentProd.productImg} id="prod-image" style={{ width: "100%", height: "auto" }} />
                        </div>
                        <div className="col-md-6" style={{ backgroundColor: "#E3DAC9", paddingTop: "3rem", paddingLeft: "3rem", borderRadius: "0 .5rem .5rem 0", boxShadow: "0 16px 32px rgba(22, 39, 106, 0.251)", zIndex: "1" }}>
                            <div className="card-body" style={{ paddingTop: "3rem", paddingRight: "12rem", lineHeight: "1.5", fontFamily: "heebo" }}>
                                <h4 className="card-title" style={{ lineHeight: "1.5" }}>{currentProd.companyName} - {currentProd.productName}</h4> // Display the product's company name and product name.
                                <p style={{ color: "black" }}>${currentProd.productPrice}</p> // Display the product's price.
                                <p style={{ color: "black", marginTop: "2rem" }}>{currentProd.productDesc}</p> // Display the product's description.

                                <p style={{ color: "black", marginTop: "2rem" }}><small className="text-body-secondary">Roast: {currentProd.roastLevel}</small></p>
                                <p style={{ color: "black", }}><small className="text-body-secondary">Bean Type: {currentProd.beanType}</small></p>
                                <Button data-bs-toggle="modal"
                                    data-bs-target="#cartModal" style={{ background: "#191970", borderColor: "#191970", marginTop: "2rem" }} onClick={addToCart}>Add to Cart</Button> // Button to add the product to the cart and trigger the modal.
                            </div>

                            {successMsg && <>
                                <div>{successMsg}</div>
                            </>}
                            {errorMsg && <>
                                <div>{errorMsg}</div>
                            </>}
                        </div>
                    </div >
                </div >


                : <p>Test..</p>}

        </>
    )
}

export default IndividualProduct