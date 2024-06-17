import styles from './NotFound.module.css'

function NotFound() {

  return (
    <div className={styles.not_found}>
        <h1>Error 404 | Not Found</h1>
        <p>Go Back to Home Page</p>
    </div>
  )
}

export default NotFound