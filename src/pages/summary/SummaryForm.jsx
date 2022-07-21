import React, { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";

const SummaryForm = ({ onPhaseFinish }) => {
  const [isChecked, setIsChecked] = useState(false);

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>No ice cream will actually be delivered</Popover.Body>
    </Popover>
  );

  const checkboxLabel = (
    <span>
      I agree to{" "}
      <OverlayTrigger
        trigger={["hover", "focus"]}
        placement="right"
        overlay={popover}
      >
        <span style={{ color: "blue" }}>Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );

  const checkboxChangeHandler = (event) => {
    setIsChecked(event.target.checked);
  };

  const submitFormHandler = () => {
    // send request

    onPhaseFinish("complete");
  };

  return (
    <Form onSubmit={submitFormHandler}>
      <FormGroup controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={isChecked}
          onChange={checkboxChangeHandler}
          label={checkboxLabel}
        />
      </FormGroup>
      <Button variant="primary" type="submit" disabled={!isChecked}>
        Confirm order
      </Button>
    </Form>
  );
};

export default SummaryForm;
