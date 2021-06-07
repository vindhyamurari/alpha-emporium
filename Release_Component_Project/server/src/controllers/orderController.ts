import Order from "../models/ordersSchema";
import Book from "../models/bookSchema"

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// Create a new order   =>  /api/v1/order/new
export const newOrder = catchAsyncErrors(async (req:any, res:any, next:any) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo

    } = req.body;
    console.log("helooooo aALPHAAAAAAAAAAA",req.user);
    
    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user.id
    })
console.log("order",order);

    res.status(200).json({
        success: true,
        order
    })
})

export const getSingleOrder = catchAsyncErrors(async (req:any, res:any, next:any) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email _id')

    if (!order) {
        return next(new ErrorHandler('No Order found with this ID', 404))
    }

    res.status(200).json({
        success: true,
        order
    })
})

export const myOrders = catchAsyncErrors(async (req:any, res:any, next:any) => {
    const orders = await Order.find({ user: req.user.id })

    res.status(200).json({
        success: true,
        orders
    })
})
