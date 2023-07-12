import React from 'react'
import { useState } from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import { auth, googleProvider, db } from '../../config/firebase'
import { addDoc, collection } from 'firebase/firestore'
import { signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/style.css'

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate

    const [errorMsg, setErrorMsg] = useState("")
    const [successMsg, setSuccessMsg] = useState("")

    const signUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                console.log(user);
                /** creates db collection users in Firebase Firestore; everytime a user signs up they're email, password, and userId is stored.
                */
                addDoc(collection(db, "users"), {
                    email: email, password: password, uid: user.uid
                }).then(() => {
                    setSuccessMsg('Signup successful!')
                    setEmail('')
                    setPassword('')
                    setErrorMsg('')
                    setTimeout(() => {
                        setSuccessMsg('');
                    }, 4000);
                })
            }).catch((error) => {
                const errorCode = error.code;
                console.log(error.message)
                if (error.message == 'Firebase: Error(auth/invalid-email).') {
                    setErrorMsg('Please fill all required fields');
                }
                if (error.message == 'Firebase: Error (auth/email-already-in-use).') {
                    setErrorMsg('User already exists');
                }
            });
    }



    return (
        <>
            <Card className="signUp-card">
                <Card.Body>
                    <h2 className='text-center mb-4' style={{ color: "black" }}>Create Account</h2>
                    {successMsg && <>
                        <div className='success-msg'>
                            {successMsg}
                        </div>
                    </>}
                    {errorMsg && <>
                        <div className='error-msg'>
                            {errorMsg}
                        </div>
                    </>}
                    <Form>
                        <Form.Group id="email">
                            <div className="mb-3">
                                <label for="" className="form-label" style={{ color: "black" }}>Email</label>
                                <input type="email" onChange={(e) => setEmail(e.target.value)} class="form-control" name="" id="" aria-describedby="emailHelpId" placeholder="abc@mail.com" required></input>
                            </div>
                        </Form.Group>
                        <Form.Group id="password">
                            <div className="mb-3">
                                <label for="" class="form-label" style={{ color: "black" }}>Password</label>
                                <input type="password" onChange={(e) => setPassword(e.target.value)} class="form-control" name="" id="" placeholder="" required></input>
                            </div>
                        </Form.Group>
                        <Button className="w-100" onClick={signUp}>
                            Sign Up
                        </Button>
                    </Form>
                </Card.Body>

            </Card>

        </>
    )
}

export default SignUp