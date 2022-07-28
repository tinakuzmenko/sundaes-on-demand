import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ScoopOption from "../ScoopOption";

describe("ScoopOption input", () => {
  it("should check if value is right", () => {
    const updateItemCountMock = jest.fn();
    render(
      <ScoopOption
        name="Vanilla"
        imagePath=""
        updateItemCount={updateItemCountMock}
      />
    );

    const vanillaInput = screen.getByRole("spinbutton", {
      name: "Vanilla",
    });

    userEvent.clear(vanillaInput);
    expect(vanillaInput).toHaveClass("is-invalid");

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "-1");
    expect(vanillaInput).toHaveClass("is-invalid");

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "0.5");
    expect(vanillaInput).toHaveClass("is-invalid");

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "15");
    expect(vanillaInput).toHaveClass("is-invalid");

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "5");
    expect(vanillaInput).not.toHaveClass("is-invalid");
  });
});
