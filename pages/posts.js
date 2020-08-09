import fetch from 'node-fetch'

export default ({posts}) => (
    <>
        <p>{posts.length}</p>
        <table border="1">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>User Id</th>
                    <th>Title</th>
                </tr>
            </thead>
            <tbody>
                {posts.map(({id, userId, title}) => (
                    <tr key={id}>
                        <td>{id}</td>
                        <td>{userId}</td>
                        <td>{title}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </>
)

export const getStaticProps = async (ctx) => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    const posts = await res.json()
    return {
        props: {
            posts,
        },
    }
}