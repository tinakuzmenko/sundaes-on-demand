import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";

const OrderConfirmation = ({ onPhaseFinish }) => {
  const [orderNumber, setOrderNumber] = useState(null);

  useEffect(() => {
    // do request

    setOrderNumber(1234567890);
  }, []);

  return !orderNumber ? (
    <h1 style={{ textAlign: "center" }}>Loading...</h1>
  ) : (
    <div style={{ textAlign: "center" }}>
      <h1>Thank you!</h1>
      <h2>Your order number is {orderNumber}</h2>
      <p>as per our terms and conditions, nothing will happen now</p>
      <Button
        variant="primary"
        type="button"
        onClick={() => onPhaseFinish("inProgress")}
      >
        Create new order
      </Button>
    </div>
  );
};

export default OrderConfirmation;
