import { useEffect, useState } from 'react'
import styles from './Products.module.css'
import { Link } from 'react-router-dom';

function Products() {

    let [products, setProducts] = useState([]);

    // to fetch the data on component load
    useEffect(() => {
        fetch("http://localhost:3000/products", {
            method: "GET"
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setProducts(data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    // to delete a product based on it's id
    function deleteProduct(id) {
        console.log(id);
        fetch("http://localhost:3000/products/" + id, {
            method: "DELETE"
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                let copyProducts = [...products];
                let index = copyProducts.findIndex((prod) => {
                    return prod._id === id;
                })
                copyProducts.splice(index, 1);
                setProducts(copyProducts);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function categoryIcon(category) {
        if (category.toUpperCase() === "ELECTRONICS") {
            return (<i className={"fa-solid fa-laptop " + styles.icon}></i>)
        }
        else if (category.toUpperCase() === "CLOTHING") {
            return (<i className={"fa-solid fa-tshirt " + styles.icon}></i>)
        }
        else if (category.toUpperCase() === "FOOTWEAR") {
            return (<i className={"fa-solid fa-shoe-prints " + styles.icon}></i>)
        }
        else {
            return (<i className={"fa-solid fa-box " + styles.icon}></i>)
        }
    }

    return (
        <section className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.container_title}>All Products</h1>
                <Link to='/create'>
                    <i className={'fa-solid fa-plus-circle ' + styles.createBtn}></i>
                </Link>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Sr No</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Quantity</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((prod, ind) => {
                            return (
                                <tr>
                                    <td>{ind + 1}</td>
                                    <td>{prod.name} {categoryIcon(prod.category)}</td>
                                    <td>{prod.price}</td>
                                    <td>{prod.category}</td>
                                    <td>{prod.quantity}</td>
                                    <td><img src={prod.imageURL} className={styles.pro_img}></img></td>
                                    <td>
                                        <div className={styles.actions}>
                                            <Link to={"/show/"+prod._id}><i className={"fa-solid fa-eye " + styles.icon_view}></i></Link>
                                            <Link to={"/update/"+prod._id}><i className={"fa-solid fa-pen-to-square " + styles.icon_edit}></i></Link>
                                            <i className={"fa-solid fa-trash " + styles.icon_delete} onClick={() => {
                                                deleteProduct(prod._id);
                                            }}></i>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </section>
    )
}

export default Products