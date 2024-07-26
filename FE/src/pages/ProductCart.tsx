// ProductCard.tsx
import React from "react";
import { Product } from "../interfaces/Product";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>{product.price}</p>
      <p>{product.description}</p>
    </div>
  );
};

export default ProductCard;
