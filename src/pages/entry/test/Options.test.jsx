import { render, screen } from "../../../test-utils/testing-library-utils";

import Options from "../Options";
import { OrderDetailsProvider } from "../../../contexts/OrderDetails";
import userEvent from "@testing-library/user-event";

describe("Options component", () => {
  it("should display image for each scoop from server", async () => {
    render(<Options optionType="scoops" />);

    const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });

    expect(scoopImages).toHaveLength(2);

    const altText = scoopImages.map((scoopImage) => scoopImage.alt);

    expect(altText).toEqual(["Vanilla scoop", "Chocolate scoop"]);
  });

  it("should display image for each topping from server", async () => {
    render(<Options optionType="toppings" />, {
      wrapper: OrderDetailsProvider,
    });

    const toppingImages = await screen.findAllByRole("img", {
      name: /topping$/i,
    });

    expect(toppingImages).toHaveLength(3);

    const altText = toppingImages.map((toppingImage) => toppingImage.alt);

    expect(altText).toEqual([
      "M&Ms topping",
      "Hot fudge topping",
      "Peanut butter cups topping",
    ]);
  });

  it("should not update the total when scoops are invalid", async () => {
    render(<Options optionType="scoops" />, {
      wrapper: OrderDetailsProvider,
    });

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "-1");

    const scoopsSubtotal = screen.getByText("Scoops total: $0.00");
    expect(scoopsSubtotal).toBeInTheDocument();
  });
});
