import { useState, useEffect } from 'react'
import styles from './ShowProduct.module.css'
import { Link, useNavigate, useParams } from 'react-router-dom';

function ShowProduct() {

    let [product, setProduct] = useState({});

    let params = useParams();

    let navigate = useNavigate();

    function deleteProduct(id) {
        console.log(id);
        fetch("http://localhost:3000/products/" + params.id, {
            method: "DELETE"
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                navigate("/products");
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        fetch("http://localhost:3000/products/" + params.id, {
            method: "GET",
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setProduct(data);
            })
            .catch((err) => {
                console.error(err);
            })
    }, [])

    return (
        <div className={styles.container}>
            <Link to="/products"><i className={"fa-solid fa-arrow-left-long " + styles.btn}></i></Link>
            <div className={styles.pro_info}>
                <img src={product.imageURL} className={styles.pro_img}></img>
                <div className={styles.pro_details}>
                    <h1 className={styles.pro_name}>{product.name}</h1>
                    <h2 className={styles.pro_price}>Price: ₹{product.price}</h2>
                    <h3 className={styles.pro_quantity}>Quantity: {product.quantity}</h3>
                    <h3 className={styles.pro_category}>Category: {product.category}</h3>
                    <Link to={"/update/" + params.id}><button className={styles.editBtn}>Edit</button></Link>
                    <button className={styles.deleteBtn} onClick={() => {
                        deleteProduct(params.id);
                    }}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default ShowProduct