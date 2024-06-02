import { Nav, Navbar, NavDropdown } from "react-bootstrap"
import useControl from "./hooks/useControl"
import { toast } from "react-hot-toast"
import Container from 'react-bootstrap/Container';
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import useChessStore from "@/store/useChessStore";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "@/helper";
import logo from "@/assets/img/chessmate.png"

function NavBar({ setGame, setMode, setCurrTheme }: any) {
  const { onThemeSelect } = useControl({ setGame, setMode, setCurrTheme })
  const navigate = useNavigate()

  const { user, logout, isUserLoggedOut }: any = useChessStore((state) => state)

  const handleLogout = async () => {
    logout();
    navigate('/');
    try {
      const response: any = await logoutUser();
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
    <div className="nav-container mx-20 my-3 show-top">
      <Navbar expand="lg" data-bs-theme="dark">
        <Container fluid>
          <Navbar.Brand href="/" className="d-flex align-items-center">
            <span className='h-8 w-8 rounded-full bg-amber-400 mr-2'> <img src={logo} alt="img" /></span>
            <span>Chessmate</span>
          </Navbar.Brand>
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <NavDropdown className="text-white" title="Themes" id="collapsible-nav-dropdown">
                <NavDropdown.Item onClick={() => onThemeSelect("#769656")}>
                  Default
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => onThemeSelect("red")}>
                  Red{" "}
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => onThemeSelect("purple")}>
                  Purple
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => onThemeSelect("pink")}>
                  pink
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Modes" id="collapsible-nav-dropdown">
                <NavDropdown.Item
                  onClick={() => {
                    toast("Winner have to buy dinner! 🤼"), setMode("analyze")
                  }}
                >
                  Two Players
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    toast("Lets do this 🤖"), setMode("random")
                  }}
                >
                  Computer
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <div className="flex gap-3 items-center justify-between user-profile">
                {!isUserLoggedOut &&
                  <Avatar className="cursor-pointer object-contain border-solid border-2 " onClick={() => navigate("/profile")}>
                    <AvatarImage className="object-fill" src={user?.loggedInUser?.avatar} />
                  </Avatar>}
                {!isUserLoggedOut &&
                  <div className="logout-btn">
                    <button onClick={handleLogout}>
                      <span>Logout</span>
                    </button>
                  </div>}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar
