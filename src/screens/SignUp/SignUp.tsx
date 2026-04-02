import {
  Container,
  Navbar,
  Row,
  Col,
  Form,
  Button,
  Tooltip,
} from "react-bootstrap";
import { Colors } from "../../assets";
import { useEffect, useState } from "react";
import aboutIcon from "../../assets/icons/about.svg";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { useMutationSignUp } from "../../utils/hooks";
import { IResponse } from "../../utils/types";
import { useNavigate } from "react-router-dom";
import { ToolTipPassword } from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const SignUp = () => {
  const [response, setResponse] = useState<IResponse | any>();
  const [responseError, setResponseError] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { mutate: signUp } = useMutationSignUp({ setResponse });
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { firstName, lastName, email, password, confirmPassword } = form;

  const validateForm = () => {
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!firstName) newErrors.firstName = "First name is required";
    if (!lastName) newErrors.lastName = "Last name is required";
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    if (!confirmPassword)
      newErrors.confirmPassword = "Confirm password is required";

    if (password && confirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (password && password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    if (password && !password.match(/[A-Z]/g)) {
      newErrors.password = "Password must contain at least one uppercase letter";
    }

    if (password && !password.match(/[0-9]/g)) {
      newErrors.password = "Password must contain at least one digit";
    }

    if (password && !password.match(/[#?!@$%^&-']/g)) {
      newErrors.password =
        "Password must contain at least one special character";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (!response) return;

    const isSuccess =
      response?.status === 200 ||
      response?.success === true ||
      String(response?.message ?? "")
        .toLowerCase()
        .includes("success");

    if (isSuccess) {
      navigate("/signup/verify-user", {
        state: {
          email,
        },
      });
    } else {
      setResponseError(
        response?.message ?? response?.detail ?? "Unable to create account"
      );
    }
  }, [response, navigate, email]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResponseError("");

    const validate = validateForm();
    if (validate) {
      signUp({
        name: firstName,
        lastName: lastName,
        email: email,
        password: password,
      });
    }
  };

  return (
    <Container fluid>
      <Row style={{ minHeight: "100vh" }}>
        <Col xs={12} md={4}>
          <Container className="d-flex flex-column justify-content-center w-100 h-100 px-4">
            <Navbar.Brand href="/" className="mb-4">
              <h2
                style={{
                  fontWeight: 800,
                  color: Colors.orange.primary,
                  margin: 0,
                  letterSpacing: "-0.03em",
                }}
              >
                KnowledgeOps-AI
              </h2>
            </Navbar.Brand>

            <div className="d-flex flex-column justify-content-around h-75">
              <div className="mt-4">
                <p className="fs-3 fw-semibold">Create your account</p>
                <div className="d-flex flex-row" style={{ color: Colors.gray.primary }}>
                  <p>Already a member?</p>
                  <span
                    onClick={() => navigate("/login")}
                    className="mx-2"
                    style={{
                      color: Colors.orange.primary,
                      cursor: "pointer",
                    }}
                  >
                    Log In
                  </span>
                </div>
              </div>

              <Form className="mb-5" onSubmit={handleSubmit}>
                <Row>
                  <Col xs={6}>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="firstName">First Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        placeholder="Enter your first name"
                        value={firstName}
                        isInvalid={!!errors.firstName}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.firstName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col xs={6}>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="lastName">Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        placeholder="Enter your last name"
                        value={lastName}
                        isInvalid={!!errors.lastName}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.lastName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex flex-row">
                      <Form.Label>Password</Form.Label>
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip id="password-tooltip">
                            <ToolTipPassword />
                          </Tooltip>
                        }
                      >
                        <img
                          src={aboutIcon}
                          alt="About"
                          style={{
                            marginLeft: "2%",
                            cursor: "pointer",
                            height: 20,
                            width: 20,
                          }}
                        />
                      </OverlayTrigger>
                    </div>

                    <FontAwesomeIcon
                      icon={faEye}
                      style={{
                        color: Colors.orange.primary,
                        marginRight: "2%",
                        cursor: "pointer",
                      }}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  </div>

                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="confirmPassword">
                  <div className="d-flex justify-content-between">
                    <Form.Label>Confirm Password</Form.Label>
                    <FontAwesomeIcon
                      icon={faEye}
                      style={{
                        color: Colors.orange.primary,
                        marginRight: "2%",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    />
                  </div>

                  <Form.Control
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleChange}
                    isInvalid={!!errors.confirmPassword}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.confirmPassword}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Button
                    className="col-12 fw-medium"
                    style={{
                      background: Colors.orange.primary,
                      color: "#fff",
                      border: "none",
                    }}
                    type="submit"
                  >
                    Create Account
                  </Button>

                  {responseError && (
                    <div className="py-3">
                      <span className="text-danger">{responseError}</span>
                    </div>
                  )}
                </Form.Group>
              </Form>
            </div>
          </Container>
        </Col>

        <Col xs={12} md={8} className="bg-dark">
          <Container className="d-flex flex-column align-items-center justify-content-center w-100 h-100 text-center px-4">
            <h1
              style={{
                color: Colors.orange.primary,
                fontWeight: 800,
                fontSize: "3rem",
              }}
            >
              KnowledgeOps-AI
            </h1>

            <h3 className="w-75 mt-4" style={{ color: Colors.white.primary }}>
              Your knowledge base enriched with intelligent conversations.
            </h3>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
