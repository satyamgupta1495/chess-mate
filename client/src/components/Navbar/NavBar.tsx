import { Nav, Navbar, NavDropdown } from "react-bootstrap"
import useControl from "./hooks/useControl"
import { toast } from "react-hot-toast"
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
<<<<<<< HEAD
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
=======
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
>>>>>>> 944a3035426201f83fc83f9fd05c9b7a6cfd4069

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
            </Nav>
            <Nav className="d-flex">
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
                  {/* <span className="menu-icons">
                      <FaUserFriends />
                    </span> */}
                  Two Players
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    toast("Lets do this 🤖"), setMode("random")
                  }}
                >
                  {/* <span className="menu-icons">
                      <FaRobot />
                    </span> */}
                  Computer

                </NavDropdown.Item>
              </NavDropdown>
              <Button className="mx-2">Create/join room</Button>
<<<<<<< HEAD
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
=======
              {/* <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar> */}
>>>>>>> 944a3035426201f83fc83f9fd05c9b7a6cfd4069

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar
