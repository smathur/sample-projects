const Product = ({product}) => (
    <div>
        <h1>{product.title} - {product.id}</h1>
        <h2>{product.description}</h2>
    </div>
)

export const getStaticProps = async ({params}) => {
    const data = {
        id: params.id,
        title: 'Product ' + params.id,
        description: 'Description ' + params.id
    }

    return {
        props: {
            product: data
        }
    }
}

export const getStaticPaths = async () => {
   
    const paths = [
        {
            params: {
                id: "1"
            }
        },
        {
            params: {
                id: "2"
            }
        },
        {
            params: {
                id: "3"
            }
        },
        {
            params: {
                id: "4"
            }
        },
    ]
    
    return {
        paths,
        fallback: false
    }
}

export default Product