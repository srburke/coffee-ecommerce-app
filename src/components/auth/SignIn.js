import React from 'react'
import { useState } from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import { auth, googleProvider } from '../../config/firebase'
import { signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/style.css'
import SignUp from './SignUp'


const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    console.log(auth?.currentUser?.email);

    const signIn = async () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setSuccessMsg("Logged in successfully!")
                setEmail('')
                setPassword('')
                setTimeout(() => {
                    setSuccessMsg("");
                }, 3000);
                // console.log(userCredential)
            }).catch((error) => {
                const errorCode = error.code;
                console.log(error.message)
                if (error.message == 'Firebase: Error(auth/invalid-email).') {
                    setErrorMsg('Please fill all required fields');
                }
                if (error.message == 'Firebase: Error (auth/user-not-found).') {
                    setErrorMsg('Email not found!');
                }
                if (error.message == 'Firebase: Error (auth/wrong-password).') {
                    setErrorMsg('Invalid Password!');
                }
            });


    };

    return (
        <>

            <Card className="signIn-card">
                <Card.Body>
                    <h2 className='text-center mb-4' style={{ color: "black" }}>Sign In</h2>
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
                                <input type="email" onChange={(e) => setEmail(e.target.value)} className="form-control" name="" id="" aria-describedby="emailHelpId" placeholder="abc@mail.com" required></input>
                            </div>
                        </Form.Group>
                        <Form.Group id="password">
                            <div className="mb-3">
                                <label for="" class="form-label" style={{ color: "black" }}>Password</label>
                                <input type="password" onChange={(e) => setPassword(e.target.value)} className="form-control" name="" id="" placeholder="" required></input>
                            </div>
                        </Form.Group>
                        <Button className="w-100" onClick={signIn}>
                            Sign In
                        </Button>
                    </Form>
                </Card.Body>

            </Card>
            <span className="cardOption">OR</span>
            <SignUp />








        </>
    )
}

export default SignIn