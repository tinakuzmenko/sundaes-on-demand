import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

test("order phases for happy path", async () => {
  // render app
  render(<App />);

  // add ice cream and topping
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });

  const hotFudgeCheckbox = await screen.findByRole("checkbox", {
    name: "Hot fudge",
  });

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  userEvent.click(hotFudgeCheckbox);

  // find and click order button
  const orderButton = screen.getByRole("button", {
    name: "Order Sundae!",
  });
  userEvent.click(orderButton);

  // check summary information based on order
  const scoopsAmount = screen.getByText("Scoops: $", { exact: false });
  expect(scoopsAmount).toHaveTextContent("2.00");

  const toppingsAmount = screen.getByText("Toppings: $", {
    exact: false,
  });
  expect(toppingsAmount).toHaveTextContent("1.50");

  const totalAmount = screen.getByText("Total: $", { exact: false });
  expect(totalAmount).toHaveTextContent("3.50");

  // accept terms and conditions to confirm the order
  const checkbox = screen.getByLabelText("I agree to Terms and Conditions", {
    exact: false,
  });
  userEvent.click(checkbox);

  const confirmationButton = screen.getByRole("button", {
    name: "Confirm order",
  });
  userEvent.click(confirmationButton);

  // confirm order number on confirmation page
  const orderNumber = await screen.findByText("Your order number is", {
    exact: false,
  });
  expect(orderNumber).toHaveTextContent("9876543210");

  // click new order button on confirmation page
  const newOrderButton = screen.getByRole("button", {
    name: /create new order/i,
  });
  userEvent.click(newOrderButton);

  // check that scoops and toppings have been reset
});
