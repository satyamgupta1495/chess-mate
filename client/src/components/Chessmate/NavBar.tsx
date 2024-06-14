import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
import useControl from "./hooks/useControl";
import { toast } from "react-hot-toast";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import useChessStore from "@/store/useChessStore";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "@/helper";
import logo from "@/assets/img/chessmate.png";
import { Chess } from "chess.js";

function NavBar({ setPosition, setGame, setMode, setCurrTheme }: any) {
  const { onThemeSelect } = useControl({ setMode, setCurrTheme });
  const navigate = useNavigate();

  const { user, logout }: any = useChessStore((state) => state);

  const handleLogout = async () => {
    logout();
    navigate('/');
    try {
      const response = await logoutUser();
      if (response?.data?.success) {
        toast.success("Logged out successfully!");
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      toast.error("An error occurred during logout");
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="nav-container my-3 mx-4 z-4">
      <Navbar expand="lg" variant="dark">
        <Container fluid>
          <Navbar.Brand href="/" className="d-flex align-items-center">
            <span className="h-8 w-8 rounded-full bg-amber-400 mr-2">
              <img src={logo} alt="Chessmate Logo" />
            </span>
            <span>Chessmate</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto" variant="dark" navbarScroll>
              <NavDropdown title="Themes" id="collapsible-nav-dropdown">
                <NavDropdown.Item onClick={() => onThemeSelect("#769656")}>
                  Default
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => onThemeSelect("red")}>
                  Red
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => onThemeSelect("purple")}>
                  Purple
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => onThemeSelect("pink")}>
                  Pink
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Modes" id="collapsible-nav-dropdown">
                <NavDropdown.Item
                  onClick={() => {
                    setPosition("start");
                    setMode("analyze");
                    setGame(new Chess());
                  }}
                >
                  Two Players
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    toast("Let's do this 🤖");
                    setPosition("start");
                    setMode("random");
                    setGame(new Chess());
                  }}
                >
                  Computer
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <div className="d-flex gap-3 align-items-center user-profile">
                {user && user?.loggedInUser?._id && (
                  <>
                    <Avatar className="cursor-pointer object-contain border-solid border-2" onClick={() => navigate("/profile")}>
                      <AvatarImage className="object-fill" src={user?.loggedInUser?.avatar} />
                    </Avatar>
                    <div className="logout-btn">
                      <button onClick={handleLogout}>
                        <span>Logout</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar >
    </div >
  );
}

export default NavBar;
