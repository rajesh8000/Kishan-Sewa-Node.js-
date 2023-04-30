import myKey from './KhaltiKey';
import axios from 'axios';


const config = {
  publicKey: myKey.publicTestKey,
  productIdentity: '1231421223',
  productName: 'Tomatooes',
  returnUrl:'http://localhost:3000',
  productUrl: 'http://localhost:3000',
  eventHandler: {
    onSuccess(payload) {
      const data = {
        token: payload.token,
        amount: payload.amount,
        
      };
      console.log(data)
      

      axios.post('/api/orders/verifypayment', { data })
  .then((response) => {
    console.log(response.data); // verify status
  })
  .catch((error) => {
    console.log(error.message);
  });
    },

    onError(error) {
      console.log(error);
    },
    onClose() {
      console.log('widget is closing');
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
