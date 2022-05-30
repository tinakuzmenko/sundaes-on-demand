import { render, screen } from "@testing-library/react";

import Options from "../Options";

describe("Options component", () => {
  it("should display image for each scoop from server", async () => {
    render(<Options optionType="scoops" />);

    const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });

    expect(scoopImages).toHaveLength(2);

    const altText = scoopImages.map((scoopImage) => scoopImage.alt);

    expect(altText).toEqual(["Vanilla scoop", "Chocolate scoop"]);
  });
});
