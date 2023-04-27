import React, { useEffect, useState } from "react";

const supportedPaymentMethods = [
  {
    supportedMethods: ["https://cred-web-stg.dreamplug.in/checkout/pay"],
  },
];

const paymentDetails = {
  total: {
    label: "dummy data",
    amount: {
      currency: "INR",
      value: "10.00",
    },
  },
};

const paymentRequest = new PaymentRequest(supportedPaymentMethods, paymentDetails);

const canMakePaymentPromise = paymentRequest.canMakePayment();

const App = () => {
  const [hasCredApp, setHasCredApp] = useState(false);

  useEffect(() => {
    canMakePaymentPromise
      .then((result) => {
        if (result) {
          //Browser detected CRED app.
          setHasCredApp(true);
        } else {
          // The user does not have a CRED app / not supported browser.
          // Redirect to traditional checkout flow.
          setHasCredApp(false);
        }
      })
      .catch((err) => {
        // fallback to traditional checkout flow.
        setHasCredApp(false);
      });
  }, []);

  return <div>{hasCredApp ? "true" : "false"}</div>;
};

export default App;
