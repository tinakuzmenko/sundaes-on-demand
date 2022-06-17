import { Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const ToppingOption = ({ name, imagePath, updateItemCount }) => {
  const checkboxChangeHandler = (event) => {
    updateItemCount(name, event.target.checked ? 1 : 0);
  };

  return (
    <Col xs={12} sm={6} md={4} lg={2}>
      <img
        src={`http://localhost:3030${imagePath}`}
        alt={`${name} topping`}
        style={{ display: "block", margin: "0 auto", width: "75%" }}
      />
      <Form
        style={{ margin: "10px auto 20px", textAlign: "left", width: "auto" }}
      >
        <Form.Check
          type="checkbox"
          id={`topping-${name}`}
          label={name}
          style={{ display: "flex", justifyContent: "center", gap: "10px" }}
          onChange={checkboxChangeHandler}
        />
      </Form>
    </Col>
  );
};

export default ToppingOption;
