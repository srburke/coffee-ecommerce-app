import React from 'react'
import '../styles/navbar.css';
import Account from './Account.js';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, container, Modal } from 'react-bootstrap';
import Cart from './Cart.js'




const NavBar = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>

            <nav className="navbar navbar-expand-lg navbar-dark">
                <div className="container-fluid">
                    <span className="w-100 d-lg-none d-block"></span>
                    <a className="navbar-brand d-none d-lg-inline-block" href="/">Coffee Caravan</a>
                    <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse flex-grow-1" id="collapsibleNavId">
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item">
                                <Link to='/' id="link" className="nav-link" aria-current="page">Home<span
                                    className="visually-hidden">(current)</span></Link>
                            </li>
                            <li class="nav-item dropdown" id="link">
                                <a className="nav-link dropdown-toggle" id="link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Coffee Bags
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a href='/coffee-type/light' className="nav-link" id='link'>Light Roast</a></li>
                                    <li><a href='/coffee-type/medium' className="nav-link" id="link">Medium Roast</a></li>
                                    <li><a href='/coffee-type/dark' className="nav-link" id="link">Dark Roast</a></li>
                                </ul>
                            </li>


                        </ul>

                        <button
                            type="button"
                            className="bi bi-cart"
                            data-bs-toggle="modal"
                            data-bs-target="#cartModal"
                            style={{ fontSize: "1.1rem", color: "#f4e6cc" }}></button>
                        <button
                            type="button"
                            className="bi bi-person-circle px-3"
                            data-bs-toggle="modal"
                            data-bs-target="#accountModal"
                            style={{ fontSize: "1.1rem", color: "#f4e6cc" }}></button>

                    </div>
                </div>
            </nav>

            <div
                className="modal fade in"
                id="cartModal"
                tabindex="-1"
                aria-labelledby="cartModalLabel"
                aria-hidden="true"
            >
                <div className="container" id="cart-content">
                    <div className="modal-dialog modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3 className='modal-title'>Your Cart</h3>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"

                                ></button>

                            </div>

                            <div className="modal-body">
                                <Cart />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="modal fade in"
                id="accountModal"
                tabindex="-1"
                aria-labelledby="accountModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content" id="account-content">
                        <div className="modal-header">
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"

                            ></button>
                        </div>
                        <div className="modal-body">
                            <Account />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavBar;