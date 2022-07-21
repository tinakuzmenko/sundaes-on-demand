import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { pricePerItem } from "../constants/constants";
import { formatCurrency } from "../utilities/utilities";

const OrderDetails = createContext();

export const useOrderDetails = () => {
  const context = useContext(OrderDetails);

  if (!context) {
    throw new Error(
      "useOrderDetails must be used within an OrderDetailsProvider"
    );
  }

  return context;
};

export const OrderDetailsProvider = (props) => {
  const [optionCounts, setOptionCounts] = useState({
    scoops: new Map(),
    toppings: new Map(),
  });
  const zeroCurrency = formatCurrency(0);

  const [totals, setTotals] = useState({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency,
  });

  const calculateSubtotal = (type, counts) => {
    let optionCount = 0;

    for (const count of counts[type]) {
      optionCount += count[1];
    }

    return optionCount * pricePerItem[type];
  };

  useEffect(() => {
    const scoopsSubtotal = calculateSubtotal("scoops", optionCounts);
    const toppingsSubtotal = calculateSubtotal("toppings", optionCounts);
    const grandTotal = scoopsSubtotal + toppingsSubtotal;

    setTotals({
      scoops: formatCurrency(scoopsSubtotal),
      toppings: formatCurrency(toppingsSubtotal),
      grandTotal: formatCurrency(grandTotal),
    });
  }, [optionCounts]);

  const value = useMemo(() => {
    const updateItemCount = (itemName, newItemCount, optionType) => {
      const newOptionCounts = { ...optionCounts };
      const optionCountsMap = optionCounts[optionType];
      optionCountsMap.set(itemName, parseInt(newItemCount));

      setOptionCounts(newOptionCounts);
    };

    const resetOrder = () => {
      setOptionCounts({
        scoops: new Map(),
        toppings: new Map(),
      });
    };

    return [{ ...optionCounts, totals }, updateItemCount, resetOrder];
  }, [optionCounts, totals]);

  return (
    <OrderDetails.Provider value={value} {...props}></OrderDetails.Provider>
  );
};
