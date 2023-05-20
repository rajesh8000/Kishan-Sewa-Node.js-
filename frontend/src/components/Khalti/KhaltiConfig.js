import myKey from './KhaltiKey';
import axios from 'axios';
import { toast } from "react-hot-toast";




const config = {
  publicKey: myKey.publicTestKey,
  productIdentity: '1231421223',
  productName: 'Tomatooes',
  productUrl: 'http://localhost:3000',
  orderId:'',
  eventHandler: {
    
    onSuccess(payload) {
      const data = {
        token: payload.token,
        amount: payload.amount,    
        
      };
     
      

axios.post('http://localhost:5000/api/orders/verifypayment',data )
     .then((response) => {
    console.log(response.data); // verify status


   // Update the database if the payment was successful
   if (response.data.status === 'Completed') {
    const orderId = response.data.order._id;

   
    axios.put(`http://localhost:5000/api/orders/${orderId}/pay`)
      .then((response) => {
        console.log(response.data); // updated order object
        
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
})
    
  .catch((error) => {
    console.log(error.message);
  });

  toast.success("Order Placed Successfully");
    },

    onError(error) {
      console.log(error);
    },
    onClose() {
      window.location.href = 'http://localhost:3000/';
    },
  },
  paymentPreference: [
    'KHALTI',
    'EBANKING',
    'MOBILE_BANKING',
    'CONNECT_IPS',
    'SCT',
  ],
};

export default config;
