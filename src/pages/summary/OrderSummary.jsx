import React from "react";
import SummaryForm from "./SummaryForm";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { mapEntriesToStrings } from "../../utilities/utilities";

const OrderSummary = (props) => {
  const [orderDetails] = useOrderDetails();

  return (
    <>
      <h1>Order Summary</h1>
      <h2>Scoops: {orderDetails.totals.scoops}</h2>
      <ul>
        {mapEntriesToStrings(orderDetails.scoops).map((string, index) => (
          <li key={`scoops-${index}`}>{string}</li>
        ))}
      </ul>
      <h2>Toppings: {orderDetails.totals.toppings}</h2>
      <ul>
        {mapEntriesToStrings(orderDetails.toppings).map((string, index) => (
          <li key={`toppings-${index}`}>{string}</li>
        ))}
      </ul>
      <h2>Total: {orderDetails.totals.grandTotal}</h2>
      <SummaryForm {...props} />
    </>
  );
};

export default OrderSummary;
