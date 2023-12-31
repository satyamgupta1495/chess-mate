import { Nav, Navbar, NavDropdown } from "react-bootstrap"
import useControl from "./hooks/useControl"
import { toast } from "react-hot-toast"
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// import { FaUserFriends, FaRobot } from "react-icons/fa"
// import Form from 'react-bootstrap/Form';

function NavBar({ setGame, setMode, setCurrTheme }: any) {
  const { onThemeSelect } = useControl({ setGame, setMode, setCurrTheme })

  // return (
  //   <div className="nav-container">
  //     <Navbar
  //       collapseOnSelect
  //       className="shadow-none"
  //     >
  //       <Navbar.Brand href="#">Chessmate</Navbar.Brand>
  //       <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  //       <Navbar.Collapse id="responsive-navbar-nav">
  //         <Nav className="nav-drop-down nav-drop-opt">
  //           <NavDropdown title="Themes" id="collapsible-nav-dropdown">
  //             <NavDropdown.Item className="text-light bg-dark" onClick={() => onThemeSelect("#769656")}>
  //               Default
  //             </NavDropdown.Item>
  //             <NavDropdown.Item className="text-dark bg-dark" onClick={() => onThemeSelect("red")}>
  //               Red{" "}
  //             </NavDropdown.Item>
  //             <NavDropdown.Item className="text-dark bg-dark" onClick={() => onThemeSelect("purple")}>
  //               Purple
  //             </NavDropdown.Item>
  //             <NavDropdown.Item className="text-dark bg-dark" onClick={() => onThemeSelect("pink")}>
  //               pink
  //             </NavDropdown.Item>
  //           </NavDropdown>
  //           <NavDropdown title="Modes" id="collapsible-nav-dropdown">
  //             <NavDropdown.Item>
  //               <p
  //                 className={"bg-dark text-light p-2 fs-6"}
  //                 value="Two Players"
  //                 onClick={() => {
  //                   toast("Winner have to buy dinner! 🤼"), setMode("analyze")
  //                 }}
  //               >
  //                 <span className="menu-icons">
  //                   <FaUserFriends />
  //                 </span>
  //                 Two Players
  //               </p>
  //             </NavDropdown.Item>
  //             <NavDropdown.Item>
  //               <p
  //                 className={"bg-dark text-light p-2 fs-6"}
  //                 value="Computer"
  //                 onClick={() => {
  //                   toast("Lets do this 🤖"), setMode("random")
  //                 }}
  //               >
  //                 <span className="menu-icons">
  //                   <FaRobot />
  //                 </span>
  //                 Computer
  //               </p>
  //             </NavDropdown.Item>
  //           </NavDropdown>
  //         </Nav>
  //         <Nav className="d-flex">
  //           <button className="button-50">Create/Join room</button>
  //         </Nav>
  //       </Navbar.Collapse>
  //     </Navbar>
  //   </div>
  // )

  return (
    <div className="nav-container">
      <Navbar expand="lg" data-bs-theme="dark">
        <Container fluid>
          <Navbar.Brand className="text-white" href="#">Chessmate</Navbar.Brand>
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
              <Button className="mx-2 mt-1">New room</Button>
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
