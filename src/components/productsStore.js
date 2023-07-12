
// const [products, setProducts] = useState([]);

// useEffect(() => {
//     const getProducts = () => {
//         const productsArray = [];
//         const path = `products-${props.type.toUpperCase()}`;
//         console.log(props);

//         getDocs(collection(db, path)).then((querySnapshot) => {
//             querySnapshot.forEach((doc) => {
//                 productsArray.push({ ...doc.data(), id: doc.id })
//                 console.log(doc.id, " => ", doc.data());
//             })
//             setProducts(productsArray);
//         }).catch((error) => {
//             console.log(error.message);
//         });
//     }
//     getProducts();
// }, [])
// console.log(props.type)

// export function getProductData(id) {
    
    
//     let productData = products.find(product => product.id === id)

//     if (productData == undefined) {
//         console.log("Product data does not exist for ID: " + id);
//         return undefined;
//     }

//     return productData;
// }
// export { getProductData };
