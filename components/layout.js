import styles from './global.module.css'
import Head from 'next/head'

const Layout = ({ children }) => (
    <>
        <Head>
            <title>Next JS Index Page</title>
        </Head>
        <div className={styles.container}>
            {children}
        </div>
    </>
)

export default Layout