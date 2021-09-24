import { CardMedia, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ProductService } from "../../services/Product";
import { Product as _Product } from "../Home";

interface Props {}

function Product(props: Props) {
  const {} = props;
  const params: any = useParams();
  const [product, setProduct] = useState<_Product | null>(null);

  const getProduct = async () => {
    try {
      const productRes = await ProductService.products.load(params.id);

      setProduct(productRes);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);
  return product ? (
    <Grid container spacing={3}>
      <Grid item xs={8}>
        <Typography variant="h2">{product.name}</Typography>
        <Typography>{product.details}</Typography>
      </Grid>
      <Grid item xs={4}>
        <CardMedia component="img" image={product.image} alt={product.name} />
      </Grid>
    </Grid>
  ) : (
    <></>
  );
}

export default Product;
