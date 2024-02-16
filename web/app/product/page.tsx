import { gql } from "@apollo/client";
import createMarketplaceClient from "../../src/lib/marketplace-client";
import { Grid } from "@mui/material";
import ProductCell from "@/src/components/ProductCell";

export interface Product {
  _id: string;
  price: number;
  stock: number;
}

interface Props {
  products: Product[];
}

export default async function Products() {
  const client = createMarketplaceClient();
  const { data } = await client.query({
    query: gql`
      query Products {
        products {
          _id
          price
          stock  
        }
      }
    `,
  });
  return (
    <Grid container spacing={2}>
      {data.products.map((product: Product) => 
        <Grid item xs={8}>
          <ProductCell product={product}/>
        </Grid>
      )}
    </Grid>
  );
}
