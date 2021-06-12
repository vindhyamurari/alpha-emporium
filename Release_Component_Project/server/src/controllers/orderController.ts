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

export const allOrders = catchAsyncErrors(async (req:any, res:any, next:any) => {
    const orders = await Order.find()

    let totalAmount:any = 0;

    orders.forEach((order:any) => {
        totalAmount += order.totalPrice
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
})

export const updateOrder = catchAsyncErrors(async (req:any, res:any, next:any) => {
    const order:any = await Order.findById(req.params.id)

    if (order.orderStatus === 'Delivered') {
        return next(new ErrorHandler('You have already delivered this order', 400))
    }

    order.orderItems.forEach(async (item:any) => {
        await updateStock(item.product, item.quantity)
    })

    order.orderStatus = req.body.status,
        order.deliveredAt = Date.now()

    await order.save()

    res.status(200).json({
        success: true,
    })
})

async function updateStock(id:any, quantity:any) {
    const book:any = await Book.findById(id);

    book.stock = book.stock - quantity;

    await book.save()
}

export const deleteOrder = catchAsyncErrors(async (req:any, res:any, next:any) => {
    const order = await Order.findById(req.params.id)

    if (!order) {
        return next(new ErrorHandler('No Order found with this ID', 404))
    }

    await order.remove()

    res.status(200).json({
        success: true
    })
})
