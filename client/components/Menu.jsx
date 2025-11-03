import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import Base from './Base';

export default class Menu extends Base {
  render() {
    return (
      <Navbar fixed="top" bg="dark" expand="lg" className={'roboto' }>
        <Navbar.Brand href="/">
          <b className={'istok white'}>Broken Jazz</b>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Link to="/" className={'cyan'}>
            <i className="fab fa-itunes-note" /> Tracks
          </Link>
          <Link to="/intro" className={'cyan'}>
            <i className="fas fa-book-open" /> Intro
          </Link>
          <Link to="/credits" className={'cyan'}>
            <i className="fas fa-copyright" /> Credits
          </Link>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
