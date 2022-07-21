import Options from "./Options";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { Button } from "react-bootstrap";

const OrderEntry = ({ onPhaseFinish }) => {
  const [orderDetails] = useOrderDetails();

  return (
    <>
      <h1>Design your sundae!</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
      <Button
        variant="primary"
        type="button"
        onClick={() => {
          onPhaseFinish("review");
        }}
      >
        Order Sundae!
      </Button>
    </>
  );
};

export default OrderEntry;
