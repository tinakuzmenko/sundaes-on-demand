import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import { OrderDetailsProvider } from "../../../contexts/OrderDetails";

describe("Total updates", () => {
  it("should update scoop subtotal when scoop change", async () => {
    render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider });

    const scoopsSubtotal = screen.getByText("Scoops total: $", {
      exact: false,
    });

    expect(scoopsSubtotal).toHaveTextContent("0.00");

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");

    expect(scoopsSubtotal).toHaveTextContent("2.00");

    const chocolateInput = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });

    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, "2");

    expect(scoopsSubtotal).toHaveTextContent("6.00");
  });
});