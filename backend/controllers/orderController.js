import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import axios from 'axios';
// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  console.log(order);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = req.body;

    const updatedOrder = await order.save();
    console.log(order);
    console.log(updatedOrder);

    // res.json(updatedOrder)
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');
  res.json(orders);
});

const verifyPayment = asyncHandler(async (req, res) => {
  let sendData = true;
  // let data = req.body;
  // console log data

   let data = {
   "token": "d7MQhqSz8czuQnJxx4vLWR",
   "amount": 1000
  };

  let config = {
    headers: {
      Authorization: 'Key test_secret_key_30fa44788cec473d964fd0c045d60860',
    },
  };

  axios
    .post('https://khalti.com/api/v2/payment/verify/', data, config)
    .then((response) => {
      console.log(response.data);
      //
      sendData = true;
      res.json({ verified: sendData });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error: error.message });
    });
  // true its verified false its not verify
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  verifyPayment,
};
