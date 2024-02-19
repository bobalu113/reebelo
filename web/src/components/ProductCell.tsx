'use client';
import { Box } from '@mui/material';
import { Product } from "@/app/product/Product";
import Link from 'next/link';
import ProductImage from "@/src/components/ProductImage";

export interface Props {
  product: Product;
}

export default async function Products(props: Props) {
  const { product } = props;
  return (
    <Box>
      <Link href={`/product/${product._id}`}>
        <ProductImage size="128px"/>
        <div>Product {product._id}</div>
      </Link>
      <div>Price: ${parseFloat(`${product.price}`).toFixed(2)}</div>
      <div>Stock: {product.stock}</div>
    </Box>
  );
}