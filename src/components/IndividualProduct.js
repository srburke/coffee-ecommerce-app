import { collection, query, doc, getDocs, getDoc, where, addDoc } from "firebase/firestore";
import { Card, Button } from 'react-bootstrap';
import { db, auth } from "../config/firebase";
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';


const IndividualProduct = (props) => {
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const { type, id } = useParams()
    const [currentProd, setCurrentProd] = useState('');

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

    function GetProductData() {
        useEffect(() => {
            const getProduct = async () => {
                const docRef = doc(db, `products-${type.toUpperCase()}`, id);
                const docSnap = await getDoc(docRef);
                setCurrentProd(docSnap.data());
            };
            getProduct();
        }, [])
        return currentProd;
    }
    GetProductData();

    const addToCart = () => {
        if (loggeduser) {
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
                <div className="container-fluid">

                    <div className="row g-0" style={{ backgroundColor: "#fff", borderRadius: ".25rem" }}>
                        <div className="col-md-4" style={{ borderRadius: ".25rem" }}>
                            <img src={currentProd.productImg} id="prod-image" style={{ width: "100%", height: "auto" }} />
                        </div>
                        <div className="col-md-8" style={{ backgroundColor: "#E3DAC9", paddingTop: "0", paddingLeft: "3rem", borderRadius: ".5rem", boxShadow: "0 16px 32px rgba(22, 39, 106, 0.251)", zIndex: "1" }}>
                            <div className="card-body" style={{ paddingTop: "3rem", paddingRight: "12rem", lineHeight: "1.5", fontFamily: "heebo" }}>
                                <h4 className="card-title" style={{ lineHeight: "1.5" }}>{currentProd.companyName} - {currentProd.productName}</h4>
                                <p style={{ color: "black" }}>${currentProd.productPrice}</p>
                                <p style={{ color: "black" }}>{currentProd.productDesc}</p>

                                <p style={{ color: "black" }}><small className="text-body-secondary">Roast: {currentProd.roastLevel}</small></p>
                                <p style={{ color: "black" }}><small className="text-body-secondary">Bean Type: {currentProd.beanType}</small></p>
                                <Button data-bs-toggle="modal"
                                    data-bs-target="#cartModal" style={{ background: "#191970", borderColor: "#191970" }} onClick={addToCart}>Add to Cart</Button>
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