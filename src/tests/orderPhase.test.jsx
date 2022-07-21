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
  const orderButton = await screen.findByRole("button", {
    name: "Order Sundae!",
  });
  userEvent.click(orderButton);

  // check summary information based on order

  // accept terms and conditions to confirm the order
  // confirm order number on confirmation page
  // click new order button on confirmation page
  // check that scoops and toppings have been reset
  // do we need to await anything to avoid test errors?
});
