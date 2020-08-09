import styles from './link-target.module.css'
import { err404, err500 } from '../components/error-messages'
import fetch from 'node-fetch'

const LinkTarget = ({ data, posts }) => (
    <>
        {/* Inline Styling Technique */}
        <style jsx>{`
            .h1ClassDeclaredInline {
                background-color:red;
                color:yellow;
            };
        `}
        </style>

        <h1 className={'h1ClassDeclaredInline'}>This text is using CSS style declared Inline</h1>
        <h2 className={styles.h2ClassFromCSSFile}>This text is using a CSS style declared in CSS Module</h2>

        <h3>Error Message Configuration Imported from Error Messages module</h3>
        <p>Error Message 404: {err404}</p>
        <p>Error Message 500: {err500}</p>

        <h3>Static Generation with Data - Data Fetched at build time via GetStaticProps</h3>
        <p>Website: {data.site}</p>
        <p>Technologies: {data.technologies}</p>
        <p>Posts Count: {posts.length}</p>
    </>
)
//This function runs server-side only. It is called by Next JS at build time prepare static props to be passed to the page
export const getStaticProps = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    const posts = await res.json()

    const data = {
        site: "Statically Generated Website",
        technologies: "Next JS and React, SSR"
    }

    return {
        props: {
            data,
            posts
        }
    }
}

export default LinkTarget