import { findByRole, render, screen } from "@testing-library/react";
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
  expect(orderButton).toBeInTheDocument();
  userEvent.click(orderButton);

  // check summary information based on order
  const scoopsAmount = screen.getByText("Scoops: $", { exact: false });
  expect(scoopsAmount).toBeInTheDocument();
  expect(scoopsAmount).toHaveTextContent("2.00");

  const toppingsAmount = screen.getByText("Toppings: $", {
    exact: false,
  });
  expect(toppingsAmount).toBeInTheDocument();
  expect(toppingsAmount).toHaveTextContent("1.50");

  const totalAmount = screen.getByText("Total: $", { exact: false });
  expect(totalAmount).toBeInTheDocument();
  expect(totalAmount).toHaveTextContent("3.50");

  // accept terms and conditions to confirm the order
  const checkbox = screen.getByLabelText("I agree to Terms and Conditions", {
    exact: false,
  });
  expect(checkbox).toBeInTheDocument();
  userEvent.click(checkbox);

  const confirmationButton = screen.getByRole("button", {
    name: "Confirm order",
  });
  expect(confirmationButton).toBeInTheDocument();
  userEvent.click(confirmationButton);

  const loadingText = screen.getByText("Loading", { exact: false });
  expect(loadingText).toBeInTheDocument();

  // confirm order number on confirmation page
  const thankYouHeader = await screen.findByText("Thank you", { exact: false });
  expect(loadingText).not.toBeInTheDocument();
  expect(thankYouHeader).toBeInTheDocument();

  const orderNumber = await screen.findByText("Your order number is", {
    exact: false,
  });
  expect(orderNumber).toBeInTheDocument();
  expect(orderNumber).toHaveTextContent("9876543210");

  // click new order button on confirmation page
  const newOrderButton = screen.getByRole("button", {
    name: /create new order/i,
  });
  expect(newOrderButton).toBeInTheDocument();
  userEvent.click(newOrderButton);

  // check that scoops and toppings have been reset
  expect(
    screen.getByText("Scoops total: $", { exact: false })
  ).toHaveTextContent("0.00");
  expect(
    screen.getByText("Toppings total: $", { exact: false })
  ).toHaveTextContent("0.00");

  await screen.findByRole("spinbutton", { name: "Vanilla" });
  await screen.findByRole("checkbox", { name: "Hot fudge" });
});

test("order summary should not show toppings section when no toppings", async () => {
  // render app
  render(<App />);

  // add ice cream and topping
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");

  // find and click order button
  const orderButton = screen.getByRole("button", {
    name: "Order Sundae!",
  });
  expect(orderButton).toBeInTheDocument();
  userEvent.click(orderButton);

  // check summary information based on order
  const scoopsAmount = screen.getByText("Scoops: $", { exact: false });
  expect(scoopsAmount).toBeInTheDocument();
  expect(scoopsAmount).toHaveTextContent("2.00");

  const toppingsAmount = screen.queryByText("Toppings: $", {
    exact: false,
  });
  expect(toppingsAmount).not.toBeInTheDocument();
});
