import { useState } from 'react'
import styles from './CreateProduct.module.css'
import { Link, useNavigate } from 'react-router-dom';

function CreateProduct() {

    let [product, setProduct] = useState({});

    let navigate = useNavigate();

    function handleInput() {
        setProduct({ ...product, [event.target.name]: event.target.value });
    }

    function handleSubmit() {
        event.preventDefault();
        fetch("http://localhost:3000/products", {
            method: "POST",
            body: JSON.stringify(product),
            headers: {
                "Content-Type": "application/json"
            }
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

    return (
        <section className={styles.container} onSubmit={handleSubmit}>
            <div className={styles.header}>
                <h1 className={styles.container_title}>Create Product</h1>
                <Link to='/products'>
                    <i className={'fa-solid fa-list ' + styles.viewBtn}></i>
                </Link>
            </div>
            <form className={styles.form}>
                <input type="text" placeholder='Enter name' required name='name' className={styles.inp}
                    onChange={handleInput} />
                <input type="text" placeholder='Enter price' required name='price' className={styles.inp}
                    onChange={handleInput} />
                <input type="text" placeholder='Enter quantity' required name='quantity' className={styles.inp}
                    onChange={handleInput} />
                <input type="text" placeholder='Enter image URL' required name='imageURL' className={styles.inp}
                    onChange={handleInput} />
                <input type="text" placeholder='Enter category' required name='category' className={styles.inp}
                    onChange={handleInput} />
                <button type='submit' className={styles.btn}>Add Product</button>
            </form>
        </section>
    )
}

export default CreateProduct