import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  Jumbotron,
  Row,
  Col,
  Button,
  Spinner,
  Alert,
  Dropdown,
} from "react-bootstrap";
import { openNewTicket } from "./addTicketAction";
import { shortText } from "../../utils/validation";
import { restSuccessMSg } from "./addTicketSlicer";

import "./add-ticket-form.style.css";

const initialFrmDt = {
  subject: "",
  issueDate: "", 
  severity:"Select Severity",
  message: "",
};
const initialFrmError = {
  subject: false,
  issueDate: false,
  severity:false,
  message: false,
};

export const AddTicketForm = () => {
  const dispatch = useDispatch();

  const {
    user: { name },
  } = useSelector((state) => state.user);

  const { isLoading, error, successMsg } = useSelector(
    (state) => state.openTicket
  );

  const [frmData, setFrmData] = useState(initialFrmDt);
  const [frmDataErro, setFrmDataErro] = useState(initialFrmError);

  useEffect(() => {
    return () => {
      successMsg && dispatch(restSuccessMSg());
    };
  }, [dispatch, frmData, frmDataErro, successMsg]);

  const sevValues = {
    1: "Severity 1",
    2: "Severity 2",
    3: "Severity 3",
    4: "Severity 4",
  };

  const handleDropDownListener = (e) => {
    const { name, id } = e.target;
    setFrmData({ ...frmData, severity: sevValues[id] });
  };

  const navigateBackListener = (e) => {
    window.location.href="/dashboard";
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setFrmData({
      ...frmData,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    setFrmDataErro(initialFrmError);

    const isSubjectValid = await shortText(frmData.subject);

    setFrmDataErro({
      ...initialFrmError,
      subject: !isSubjectValid,
    });

    dispatch(openNewTicket({ ...frmData, sender: name }));
    navigateBackListener()
  };

  return (
    <Jumbotron className="mt-3 add-new-ticket bg-light">
      <h1 className="text-bck text-center">Add New Ticket</h1>
      <hr />
      <div>
        {error && <Alert variant="danger">{error}</Alert>}
        {successMsg && <Alert variant="primary">{successMsg}</Alert>}
        {isLoading && <Spinner variant="primary" animation="border" />}
      </div>
      <Form autoComplete="off" onSubmit={handleOnSubmit}>
        <Form.Group as={Row}>
          <Form.Label column sm={3}>
            Subject
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              name="subject"
              value={frmData.subject}
              // minLength="3"
              maxLength="100"
              onChange={handleOnChange}
              placeholder="Subject"
              required
            />
            <Form.Text className="text-danger">
              {frmDataErro.subject && "SUbject is required!"}
            </Form.Text>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={3}>
            Issue Found
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="date"
              name="issueDate"
              value={frmData.issueDate}
              onChange={handleOnChange}
              required
            />
          </Col>
        </Form.Group>
        <Form.Group>
              <Form.Label>Severity</Form.Label>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {frmData.severity}
                </Dropdown.Toggle>

                <Dropdown.Menu onClick={(e) => handleDropDownListener(e)}>
                  <Dropdown.Item id="1">Severity 1</Dropdown.Item>
                  <Dropdown.Item id="2">Severity 2</Dropdown.Item>
                  <Dropdown.Item id="3">Severity 3</Dropdown.Item>
                  <Dropdown.Item id="4">Severity 4</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="message"
            rows="5"
            value={frmData.message}
            onChange={handleOnChange}
            required
          />
        </Form.Group>

      <div style={{display:"flex"}}>
        <Button
          onClick={navigateBackListener}
          style={{
            margin: "0.5rem 1rem",
            backgroundColor: "#662D91",
          }}
          block
        >
          Cancel
        </Button>
        <Button
          type="submit"
          style={{
            margin: "0.5rem 1rem",
            backgroundColor: "#662D91",
          }}
          block
        >
          Open Ticket
        </Button>
      </div>
      </Form>
    </Jumbotron>
  );
};

// AddTicketForm.propTypes = {
//   handleOnSubmit: PropTypes.func.isRequired,
//   handleOnChange: PropTypes.func.isRequired,
//   frmDt: PropTypes.object.isRequired,
//   frmDataErro: PropTypes.object.isRequired,
// };
