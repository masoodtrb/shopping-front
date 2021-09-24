/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { ProductService } from "../../services/Product";

export interface Product {
  productId: string;
  name: string;
  price: 0;
  image: string;
  description: string;
  details: string;
}

function Home() {
  const [products, setProducts] = useState([]);
  const history = useHistory();
  const getProduct = async () => {
    try {
      const productsList = await ProductService.products.list(
        "?filter[skip]=0&filter[limit]=12" // wont time for make filter manager :))
      );
      setProducts(productsList);
      console.log(productsList);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <Fragment>
      <Typography>Products List</Typography>
      <Grid container spacing={3} mt={4}>
        {products.map((product: Product) => (
          <Grid xs={6} md={3} item>
            <Card onClick={() => {
              history.push(`/product/${product.productId}`)
            }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Fragment>
  );
}

export default Home;
