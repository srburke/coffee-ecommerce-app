import React from 'react'
import '../styles/account.css';
import SignIn from './auth/SignIn';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth, db } from '../config/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';


const Account = () => {

    // const [showAccount, setAccount] = useState(true);
    const [authUser, setAuthUser] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user)
            } else {
                setAuthUser(null);
            }
        })

        return () => {
            listen();
        }
    }, [])



    const userSignOut = () => {
        signOut(auth).then(() => {
            console.log("Sign out successful")
            navigate('/');
        }).catch(error => console.log(error))
    }

    return (

        //Need to improve

        // <button onClick={userSignOut}>Sign Out</button>
        <div className='container' id="account">
            <div>{authUser ? <><p>{`Signed in as ${authUser.email}`}</p><button onClick={userSignOut} className="sign-out">Sign Out</button></> : <SignIn />}
            </div>
        </div>

    )
}



export default Account