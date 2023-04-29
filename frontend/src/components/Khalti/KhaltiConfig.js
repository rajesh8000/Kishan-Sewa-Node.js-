import myKey from "./KhaltiKey";
import axios from "axios";


const config = {
  publicKey: myKey.publicTestKey,
  productIdentity: "",
  productName: "",
  productUrl: "http://localhost:3000",
  eventHandler: {
    onSuccess(payload) {
      const data = {
        token: payload.token,
        amount: payload.amount,
      };

      axios
      .get(
        `https://meslaforum.herokuapp.com/khalti/${data.token}/${data.amount}/${myKey.secretKey}`
      )
      .then((response) => {
        localStorage.setItem("paid", JSON.stringify(true))
        localStorage.setItem("paymentResult", JSON.stringify(payload))
        window.location.reload()
      })
      .catch((error) => {
        console.log(error);
      });

     
    },

    onError(error) {
      console.log(error);
    },
    onClose() {
      console.log("widget is closing");
    },
  },
  paymentPreference: [
    "KHALTI",
    "EBANKING",
    "MOBILE_BANKING",
    "CONNECT_IPS",
    "SCT",
  ],
};

export default config;