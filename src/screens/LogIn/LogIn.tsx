import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Colors } from "../../assets";
import http from "../../utils/https";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/user/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { APP_NAME, APP_TAGLINE } from "../../utils/appConfig";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    try {
      const res = await http.demoLogin({ email, password });

      if (res && res.token) {
        dispatch(setUser(res));
        window.location.href = "/upload";
        return;
      }

      if (res && res.detail) {
        setResponse(res.detail);
      } else if (res && res.message) {
        setResponse(res.message);
      } else if (res && res.response?.data?.detail) {
        setResponse(res.response.data.detail);
      } else {
        setResponse("Unable to authenticate with the demo credentials.");
      }
    } catch (error: any) {
      setResponse(error?.message ?? "Unexpected error while logging in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="min-vh-100 bg-light p-0">
      <Row className="g-0 min-vh-100">
        <Col xs={12} lg={5} className="bg-white border-end d-flex align-items-center">
          <div className="w-100 p-5" style={{ maxWidth: 520, margin: "0 auto" }}>
            <div className="mb-4">
              <div className="text-uppercase small fw-semibold text-secondary">
                Demo access
              </div>
              <h1 className="fw-bold display-6 mb-2">{APP_NAME}</h1>
              <p className="text-secondary mb-0">{APP_TAGLINE}</p>
            </div>

            {response && (
              <Alert variant="danger" className="py-2">
                {response}
              </Alert>
            )}

            <Form className="mb-4" onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <div className="d-flex justify-content-between align-items-center">
                  <Form.Label>Password</Form.Label>
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label
                  type="button"
                  onClick={() => (window.location.href = "/forgot-password")}
                  className="d-flex justify-content-end"
                  style={{ color: Colors.orange.primary }}
                >
                  Forgot Password
                </Form.Label>
                <Button
                  variant="primary"
                  className="w-100 fw-medium py-2"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Accessing..." : "Access workspace"}
                </Button>
              </Form.Group>
            </Form>

            <p className="text-secondary small mb-0">
              Use the approved demo credentials to unlock chat, uploads and role-based
              workflows.
            </p>
          </div>
        </Col>

        <Col
          xs={12}
          lg={7}
          className="d-none d-lg-flex align-items-center justify-content-center p-5"
          style={{
            background: "linear-gradient(135deg, #00173D 0%, #002B6B 45%, #0082FC 100%)",
          }}
        >
          <div className="text-white" style={{ maxWidth: 620 }}>
            <span className="badge rounded-pill text-bg-light text-dark mb-3">
              Cloudflare Pages + Render
            </span>
            <h2 className="display-6 fw-bold mb-3">
              A polished document intelligence demo for your professional portfolio.
            </h2>
            <p className="lead opacity-75 mb-4">
              Authenticate once to access the workspace and showcase a fullstack,
              cloud-ready knowledge system built for interviews and technical demos.
            </p>
            <div className="d-grid gap-3">
              <div className="p-3 bg-white bg-opacity-10 rounded-4">
                Secure demo login driven by environment variables.
              </div>
              <div className="p-3 bg-white bg-opacity-10 rounded-4">
                FastAPI backend, React frontend and portfolio-friendly UX.
              </div>
              <div className="p-3 bg-white bg-opacity-10 rounded-4">
                Role-based chat, upload and retrieval flows.
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LogIn;
