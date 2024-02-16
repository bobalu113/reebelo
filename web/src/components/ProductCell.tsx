'use client';
import InventoryIcon from '@mui/icons-material/Inventory';
import styled from '@emotion/styled'
import { Box } from '@mui/material';
import { Product } from '@/app/product/page';
import Link from 'next/link';

export interface Props {
  product: Product;
}

const ProductIcon = styled(InventoryIcon)`
  font-size: 128px;
`;

export default async function Products(props: Props) {
  const { product } = props;
  return (
    <Box>
      <Link href={`/product/${product._id}`}>
        <ProductIcon />
        <div>Product {product._id}</div>
      </Link>
      <div>Price: {product.price}</div>
      <div>Stock: {product.stock}</div>
    </Box>
  );
}