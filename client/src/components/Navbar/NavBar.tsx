import { Nav, Navbar, NavDropdown } from "react-bootstrap"
import useControl from "./hooks/useControl"
import { toast } from "react-hot-toast"
import Container from 'react-bootstrap/Container';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

function NavBar({ setGame, setMode, setCurrTheme }: any) {
  const { onThemeSelect } = useControl({ setGame, setMode, setCurrTheme })

  return (
    <div className="nav-container">
      <Navbar expand="lg" data-bs-theme="dark">
        <Container fluid>
          <Navbar.Brand className="text-white" href="/">Chessmate</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
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
              <Avatar className="mx-2 mt-1">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar
