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
  rest.get("http://localhost:3030/toppings", (request, response, context) => {
    return response(
      context.json([
        {
          name: "M&Ms",
          imagePath: "/images/m-and-ms.png",
        },
        {
          name: "Hot fudge",
          imagePath: "/images/hot-fudge.png",
        },
        {
          name: "Peanut butter cups",
          imagePath: "/images/peanut-butter-cups.png",
        },
      ])
    );
  }),
];
