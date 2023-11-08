import React, { useState } from 'react'
import { storage, db } from "../config/firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage"
import { addDoc, collection } from 'firebase/firestore'

const AddProduct = () => {
    // Define state variables for various product details and form handling
    const [productName, setProductName] = useState('');
    const [beanType, setBeanType] = useState('');
    const [roastLevel, setRoastLevel] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [productDesc, setProductDesc] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productImg, setProductImg] = useState(null);
    const [error, setError] = useState('');
    const types = ['image/png', 'image/jpeg']

    // Handle product image input
    const productImgHandler = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile && types.includes(selectedFile.type)) {
            setProductImg(selectedFile);
            setError('');
        } else {
            setProductImg(null);
            setError('Please select a valid image type png or jpeg');
        }

    }
    
    // Function to add a new product
    const addProduct = (e) => {
        e.preventDefault();
        // console.log(productname, productPrice, productImg);

        const storageRef = ref(storage, `product-images${roastLevel.toUpperCase()}/${Date.now()}`);

        // Upload the product image to Firebase storage
        uploadBytes(storageRef, productImg)
            .then(() => {
                // Get the download URL of the uploaded image
                getDownloadURL(storageRef).then(url => {
                    // Add the product details to the Firestore database
                    addDoc(collection(db, `products-${roastLevel.toUpperCase()}`), {
                        companyName,
                        productName,
                        beanType,
                        roastLevel,
                        productDesc,
                        productPrice,
                        productImg: url
                    })

                })
            }).catch(err => setError(err.message));
    }

    return (
        <div className='container'>
            <div className='container-fluid' style={{ backgroundColor: "white", borderRadius: "10px", marginTop: "3rem" }}>
                <br />
                <h2>ADD PRODUCTS</h2>
                <hr />
                <form autoComplete='off' className='form-group'>
                    <label htmlFor="product-name">Company Name</label>
                    <br />
                    <input type="text" className='form-control' required onChange={(e) => setCompanyName(e.target.value)} value={companyName} />
                    <label htmlFor="product-name">Product Name</label>
                    <br />
                    <input type="text" className='form-control' required onChange={(e) => setProductName(e.target.value)} value={productName} />
                    <label htmlFor="product-name">Coffee Bean Type</label>
                    <br />
                    <input type="text" className='form-control' required onChange={(e) => setBeanType(e.target.value)} value={beanType} />
                    <label htmlFor="product-name">Roast Level</label>
                    <br />
                    <input type="text" className='form-control' required onChange={(e) => setRoastLevel(e.target.value)} value={roastLevel} />
                    <label htmlFor="product-name">Product Description</label>
                    <br />
                    <input type="text" className='form-control' required onChange={(e) => setProductDesc(e.target.value)} value={productDesc} />
                    <label htmlFor="product-price">Product Price</label>
                    <br />
                    <input type="number" className='form-control' required onChange={(e) => setProductPrice(e.target.value)} value={productPrice} />
                    <br />
                    <label htmlFor="product-img">Product Image</label>
                    <br />
                    <input type="file" className="form-control" onChange={productImgHandler} />
                    <br />
                    <br />
                    <button className="btn btn-success btn-md mybtn" style={{ marginBottom: "2rem" }} onClick={addProduct}>ADD</button>

                </form>
                {error && <span>{error}</span>}
            </div>
        </div>
    )
}

export default AddProduct