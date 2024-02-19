'use client';
import { OrderCreator } from '@/app/actions';
import { Product } from '@/app/product/page';
import styled from '@emotion/styled'
import { Alert, Button, Grid, TextField } from '@mui/material';
import { FormEvent, useState } from 'react';

export const QuantityInput = styled(TextField)`
  width: 96px;
`;

export default function CreateOrder(props: { product: Product, createOrder: OrderCreator }) {
  const [ quantity, setQuantity ] = useState(1);
  const [ orderNumber, setOrderNumber ] = useState(undefined);
  const { product, createOrder } = props;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = await createOrder({ product, quantity });

    setOrderNumber(result.data.createOrder._id);
    return false;
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <QuantityInput
            required
            id="quantity"
            label="Quantity"
            type="number"
            onChange={q => setQuantity(parseInt(q.target.value))}
            inputProps={{ min: 1, max: product.stock }}
            value={quantity}
          />
        </Grid>
        <Grid item xs={8}>
          <Button variant='outlined' type="submit">Order Product</Button>
        </Grid>
      </Grid>
      { orderNumber 
        ? <Alert severity="success">Successfully created order number {orderNumber}.</Alert>
        : ''
      }
    </form>
  );
}
