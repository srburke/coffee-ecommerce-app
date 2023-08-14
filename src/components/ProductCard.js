import '../styles/productCard.css';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {

    return (
        <>

            <section className="container">
                <div className="card_container">
                    <div class="card_content">
                        <div>
                            <article className="card-article">
                                <div className="card-data">
                                    <div className="card-title">{product.companyName} - {product.productName}</div>

                                </div>
                                <div className="card-image">
                                    {/* <div className="row">
                                        <div className="col">
                                            <div className='card-text'>Price</div>
                                        </div>
                                        <div className="col">
                                            <div style={{ paddingTop: "1rem", fontWeight: "400", color: "#ffffff", textAlign: "start", position: "relative", padding: "0 2rem" }}>${product.productPrice}</div>
                                        </div>
                                    </div> */}
                                    <div className='card-text'>Price</div>
                                    <div style={{ paddingTop: "1rem", fontWeight: "400", color: "#ffffff", textAlign: "start", position: "relative", padding: "0 2rem" }}>${product.productPrice}</div>
                                    <img variant="top" src={product.productImg} className="card-img" style={{ paddingBottom: "1.5rem" }} />
                                    <Link to={`/product/${product.roastLevel}/${product.id}`}><button variant="primary" style={{ background: "#ffffff", borderColor: "#ffffff", width: "200px", color: "black", borderRadius: "2px", padding: ".5rem", position: "relative", bottom: "2rem", marginTop: "1rem", fontWeight: "600", zIndex: "5" }}>Details</button></Link>
                                    <div className="card-shadow"></div>

                                </div>


                                {/* <Button data-bs-toggle="modal"
                    data-bs-target="#cartModal" style={{ background: "#191970", borderColor: "#191970" }} onClick={() => addToCart(product)}>Add to Cart</Button> */}
                            </article>
                        </div>
                    </div>
                </div >
            </section>
        </>

    )





}
export default ProductCard;
