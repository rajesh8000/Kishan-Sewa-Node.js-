import React from "react";
import { useEffect } from "react";
import KhaltiCheckout from "khalti-checkout-web";
import config from "./KhaltiConfig.js";


const Khalti = ({ orderDetails,onSuccess}) => {
  const { order } = orderDetails;

  config.productIdentity = order.orderItems[0].product;
  config.productName = order.orderItems[0].name;
  config.orderId = order._id;

  const checkout = new KhaltiCheckout(config);

  const handlePayment = () => {
    checkout.show({ amount: Number(order.totalPrice) * 100 });

    
    

  };

  useEffect(() => {
    const handlePaymentSuccess = (payload) => {
      
      onSuccess(payload);
    };

    document.addEventListener("khalti-checkout-success", handlePaymentSuccess);

    return () => {
      document.removeEventListener(
        "khalti-checkout-success",
        handlePaymentSuccess
      );
    };
  }, [onSuccess]);

 

  return (
    <div>
      <button onClick={handlePayment}>Pay Via Khalti</button>
    </div>
  );
};

export default Khalti;