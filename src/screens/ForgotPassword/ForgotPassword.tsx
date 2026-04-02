import {
  Container,
  Navbar,
  Row,
  Col,
  Form,
  Button,
  Spinner,
} from "react-bootstrap";
import { Colors } from "../../assets";
import { useMutationRecoveryCode } from "../../utils/hooks";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const {
    mutate: mutateRecoveryCode,
    data: verifyCode,
    isPending,
  } = useMutationRecoveryCode();

  const validateForm = () => {
    let newErrors = "";

    if (!email) {
      newErrors = "Email is required";
    } else if (!email.includes("@")) {
      newErrors = "Email must be valid";
    }

    setError(newErrors);
    return newErrors === "";
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      mutateRecoveryCode({ email });
    }
  };

  const handleEnterCode = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate("/forgot-password/change-password", {
      state: { email },
    });
  };

  return (
    <Container fluid>
      <Row style={{ minHeight: "100vh" }}>
        {/* LEFT PANEL */}
        <Col xs={12} md={4}>
          <Container className="d-flex flex-column justify-content-center w-100 h-100 px-4">
            <Navbar.Brand href="/" className="mb-4">
              <h2
                style={{
                  fontWeight: 700,
                  color: Colors.orange.primary,
                  margin: 0,
                }}
              >
                KnowledgeOps-AI
              </h2>
            </Navbar.Brand>

            <div className="d-flex flex-column justify-content-around h-75">
              <div className="mt-4">
                <h3 className="fw-semibold">Forgot password?</h3>
                <p>No worries, we’ll send you reset instructions.</p>
              </div>

              <Form className="mb-5" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Enter your email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    name="email"
                    value={email}
                    isInvalid={!!error}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {error}
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
                    Send
                  </Button>

                  <div
                    onClick={() => navigate("/login")}
                    className="my-3 text-center text-decoration-underline"
                    style={{
                      color: Colors.orange.primary,
                      cursor: "pointer",
                    }}
                  >
                    Back to log in
                  </div>
                </Form.Group>

                {isPending ? (
                  <div className="d-flex justify-content-center">
                    <Spinner animation="border" variant="secondary" />
                  </div>
                ) : (
                  verifyCode?.message && (
                    <div className="d-flex flex-column align-items-center">
                      <p className="text-danger text-center">
                        {verifyCode.message}
                      </p>
                      <Button
                        size="sm"
                        className="w-50"
                        variant="success"
                        onClick={handleEnterCode}
                      >
                        Enter Code
                      </Button>
                    </div>
                  )
                )}
              </Form>
            </div>
          </Container>
        </Col>

        {/* RIGHT PANEL */}
        <Col xs={12} md={8} className="bg-dark">
          <Container className="d-flex flex-column align-items-center justify-content-center w-100 h-100 text-center">
            <h1
              style={{
                color: Colors.orange.primary,
                fontWeight: 800,
                fontSize: "3rem",
              }}
            >
              KnowledgeOps-AI
            </h1>

            <h3
              className="w-75 mt-4"
              style={{ color: Colors.white.primary }}
            >
              Secure enterprise knowledge, document intelligence, and AI
              workflows — all in one place.
            </h3>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPassword;
