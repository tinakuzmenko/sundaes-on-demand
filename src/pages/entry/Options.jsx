import axios from "axios";
import { useEffect, useState } from "react";
import ScoopOption from "./ScoopOption";
import Row from "react-bootstrap/Row";
import ToppingOption from "./ToppingOption";
import AlertBanner from "../common/AlertBanner";
import { pricePerItem } from "../../constants/constants";
import { useOrderDetails } from "../../contexts/OrderDetails";

const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);
  const [isError, setIsError] = useState(false);
  const [orderDetails, updateItemCount] = useOrderDetails();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`http://localhost:3030/${optionType}`);
        setItems(response.data);
      } catch (error) {
        setIsError(true);
      }
    };

    getData();
  }, [optionType]);

  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption;
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  const optionItems = items.map((item) => {
    return (
      <ItemComponent
        key={item.name}
        imagePath={item.imagePath}
        name={item.name}
        updateItemCount={(itemName, newItemCount) =>
          updateItemCount(itemName, newItemCount, optionType)
        }
      />
    );
  });

  return (
    <div style={{ margin: "20px 0" }}>
      <h2>{title}</h2>
      <p>{pricePerItem[optionType]}$ each</p>
      <p>
        {title} total: {orderDetails.totals[optionType]}
      </p>
      {!isError ? <Row>{optionItems}</Row> : <AlertBanner />}
    </div>
  );
};

export default Options;
