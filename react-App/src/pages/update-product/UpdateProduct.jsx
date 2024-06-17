import { useState, useEffect } from 'react'
import styles from './UpdateProduct.module.css'
import { Link, useNavigate, useParams } from 'react-router-dom';

function UpdateProduct() {

    let [product, setProduct] = useState({});
    let navigate = useNavigate();
    let params = useParams();

    useEffect(() => {
        fetch("http://localhost:3000/products/" + params.id, {
            method: "GET"
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setProduct(data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    function handleUpdate() {
        event.preventDefault();
        fetch("http://localhost:3000/products/" + params.id, {
            method: "PUT",
            body: JSON.stringify(product),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                navigate("/products");
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function handleInput() {
        setProduct({ ...product, [event.target.name]: event.target.value });
    }

    return (
        <section className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.container_title}>Update Product</h1>
                <Link to='/products'>
                    <i className={'fa-solid fa-list ' + styles.viewBtn}></i>
                </Link>
            </div>
            <form className={styles.form} onSubmit={handleUpdate}>
                <input type="text" placeholder='Enter name' required name='name' className={styles.inp}
                    onChange={handleInput} value={product.name} />
                <input type="text" placeholder='Enter price' required name='price' className={styles.inp}
                    onChange={handleInput} value={product.price} />
                <input type="text" placeholder='Enter quantity' required name='quantity' className={styles.inp}
                    onChange={handleInput} value={product.quantity} />
                <input type="text" placeholder='Enter image URL' required name='imageURL' className={styles.inp}
                    onChange={handleInput} value={product.imageURL} />
                <input type="text" placeholder='Enter category' required name='category' className={styles.inp}
                    onChange={handleInput} value={product.category} />
                <button type='submit' className={styles.btn}>Update Product</button>
            </form>
        </section>
    )
}

export default UpdateProduct