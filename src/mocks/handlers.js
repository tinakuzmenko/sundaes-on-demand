import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost:3030/scoops", (request, response, context) => {
    return response(
      context.json([
        {
          name: "Vanilla",
          imagePath: "/images/vanilla.png",
        },
        {
          name: "Chocolate",
          imagePath: "/images/chocolate.png",
        },
      ])
    );
  }),
];
