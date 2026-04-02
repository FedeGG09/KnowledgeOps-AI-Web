import {
  Container,
  Navbar,
  Row,
  Col,
  Form,
  Button,
  Spinner,
} from "react-bootstrap";
import Image from "react-bootstrap/esm/Image";
import logoEmail from "../../assets/icons/email.svg";
import { Colors } from "../../assets";
import { useEffect, useState } from "react";
import { useMutationVerifyUser } from "../../utils/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

type LocationState = {
  email?: string;
};

const VerifyUser = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const email = (location.state as LocationState | undefined)?.email ?? "";

  const [verifyCode, setVerifyCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [response, setResponse] = useState<any>(null);

  const { mutate: verifyUser } = useMutationVerifyUser({ setResponse });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      setResponse({
        status: 400,
        message: "Missing email. Please restart the verification flow.",
      });
      return;
    }

    setLoading(true);
    verifyUser({
      email,
      verification_code: verifyCode,
    });
  };

  useEffect(() => {
    if (response) {
      setLoading(false);

      if (response.status === 200) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    }
  }, [response, navigate]);

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
              <div className="d-flex flex-column mt-4 align-items-start">
                <Image
                  className="d-inline-block align-top mb-3"
                  src={logoEmail}
                  fluid
                  style={{
                    height: 120,
                    width: 120,
                    objectFit: "contain",
                  }}
                />
                <p className="fs-3 text-start pt-3 fw-semibold">
                  Verify your Email Address
                </p>
                <span className="text-secondary">
                  Enter the code from your email to complete the account verification.
                </span>
              </div>

              <Form className="mb-5" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="verificationCode">
                  <Form.Label>Verification Code</Form.Label>
                  <Form.Control
                    value={verifyCode}
                    isInvalid={!!response && response.status !== 200}
                    onChange={(e) => setVerifyCode(e.target.value)}
                    placeholder="Enter your verification code"
                  />
                  <Form.Control.Feedback className="text-end" type="invalid">
                    {response?.message}
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
                    disabled={loading || success}
                  >
                    {loading ? (
                      <Spinner animation="border" variant="light" size="sm" />
                    ) : success ? (
                      <FontAwesomeIcon
                        icon={faCheck}
                        size="xl"
                        style={{ color: Colors.white.primary }}
                      />
                    ) : (
                      "Verify"
                    )}
                  </Button>
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
                letterSpacing: "-0.04em",
              }}
            >
              KnowledgeOps-AI
            </h1>

            <h3
              className="w-75 mt-4"
              style={{ color: Colors.white.primary }}
            >
              Secure enterprise knowledge, document intelligence, and AI workflows — all in one place.
            </h3>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default VerifyUser;
