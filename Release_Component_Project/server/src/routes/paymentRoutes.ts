import express from 'express';
export const paymentRouter = express.Router();

import  {
    processPayment,
    sendStripApi
} from '../controllers/paymentController';

import  { isAuthenticatedUser } from  '../middlewares/auth';

paymentRouter.post('/payment/process',isAuthenticatedUser, processPayment);
paymentRouter.get('/stripeapi',isAuthenticatedUser, sendStripApi);
