import React from 'react';
import {Container,Typography,Button,Grid} from '@material-ui/core';
import useStyle from './styles';

const Cart = ({cart}) => {

    const classes =useStyle();

     console.log(cart)

    const EmptyCart =()=>(
        <Typography varients='subtile1'> You have no items in your shopping cart, Start adding some !</Typography>

    );
    const FilledCart =()=>(
       <>
       <Grid container spacing={3}>
           {cart.line_items.map((item)=>(
               <Grid item xs={12} sm={4} key={item.id}>
                   <div> {item.name}</div>
            </Grid> 
           ))}
       </Grid>

       <div className={classes.cardDetails}>
           <Typography varients="">Subtotal :{cart.subtotal.formatted_with_symbol}</Typography>
           <div>
               <Button className={classes.emptyButton} size="large" type='Button' variant="contained" color="secondary"> Empty Cart</Button>
               <Button className={classes.checkoutButton} size="large" type='Button' variant="contained" color="primary"> Checkout</Button>
           </div>
       </div>
       
       </>

    );
    if(!cart.line_items) return <h1>loading</h1>;

    return (
        <Container>
            <div className={classes.toolbar}/>
            <Typography className={classes.title} varients="h3">Your Shopping Cart</Typography>
            {!cart.line_items.length ?<EmptyCart/> :<FilledCart/>}
        </Container>
    )
}

export default Cart