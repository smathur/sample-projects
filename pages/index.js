import Link from 'next/link'
import Layout from '../components/layout'
export default function Index () {
    return (
        <Layout>
            <div>
                Hello World! Welcome to home.
                <p><Link href="ReactWithJSX.html"><a>Navigate to Static HTML Page with JSX hosting React Component (Server-side Redirection)</a></Link></p>
                <p><Link href="ReactWithoutJSX.html"><a>Navigate to Static HTML Page without JSX hosting React Component (Server-side Redirection)</a></Link></p>
                <p><Link href="link-target"><a>Navigate to Next JS Page (Client-side Redirection)</a></Link></p>
            </div>
        </Layout>
    )
}