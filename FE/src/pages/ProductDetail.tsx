import React, { useEffect, useState } from 'react'
import { Product } from '../interfaces/Product'
import { useParams } from 'react-router-dom';
import { instance } from '../apis';
import { Button, Col, Container, Row } from 'react-bootstrap';

type Props = {
    products: Product[],
}

const ProductDetail = ({  }: Props) => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product>({
        image: "",
        title: "",
        price: 0,
        description: "",
    });

    useEffect(() => {
        (async () => {
            try {
                const { data } = await instance.get(`/products/${id}`);
                setProduct(data.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        })();
    }, [id]);
    return (
        <div className="container">
            <h1>Chi tiết sản phẩm</h1>
            <div className="row">
                <div className="col-12 col-md-6">
                    <img src={product.image} alt="" />
                </div>
                <div className="col-12 col-md-6">
                    <h1>{product.title}</h1>
                    <p>Giá: {product.price}</p>
                    <p>{product.description}</p>
                    <button className='btn btn-primary'>Mua</button>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail