import { server } from "../../../mocks/server";
import { rest } from "msw";
import OrderEntry from "../OrderEntry";
import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import { OrderDetailsProvider } from "../../../contexts/OrderDetails";

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

    render(<OrderEntry />, {
      wrapper: OrderDetailsProvider,
    });

    await waitFor(async () => {
      const alerts = await screen.findAllByRole("alert");

      expect(alerts).toHaveLength(2);
    });
  });
});
