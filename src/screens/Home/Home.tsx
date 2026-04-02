import { Button, Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { APP_NAME, APP_TAGLINE } from "../../utils/appConfig";

function Home() {
  return (
    <Container className="container-xl py-5">
      <Row className="align-items-center g-5">
        <Col xs={12} lg={6} className="d-flex flex-column justify-content-around">
          <div className="mb-4">
            <div className="badge rounded-pill text-bg-light border text-uppercase mb-3">
              Portfolio demo
            </div>
            <h1 className="fw-bold" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
              {APP_NAME}
            </h1>
            <p className="text-secondary fs-5 mb-4">{APP_TAGLINE}</p>
            <p className="text-secondary">
              Explore a senior-style fullstack demo for document intelligence,
              role-based chat, uploads and cloud deployment.
            </p>
          </div>
          <div className="d-flex gap-3 flex-wrap">
            <Button
              href="/login"
              className="px-4 py-2"
              style={{
                borderRadius: "10px",
                background: `linear-gradient(90deg, #00173D, #0082FC)`,
                borderWidth: 0,
              }}
            >
              Open demo
            </Button>
            <Button href="/chat" variant="outline-primary" className="px-4 py-2">
              Preview chat
            </Button>
          </div>
        </Col>
        <Col xs={12} lg={6}>
          <div
            className="rounded-4 shadow-sm border bg-white p-4"
            style={{ minHeight: 420 }}
          >
            <div className="h-100 d-flex flex-column justify-content-between">
              <div>
                <div className="small text-uppercase text-secondary fw-semibold mb-2">
                  Cloud-ready workspace
                </div>
                <h2 className="fw-bold mb-3">Document intelligence with a clean demo UX.</h2>
                <p className="text-secondary mb-4">
                  Built to showcase login, document workflows, retrieval-ready chat and
                  production-style deployment.
                </p>
              </div>
              <div className="row g-3">
                <div className="col-12 col-md-4">
                  <div className="p-3 rounded-4 border bg-light h-100">
                    <div className="fw-bold">FastAPI</div>
                    <div className="small text-secondary">Backend API and auth</div>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="p-3 rounded-4 border bg-light h-100">
                    <div className="fw-bold">React</div>
                    <div className="small text-secondary">Front office and UX</div>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="p-3 rounded-4 border bg-light h-100">
                    <div className="fw-bold">Cloud</div>
                    <div className="small text-secondary">Pages + Render</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
