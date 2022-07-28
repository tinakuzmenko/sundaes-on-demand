import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useState } from "react";

const ScoopOption = ({ name, imagePath, updateItemCount }) => {
  const [inputIsValid, setInputIsValid] = useState(true);

  const inputChangeHandler = (event) => {
    const isValid =
      event.target.value &&
      event.target.value >= 0 &&
      event.target.value <= 10 &&
      event.target.value % 1 === 0;

    setInputIsValid(isValid);

    if (isValid) updateItemCount(name, event.target.value);
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        src={`http://localhost:3030${imagePath}`}
        alt={`${name} scoop`}
        style={{ display: "block", margin: "0 auto", width: "75%" }}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: "10px" }}
      >
        <Form.Label column xs={"6"} style={{ textAlign: "right" }}>
          {name}
        </Form.Label>
        <Col xs={"5"} style={{ textAlign: "left" }}>
          <Form.Control
            type="number"
            defaultValue={0}
            isInvalid={!inputIsValid}
            onChange={inputChangeHandler}
            style={{ maxWidth: "80px" }}
          />
        </Col>
      </Form.Group>
    </Col>
  );
};

export default ScoopOption;
