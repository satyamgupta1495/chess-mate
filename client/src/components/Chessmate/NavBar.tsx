import { Nav, Navbar, NavDropdown } from "react-bootstrap"
import useControl from "./hooks/useControl"
import { toast } from "react-hot-toast"
import Container from 'react-bootstrap/Container';
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import useChessStore from "@/store/useChessStore";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "@/helper";

function NavBar({ setGame, setMode, setCurrTheme }: any) {
  const { onThemeSelect } = useControl({ setGame, setMode, setCurrTheme })
  const navigate = useNavigate()

  const { user, logout, isUserLoggedOut }: any = useChessStore((state) => state)

  const handleLogout = () => {
    const response: any = logoutUser()
    if (response?.data?.success) {
      toast.success("Logged out successfully!")
    } else {
      toast.error("Something went wrong!")
    }
    logout()
  }

  return (
    <div className="nav-container mx-20 my-3 show-top">
      <Navbar expand="lg" data-bs-theme="dark">
        <Container fluid>
          <Navbar.Brand className="text-white" href="/">Chessmate</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
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
                  <Avatar className="cursor-pointer border-solid border-2 border-amber-500" onClick={() => navigate("/profile")}>
                    <AvatarImage src={user?.loggedInUser?.avatar} />
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
    </div >
  );
}

export default NavBar
