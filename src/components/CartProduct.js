import Button from 'react-bootstrap/Button';
import { useContext, useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
// import { getProductData } from './productsStore';

export const CartProduct = ({ cartProduct, userid }) => {

    const [productQty, setProductQty] = useState(cartProduct.quantity);

    let price = cartProduct.currentProd.productPrice;

    const exactPrice = price * productQty

    const handleIncrement = async () => {
        setProductQty(productQty + 1);

        const prodRef = doc(db, `cart-${userid}`, `${cartProduct.id}`)
        await updateDoc(prodRef, {
            quantity: productQty + 1
        }).then(() => {
            console.log('Quantity increased')
        })
        // console.log(prodRef)
    }

    const handleDecrement = async () => {

        if (productQty >= 1) {
            setProductQty(productQty - 1);
            const prodRef = doc(db, `cart-${userid}`, `${cartProduct.id}`)
            await updateDoc(prodRef, {
                quantity: productQty - 1
            }).then(() => {
                console.log('Quantity decreased')
            })
            // console.log(prodRef)
        }

    }

    const handleRemove = async () => {
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
                <p></p>
            }

            <hr></hr>
        </div >
    )

    //  <h5>Subtotal (): {cart.getTotalCost().toFixed(2)}</h5>
    //  <Button variant="success">
    //      Purchase items!
    //  </Button>

    // <div className="container">
    //     <h4>{productData.title}</h4>
    //     <h5>{quantity} total</h5>
    //     <h5>${(quantity * productData.price).toFixed(2)}</h5>

    //     <Button className="w-50" style={{ marginTop: "1rem", marginLeft: "5rem" }} onClick={() => cart.deleteFromCart(id)}>Remove</Button>
    //     <hr></hr>
    // </div>

}

export default CartProduct;
