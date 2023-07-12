import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import '../styles/productCard.css';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {

    return (
        <>

            <Card>
                <Card.Body>
                    <Card.Img variant="top" src={product.productImg} className="images" />
                    <Card.Title>{product.companyName} - {product.productName}</Card.Title>
                    <Card.Text>${product.productPrice}</Card.Text>

                    <Link to={`/product/${product.roastLevel}/${product.id}`}><Button variant="primary">Details</Button></Link>
                    {/* <Button variant="primary" data-bs-toggle="modal"
                        data-bs-target="#cartModal" onClick={dispatch({ type: "ADD_TO_CART", id: product.product.id, product })}>Add to Cart</Button> */}

                </Card.Body>


            </Card >

        </>

    )





}
export default ProductCard;
