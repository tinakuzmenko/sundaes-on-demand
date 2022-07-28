import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useOrderDetails } from "../../contexts/OrderDetails";
import AlertBanner from "../common/AlertBanner";

const OrderConfirmation = ({ onPhaseFinish }) => {
  const [orderNumber, setOrderNumber] = useState(null);
  const [isError, setIsError] = useState(false);
  const [, , resetOrder] = useOrderDetails();

  const clickHandler = () => {
    resetOrder();
    onPhaseFinish("inProgress");
  };

  useEffect(() => {
    const postData = async () => {
      try {
        const response = await axios.post("http://localhost:3030/order");
        setOrderNumber(response.data.orderNumber);
      } catch (error) {
        setIsError(true);
      }
    };

    postData();
  }, []);

  if (isError) return <AlertBanner />;

  return !orderNumber ? (
    <h1 style={{ textAlign: "center" }}>Loading...</h1>
  ) : (
    <div style={{ textAlign: "center" }}>
      <h1>Thank you!</h1>
      <h2>Your order number is {orderNumber}</h2>
      <p>as per our terms and conditions, nothing will happen now</p>
      <Button variant="primary" type="button" onClick={clickHandler}>
        Create new order
      </Button>
    </div>
  );
};

export default OrderConfirmation;
