import catchAsyncErrors from '../middlewares/catchAsyncErrors';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Process stripe payments   =>   /api/v1/payment/process
export const processPayment = catchAsyncErrors(async (req:any, res:any, next:any) => {

    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'inr',

        metadata: { integration_check: 'accept_a_payment' }
    });

    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret
    })

})

// Send stripe API Key   =>   /api/v1/stripeapi
export const sendStripApi = catchAsyncErrors(async (req:any, res:any, next:any) => {

    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY
    })

})

