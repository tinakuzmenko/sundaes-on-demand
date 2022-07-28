import { server } from "../../../mocks/server";
import { rest } from "msw";
import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import OrderConfirmation from "../OrderConfirmation";

describe("OrderConfirmation", () => {
  it("should handle errors when order request failed", async () => {
    server.resetHandlers(
      rest.post("http://localhost:3030/order", (req, res, ctx) =>
        res(ctx.status(500))
      )
    );

    render(<OrderConfirmation onPhaseFinish={jest.fn()} />);

    const alert = await screen.findByRole("alert");
    expect(alert).toBeInTheDocument();
  });
});
