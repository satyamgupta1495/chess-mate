import { Container, Button, Nav, Navbar, NavDropdown } from "react-bootstrap"
import useControl from "./hooks/useControl"
import { FaUserFriends, FaRobot } from "react-icons/fa"
import { toast } from "react-hot-toast"

function NavBar({ setGame, setMode, setCurrTheme }: any) {
  const { onThemeSelect } = useControl({ setGame, setMode, setCurrTheme })

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="sm"
        className="shadow-none nav-bar-container px-4"
      >
        <Container fluid className="nav-container">
          <Navbar.Brand href="#">Chessmate</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav ">
            <Nav className="me-auto nav-drop-down nav-drop-opt">
              <NavDropdown title="Themes" id="collapsible-nav-dropdown">
                <NavDropdown.Item className="text-light bg-dark" onClick={() => onThemeSelect("#769656")}>
                  Default
                </NavDropdown.Item>
                <NavDropdown.Item className="text-dark bg-dark" onClick={() => onThemeSelect("red")}>
                  Red{" "}
                </NavDropdown.Item>
                <NavDropdown.Item className="text-dark bg-dark" onClick={() => onThemeSelect("purple")}>
                  Purple
                </NavDropdown.Item>
                <NavDropdown.Item className="text-dark bg-dark" onClick={() => onThemeSelect("pink")}>
                  pink
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Modes" id="collapsible-nav-dropdown">
                <NavDropdown.Item>
                  <p
                  className={"bg-dark text-light p-2 fs-6"}
                    value="Two Players"
                    onClick={() => {
                      toast("Winner have to buy dinner! 🤼"), setMode("analyze")
                    }}
                  >
                    <span className="menu-icons">
                      <FaUserFriends />
                    </span>
                    Two Players
                  </p>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <p
                    className={"bg-dark text-light p-2 fs-6"}
                    value="Computer"
                    onClick={() => {
                      toast("Lets do this 🤖"), setMode("random")
                    }}
                  >
                    <span className="menu-icons">
                      <FaRobot />
                    </span>
                    Computer
                  </p>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <button className="button-50">Create/Join room</button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default NavBar
