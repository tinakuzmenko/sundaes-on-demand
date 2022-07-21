import "./App.css";
import Container from "react-bootstrap/Container";
import OrderEntry from "./pages/entry/OrderEntry";
import { OrderDetailsProvider } from "./contexts/OrderDetails";
import { useState } from "react";
import OrderSummary from "./pages/summary/OrderSummary";
import OrderConfirmation from "./pages/confirmation/OrderConfirmation";

const App = () => {
  const [orderPhase, setOrderPhase] = useState("inProgress");

  const phaseChangeHandler = (nextPhase) => {
    setOrderPhase(nextPhase);
  };

  return (
    <Container style={{ paddingTop: "40px", paddingBottom: "40px" }}>
      <OrderDetailsProvider>
        {orderPhase === "inProgress" && (
          <OrderEntry onPhaseFinish={phaseChangeHandler} />
        )}
        {orderPhase === "review" && (
          <OrderSummary onPhaseFinish={phaseChangeHandler} />
        )}
      </OrderDetailsProvider>
      {orderPhase === "complete" && (
        <OrderConfirmation onPhaseFinish={phaseChangeHandler} />
      )}
    </Container>
  );
};

export default App;
