import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Navbar,
  OverlayTrigger,
  Row,
  Spinner,
  Tooltip,
} from "react-bootstrap";
import { Colors } from "../../assets";
import { ToolTipPassword } from "../../components";
import aboutIcon from "../../assets/icons/about.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useMutationRecoveryChange } from "../../utils/hooks";

type LocationState = {
  email?: string;
};

function ChangePassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = (location.state as LocationState | undefined)?.email ?? "";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    mutate: mutateRecoveryChange,
    data,
    isPending,
  } = useMutationRecoveryChange();

  const [form, setForm] = useState({
    recovery_code: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    recovery_code: "",
    password: "",
    confirmPassword: "",
  });

  const { password, confirmPassword, recovery_code } = form;

  const validateForm = () => {
    const newErrors = {
      recovery_code: "",
      password: "",
      confirmPassword: "",
    };

    if (!recovery_code) {
      newErrors.recovery_code = "Verification code is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    }

    if (password && confirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (password && password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    if (password && !password.match(/[A-Z]/g)) {
      newErrors.password =
        "Password must contain at least one uppercase letter";
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validate = validateForm();

    if (validate && email) {
      mutateRecoveryChange({
        email,
        recovery_code,
        password,
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
                <p className="fs-3 fw-semibold">Reset Password</p>
                <p>Please enter a new password.</p>
              </div>

              <Form className="mb-5" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="text" value={email} disabled />
                </Form.Group>

                <Form.Group className="mb-3" controlId="verifyCode">
                  <Form.Label>Verification code</Form.Label>
                  <Form.Control
                    type="text"
                    name="recovery_code"
                    value={recovery_code}
                    isInvalid={!!errors.recovery_code}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.recovery_code}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex flex-row">
                      <Form.Label className="me-3">Password</Form.Label>
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

                <Form.Group className="mb-3" controlId="ConfirmPassword">
                  <div className="d-flex justify-content-between">
                    <Form.Label>Confirm Password</Form.Label>
                    <FontAwesomeIcon
                      icon={faEye}
                      style={{
                        color: Colors.orange.primary,
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
                    Reset password
                  </Button>

                  <Form.Label
                    onClick={() => navigate("/login")}
                    className="my-2 d-flex justify-content-center text-decoration-underline"
                    style={{
                      color: Colors.orange.primary,
                      cursor: "pointer",
                    }}
                  >
                    Back to log in
                  </Form.Label>
                </Form.Group>

                {isPending ? (
                  <div className="d-flex justify-content-center">
                    <Spinner animation="border" variant="secondary" />
                  </div>
                ) : (
                  data?.message && (
                    <div className="d-flex flex-column align-items-center">
                      <p className="text-danger text-center">{data?.message}</p>

                      {data?.message ===
                        "Password changed. Now you can log in" && (
                        <Button
                          size="sm"
                          className="w-25 my-2"
                          variant="success"
                          onClick={() => navigate("/login")}
                        >
                          Log in
                        </Button>
                      )}
                    </div>
                  )
                )}
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
              Secure enterprise knowledge, document intelligence, and AI
              workflows — all in one place.
            </h3>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default ChangePassword;
