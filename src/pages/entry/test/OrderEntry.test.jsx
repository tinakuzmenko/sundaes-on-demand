import { server } from "../../../mocks/server";
import { rest } from "msw";
import OrderEntry from "../OrderEntry";
import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import { OrderDetailsProvider } from "../../../contexts/OrderDetails";
import userEvent from "@testing-library/user-event";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("OrderEntry", () => {
  it("should handle errors for scoops and toppings routes", async () => {
    server.resetHandlers(
      rest.get("http://localhost:3030/scoops", (req, res, ctx) =>
        res(ctx.status(500))
      ),
      rest.get("http://localhost:3030/toppings", (req, res, ctx) =>
        res(ctx.status(500))
      )
    );

    render(<OrderEntry />);

    await waitFor(async () => {
      const alerts = await screen.findAllByRole("alert");

      expect(alerts).toHaveLength(2);
    });
  });

  it("should disable button where no scoops and enable button when at least one scoop", async () => {
    render(<OrderEntry />, { wrapper: OrderDetailsProvider });

    const orderButton = screen.getByRole("button", {
      name: "Order Sundae!",
    });

    expect(orderButton).toBeDisabled();

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");
    expect(orderButton).toBeEnabled();

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "0");
    expect(orderButton).toBeDisabled();
  });
});
