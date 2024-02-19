import createMarketplaceClient from "@/src/lib/marketplace-client";
import { gql } from "@apollo/client";
import { Box, Button, TextField } from "@mui/material";
import ProductImage from "@/src/components/ProductImage";
import CreateOrder from "@/src/components/CreateOrder";
import { createOrder } from '@/app/actions'

export interface Product {
  _id: string;
  price: number;
  stock: number;
}

export default async function Product({params: { id }}: { params: { id: string } }) {
  const client = createMarketplaceClient();
  const { data } = await client.query({
    query: gql`
      query ProductById($id: ID!) {
        productById(id: $id) {
          _id
          price
          stock
        }
      }
    `, 
    variables: {
      id: id
    }
  });

  const product = data.productById;

  return (
    <div>
      <Box>
        <ProductImage size="256px" />
        <div>Product {product._id}</div>
        <div>Price: ${parseFloat(product.price).toFixed(2)}</div>
        <div>Stock: {product.stock}</div>
      </Box>
      <hr/>
      <CreateOrder product={product} createOrder={createOrder}/>
  </div>
  );
}
