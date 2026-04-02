import Container from "react-bootstrap/Container";
import { Outlet } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import userImg from "../../assets/icons/UserDefault.svg";
import { logout } from "../../redux/user/userSlice";
import { APP_NAME, APP_TAGLINE } from "../../utils/appConfig";

function Header() {
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      <Navbar expand="lg" className="bg-white border-bottom py-3">
        <Container>
          <Navbar.Brand href="/" className="d-flex flex-column text-decoration-none">
            <span className="fw-bold fs-4 text-dark">{APP_NAME}</span>
            <span className="small text-secondary">{APP_TAGLINE}</span>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="px-3 justify-content-end">
            {user && user.token !== "" ? (
              <Dropdown>
                <Dropdown.Toggle
                  variant="secondary"
                  id="dropdown-basic"
                  size="sm"
                  className="fw-semibold d-flex flex-row align-items-center"
                >
                  <div className="d-flex flex-row align-items-center justify-content-center">
                    <img
                      src={userImg}
                      alt="User"
                      style={{
                        width: "25px",
                        height: "25px",
                        objectFit: "contain",
                      }}
                    />
                    <span className="mx-2">{user.name}</span>
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  <Dropdown.Item href="/chat">Chat</Dropdown.Item>
                  <Dropdown.Item href="/upload">Upload file</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button href="/login" variant="primary" className="fw-semibold">
                Demo access
              </Button>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

export default Header;
