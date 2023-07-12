import React, { useState } from 'react'
import { storage, db } from "../config/firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage"
import { addDoc, collection } from 'firebase/firestore'

const AddProduct = () => {
    const [productName, setProductName] = useState('');
    const [beanType, setBeanType] = useState('');
    const [roastLevel, setRoastLevel] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [productDesc, setProductDesc] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productImg, setProductImg] = useState(null);
    const [error, setError] = useState('');
    const types = ['image/png', 'image/jpeg']

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
    const addProduct = (e) => {
        e.preventDefault();
        // console.log(productname, productPrice, productImg);

        const storageRef = ref(storage, `product-images${roastLevel.toUpperCase()}/${Date.now()}`);

        uploadBytes(storageRef, productImg)
            .then(() => {
                getDownloadURL(storageRef).then(url => {
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

    // uploadTask.on('state_change', snapshot => {
    //     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //     console.log(progress);
    // }, err => {
    //     setError(err.message);
    // }, () => {
    //     ref('product-images').child(productImg.name).getDownloadURL().then(url => {
    //         db.collection('Product').add({
    //             companyName: companyName,
    //             productName: productName,
    //             beanType: beanType,
    //             roastLevel: roastLevel,
    //             productDesc: productDesc,
    //             productPrice: Number(productPrice),
    //             productImg: url
    //         }).then(() => {
    //             setCompanyName('');
    //             setProductName('');
    //             setBeanType('');
    //             setRoastLevel('');
    //             setProductDesc('');
    //             setProductPrice(0);
    //             setProductImg('');
    //             setError('');
    //             document.getElementById('file').value = '';
    //         }).catch(err => setError(err.message));
    //     })
    // })

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