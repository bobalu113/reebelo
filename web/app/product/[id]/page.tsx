import createMarketplaceClient from "@/src/lib/marketplace-client";
import { Product } from "../page";
import { gql } from "@apollo/client";
import { Button } from "@mui/material";

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

  return (
    <div>
      <div>Product: {data.productById._id}</div>
      <Button>Create Order</Button>
    </div>
  );
}
