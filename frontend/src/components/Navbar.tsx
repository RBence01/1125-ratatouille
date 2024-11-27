import { Container, Nav, Navbar } from 'react-bootstrap';

export function NavBar (){
  return (<><Navbar bg="dark" variant="dark" expand="lg">
    <Container>
      <Navbar.Brand href="/">Rats</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/list">List</Nav.Link>
          <Nav.Link href="/new">Add new</Nav.Link>
          <Nav.Link href="/delete">Delete data</Nav.Link>
          <Nav.Link href="/search">Search</Nav.Link>
          <Nav.Link href="/order">Order</Nav.Link>
          <Nav.Link href="/pages">Pages</Nav.Link>
          <Nav.Link href="/switch">Switching</Nav.Link>
          <Nav.Link href="/edit">Editing</Nav.Link>
          <Nav.Link href="/plusminus">PlusMinus</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar></>);}