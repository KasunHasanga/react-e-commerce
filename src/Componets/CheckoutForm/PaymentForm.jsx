import React from "react";

import {Typography,Button,Divider} from '@material-ui/core';
import {Elements,CardElement,ElementsConsumer} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import Review from './Review'

const PaymentForm = ({checkoutToken}) => {
  return <>
  
      <Review checkoutToken={checkoutToken}/>
        <Divider/>
        <Typography varient="h6" gutterBottom style={{margin:'20px 0'}}>
            Payment Method
        </Typography>
  </>;
};

export default PaymentForm;
