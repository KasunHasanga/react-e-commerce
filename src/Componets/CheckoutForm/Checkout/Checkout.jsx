import React,{useState,useEffect} from 'react';
import {Paper,Stepper,Step,StepLabel,Typography,CircularProgress,Divider,Button} from "@material-ui/core";
import useStyle from "./styles";
import {  Link} from "react-router-dom";
import { commerce } from "../../../lib/commerce";
import AddressFrom from '../AddressFrom';
import PaymentForm from '../PaymentForm';

const steps=['Shipping address','Payment details']


const Checkout = ({cart ,order, onCaptureCheckout,error }) => {

    const classes =useStyle();
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({})

    useEffect(() => {
       const generateToken =async ()=>{
        try {
            const token =await commerce.checkout.generateToken(cart.id,{type:'cart'});
            setCheckoutToken(token);
        } catch (error) {
            
        }
       }
       generateToken();
    }, [cart]);

    const nextStep =()=>setActiveStep((prevActionStep)=>prevActionStep+1);
    const backStep =()=>setActiveStep((prevActionStep)=>prevActionStep-1);

    const next =(data) =>{
        setShippingData(data);
        nextStep();
    }

    let Confirmation =()=> order.customer?(
        <>
          <div>
          <Typography varient="h5" > Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}</Typography>
            <Divider className={classes.divider}/>
            <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
          </div>
          <br/>
          <Button component={Link} to="/" varient="outlined" type="button">Back to Home</Button>
        </>
    ):(
        <div className={classes.spinner}>
            <CircularProgress/>
        </div>
    );
    if (error) {
        Confirmation = () => (
          <>
            <Typography variant="h5">Error: {error}</Typography>
            <br />
            <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
          </>
        );
      }

    const Form =() => activeStep===0 ?
    <AddressFrom checkoutToken={checkoutToken} next={next}/>
    :<PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} nextStep={nextStep} backStep={backStep} onCaptureCheckout={onCaptureCheckout}/>

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
