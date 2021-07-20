import React,{useState,useEffect} from 'react';
import {Paper,Stepper,Step,StepLabel,Typography,CircularProgress,Divider,Button} from "@material-ui/core";
import useStyle from "./styles";

import { commerce } from "../../../lib/commerce";
import AddressFrom from '../AddressFrom';
import PaymentForm from '../PaymentForm';

const steps=['Shipping address','Payment details']


const Checkout = ({cart}) => {

    const classes =useStyle();
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);

    useEffect(() => {
       const generateToken =async ()=>{
        try {
            const token =await commerce.checkout.generateToken(cart.id,{type:'cart'});
            setCheckoutToken(token);
        } catch (error) {
            
        }
       }
       generateToken();
    }, [cart])

    const Confirmation =()=>(
        <div>
            confirmation
        </div>
    );

    const Form =() => activeStep===0 ?
    <AddressFrom checkoutToken={checkoutToken}/>
    :<PaymentForm/>

    return (
        <>
            <div className={classes.toolbar}/>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography varient="h4" align="center">
                        Checkout
                    </Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step)=>(
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep===steps.length ?<Confirmation/>:checkoutToken && <Form/>}
                </Paper>

            </main>

        </>
    )
}

export default Checkout
