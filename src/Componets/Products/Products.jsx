import React from "react";
import {Grid} from "@material-ui/core";
import Product from "./Product/Product";


const products =[
    {id:1,name:"shocks",description:"Running Shooese",price :"5$"},
    {id:2,name:"MacBook",description:" Apple macbook",price :"5$"},
]

const Products = () => {
  return <main>
    <Grid container justify="center" spacing={4}>
        {products.map((product)=>(
            <Grid item key={product.id} xs={12} sm={6} ms={4} lg={3}>
                <Product product={product}/>
            </Grid> 
        ))}
    </Grid>


  </main>;
};

export default Products;
