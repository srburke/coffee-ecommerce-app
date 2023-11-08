import Button from 'react-bootstrap/Button';
import { useContext, useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
// import { getProductData } from './productsStore';

export const CartProduct = ({ cartProduct, userid }) => {
    // Extract quantity and initialize state for product quantity
    const [productQty, setProductQty] = useState(cartProduct.quantity);

    // Get the price of the product
    let price = cartProduct.currentProd.productPrice;

    // Calculate the exact price by multiplying the price with the product quantity
    const exactPrice = price * productQty

    // Function to handle incrementing the product quantity
    const handleIncrement = async () => {
        setProductQty(productQty + 1);

        //Get a reference to the product in the Firestore database
        const prodRef = doc(db, `cart-${userid}`, `${cartProduct.id}`)
        
        // Update the quantity in the Firestore document
        await updateDoc(prodRef, {
            quantity: productQty + 1
        }).then(() => {
            console.log('Quantity increased')
        })
        // console.log(prodRef)
    }

    // Function to handle decrementing the product quantity
    const handleDecrement = async () => {

        if (productQty >= 1) {
            setProductQty(productQty - 1);
            
            // Get a reference to the prpduct in the Firestore database
            const prodRef = doc(db, `cart-${userid}`, `${cartProduct.id}`)
            
            // Update the quantity in the Firestore document
            await updateDoc(prodRef, {
                quantity: productQty - 1
            }).then(() => {
                console.log('Quantity decreased')
            })
            // console.log(prodRef)
        }

    }

    // Function to handle removing the product from the cart
    const handleRemove = async () => {
        // Delete the document from Firestore database
        await deleteDoc(doc(db, `cart-${userid}`, `${cartProduct.id}`)).then(() => {
            console.log('Doc removed');
        })
    }

    return (
        <div className="container">

            <div className="row align-items-start">
                <div className="col-6 col-sm-6">
                    <p>{cartProduct.currentProd.productName}</p>
                </div>

                <div className="col-4 col-sm-3">
                    <p>${exactPrice.toFixed(2)}</p>
                </div>

                <div className="col-2 col-sm-2">
                    <Button onClick={handleRemove} variant="danger"> <i class="bi bi-trash3"></i></Button>
                </div>
            </div>

            {productQty > 0 ?
                <>
                    <div className="row justify-content-start">
                        <div className="col align-self-start">
                            <button onClick={handleIncrement} style={{ fontSize: "1.1rem", color: "black" }}><i class="bi bi-plus-circle-fill"></i></button>
                            <span style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>{cartProduct.quantity} total</span>
                            <button onClick={handleDecrement} style={{ fontSize: "1.1rem", color: "black" }}><i class="bi bi-dash-circle-fill"></i></button>
                        </div>

                    </div>
                </>
                :
                // <Button variant="primary" onClick={() => cart.addOneToCart(id)}>Add to Cart</Button>
                <p></p> // If the quantity is 0, display an empty paragraph
            }

            <hr></hr>
        </div >
    )

}

export default CartProduct;
