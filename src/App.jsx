import "./App.css";
import Container from "react-bootstrap/Container";
import OrderEntry from "./pages/entry/OrderEntry";
import { OrderDetailsProvider } from "./contexts/OrderDetails";

function App() {
  return (
    <Container style={{ paddingTop: "40px", paddingBottom: "40px" }}>
      <OrderDetailsProvider>
        <OrderEntry />
        {/* Summary */}
      </OrderDetailsProvider>
      {/* Confirmation */}
    </Container>
  );
}

export default App;
