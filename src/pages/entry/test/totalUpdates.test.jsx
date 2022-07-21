import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

describe("Total updates", () => {
  it("should update scoop subtotal when scoop change", async () => {
    render(<Options optionType="scoops" />);

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

  it("should update toppings subtotal when user select or deselect toppings", async () => {
    render(<Options optionType="toppings" />);

    const toppingsSubtotal = screen.getByText("Toppings total: $", {
      exact: false,
    });
    expect(toppingsSubtotal).toHaveTextContent("0.00");

    const hotFudgeCheckbox = await screen.findByRole("checkbox", {
      name: "Hot fudge",
    });
    userEvent.click(hotFudgeCheckbox);
    expect(toppingsSubtotal).toHaveTextContent("1.50");

    const peanutButterCheckbox = await screen.findByRole("checkbox", {
      name: "Peanut butter cups",
    });
    userEvent.click(peanutButterCheckbox);
    expect(toppingsSubtotal).toHaveTextContent("3.00");

    userEvent.click(peanutButterCheckbox);
    expect(toppingsSubtotal).toHaveTextContent("1.50");
  });
});

describe("Grand total", () => {
  it("should start from '$0.00'", () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByText("Grand total: $", { exact: false });

    expect(grandTotal).toHaveTextContent("0.00");
  });

  it("should update properly if scoop is added first", async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByText("Grand total: $", { exact: false });
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");
    expect(grandTotal).toHaveTextContent("2.00");

    const hotFudgeCheckbox = await screen.findByRole("checkbox", {
      name: "Hot fudge",
    });
    userEvent.click(hotFudgeCheckbox);
    expect(grandTotal).toHaveTextContent("3.50");
  });

  it("should update properly if topping is added first", async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByText("Grand total: $", { exact: false });

    const hotFudgeCheckbox = await screen.findByRole("checkbox", {
      name: "Hot fudge",
    });
    userEvent.click(hotFudgeCheckbox);

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "2");

    expect(grandTotal).toHaveTextContent("5.50");
  });

  it("should update properly if item is removed", async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByText("Grand total: $", { exact: false });

    const hotFudgeCheckbox = await screen.findByRole("checkbox", {
      name: "Hot fudge",
    });
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    userEvent.click(hotFudgeCheckbox);
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "2");
    userEvent.click(hotFudgeCheckbox);
    expect(grandTotal).toHaveTextContent("4.00");

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");

    expect(grandTotal).toHaveTextContent("2.00");
  });
});
