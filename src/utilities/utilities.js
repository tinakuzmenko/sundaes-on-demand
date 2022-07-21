export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
};

export const mapEntriesToStrings = (map) => {
  const entries = [];

  for (const [key, value] of map) {
    entries.push(key + ": " + value);
  }

  return entries;
};
