'use server';

import createOrderClient from "@/src/lib/order-client";
import { FetchResult, gql } from "@apollo/client";
import { Product } from "./product/Product";

export async function createOrder(props: { product: Product, quantity: number }) {
  const client = createOrderClient();
  const result = await client.mutate({
    mutation: gql`
      mutation CreateOrder($createOrderInput: CreateOrderInput!) {
        createOrder(createOrderInput: $createOrderInput) {
          _id
          price
          quantity
          carrier
          trackingNumber
          orderStatus
          productId
        }
      }
    `, 
    variables: {
      createOrderInput: {
        productId: props.product._id,
        price: props.product.price,
        quantity: props.quantity
      }
    }
  });
  client.clearStore();
  return result;
}

export type OrderCreator = (props: {
  product: Product;
  quantity: number;
}) => Promise<FetchResult<any>>;