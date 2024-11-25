import { Container, Nav, Navbar } from 'react-bootstrap';

export function NavBar (){
  return (<><Navbar bg="dark" variant="dark" expand="lg">
    <Container>
      <Navbar.Brand href="/">Rats</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/">Kezdőlap</Nav.Link>
          <Nav.Link href="/lista">Lista</Nav.Link>
          <Nav.Link href="/felvetel">Felvétel</Nav.Link>
          <Nav.Link href="/torles">Törlés</Nav.Link>
          <Nav.Link href="/kereses">Keresés és Rendezés</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar></>);}