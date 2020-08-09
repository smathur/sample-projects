import Link from 'next/link'
const Products = ({ data }) => (
    <table border="1">
        <thead>
            <tr>
                <th>ID</th>
                <th>Title</th>
            </tr>
        </thead>
        <tbody>
            {
                data.map((product) => (
                    <tr key={product.id}>
                        <td><Link href="./products/[id]" as={`./products/${product.id}`}><a>{product.id}</a></Link></td>
                        <td>{product.title}</td>
                    </tr>
                ))
            }
        </tbody>
    </table>
)

export const getStaticProps = async () => {
    const data = [
        {
            id: "1",
            title: "Timing Belt"
        },
        {
            id: "2",
            title: "Brake Shoe"
        },
        {
            id: "3",
            title: "Alloy Wheels"
        }
    ]

    return {
        props: {
            data
        }
    }
}



export default Products