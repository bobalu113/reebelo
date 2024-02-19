import { gql } from "@apollo/client";
import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import createOrderClient from "@/src/lib/order-client";

export interface Order {
  _id: string;
  price: number;
  quantity: number;
  carrier: string;
  trackingNumber: string;
  productId: string;
  orderStatus: string;
}

interface Props {
  orders: Order[];
}

export default async function Orders() {
  const client = createOrderClient();
  const { data } = await client.query({
    query: gql`
      query Orders {
        orders {
          _id
          carrier
          orderStatus
          price
          productId
          quantity
          trackingNumber
        }
      }
    `
  });
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Product</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell>Carrier</TableCell>
            <TableCell>Tracking</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Update</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.orders.map((order: Order) => (
            <TableRow
              key={order._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {order._id}
              </TableCell>
              <TableCell>{order.productId}</TableCell>
              <TableCell align="right">{order.quantity}</TableCell>
              <TableCell align="right">{order.price}</TableCell>
              <TableCell>{order.carrier}</TableCell>
              <TableCell>{order.trackingNumber}</TableCell>
              <TableCell>{order.orderStatus}</TableCell>
              <TableCell><Button>Update</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
