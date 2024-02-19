'use client';
import InventoryIcon from '@mui/icons-material/Inventory';
import styled from '@emotion/styled'

type ProductIconProps = {
  size: string
};

export const ProductIcon = styled(InventoryIcon)`
  font-size: ${(props: ProductIconProps) => props.size};
`;

export default async function Products(props: { size: string }) {
  const { size } = props;
  return (
    <ProductIcon size={size}/>
  );
}
