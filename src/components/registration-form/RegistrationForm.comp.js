import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
  Alert,
  Dropdown,
} from "react-bootstrap";
import { newUserRegistration } from "./userRegAction";
import { useDispatch, useSelector } from "react-redux";

const initialState = {
  name: "",
  phone: "",
  email: "",
  company: "",
  address: "",
  role: "Select User Role",
  password: "",
  confirmPass: "",
};
const passVerificationError = {
  isLenthy: false,
  hasUpper: false,
  hasLower: false,
  hasNumber: false,
  hasSpclChr: false,
  confirmPass: false,
};

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const [newUser, setNewUser] = useState(initialState);
  const [passwordError, setPasswordError] = useState(passVerificationError);

  const { isLoading, status, message } = useSelector(
    (state) => state.registration
  );

  const roleValues = {
    1: "Admin",
    2: "Normal User",
  };
  useEffect(() => {}, [newUser]);

  const handleDropDownListener = (e) => {
    const { name, id } = e.target;
    console.log(" -- ", roleValues[id]);
    setNewUser({ ...newUser, role: roleValues[id] });
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setNewUser({ ...newUser, [name]: value });

    if (name === "password") {
      const isLenthy = value.length > 8;
      const hasUpper = /[A-Z]/.test(value);
      const hasLower = /[a-z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      const hasSpclChr = /[@,#,$,%,&]/.test(value);

      setPasswordError({
        ...passwordError,
        isLenthy,
        hasUpper,
        hasLower,
        hasNumber,
        hasSpclChr,
      });
    }

    if (name === "confirmPass") {
      setPasswordError({
        ...passwordError,
        confirmPass: newUser.password === value,
      });
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    // console.log(newUser);
    const { name, phone, email, company, address, role, password } = newUser;

    const newRegistration = {
      name,
      phone,
      email,
      company,
      address,
      role,
      password,
    };
    dispatch(newUserRegistration(newRegistration));
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-bck">User Registration</h1>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          {message && (
            <Alert variant={status === "success" ? "success" : "danger"}>
              {message}
            </Alert>
          )}
        </Col>
      </Row>

      <Row>
        <Col>
          <Form onSubmit={handleOnSubmit}>
            <Form.Group>
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newUser.name}
                onChange={handleOnChange}
                placeholder="Your name"
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="number"
                name="phone"
                value={newUser.phone}
                onChange={handleOnChange}
                placeholder="Phone"
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={newUser.email}
                onChange={handleOnChange}
                placeholder="Enter email"
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Company name</Form.Label>
              <Form.Control
                type="text"
                name="company"
                value={newUser.company}
                onChange={handleOnChange}
                placeholder="Company name"
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={newUser.address}
                onChange={handleOnChange}
                placeholder="Full address"
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Role</Form.Label>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {newUser.role}
                </Dropdown.Toggle>

                <Dropdown.Menu onClick={(e) => handleDropDownListener(e)}>
                  <Dropdown.Item id="1">Admin</Dropdown.Item>
                  <Dropdown.Item id="2">Normal User</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={newUser.password}
                onChange={handleOnChange}
                placeholder="Password"
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPass"
                value={newUser.confirmPass}
                onChange={handleOnChange}
                placeholder="Confirm Password"
                required
              />
            </Form.Group>
            <Form.Text>
              {!passwordError.confirmPass && (
                <div className="text-danger mb-3">Password doesn't match!</div>
              )}
            </Form.Text>

            <ul className="mb-4">
              <li
                className={
                  passwordError.isLenthy ? "text-success" : "text-danger"
                }
              >
                Min 8 characters
              </li>
              <li
                className={
                  passwordError.hasUpper ? "text-success" : "text-danger"
                }
              >
                At least one upper case
              </li>
              <li
                className={
                  passwordError.hasLower ? "text-success" : "text-danger"
                }
              >
                At least one lower case
              </li>
              <li
                className={
                  passwordError.hasNumber ? "text-success" : "text-danger"
                }
              >
                At least one number
              </li>
              <li
                className={
                  passwordError.hasSpclChr ? "text-success" : "text-danger"
                }
              >
                At least on of the special characters i.e @ # $ % &{" "}
              </li>
            </ul>

            <Button
              variant="primary"
              type="submit"
              style={{
                border: "0px",
                backgroundColor: "#662D91",
              }}
              disabled={Object.values(passwordError).includes(false)}
            >
              Submit
            </Button>
            {isLoading && <Spinner variant="info" animation="border" />}
          </Form>
        </Col>
      </Row>
      <Row className="py-4">
        <Col>
          Already have an account? <a href="/">Login Now</a>
        </Col>
      </Row>
    </Container>
  );
};

export default RegistrationForm;
