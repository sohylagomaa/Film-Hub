import React, { useContext } from "react";
import { Navbar, Nav, Container, Badge, Button } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { Film } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { LanguageContext } from "../../context/LanguageContext";

const MyNavbar = () => {
  const favoriteCount = useSelector((state) => state.favorites.items.length);
  const { lang, toggleLanguage } = useContext(LanguageContext);
  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      sticky="top"
      className="py-3 shadow"
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to="/movies"
          className="fw-bold text-orange d-flex align-items-center"
        >
          <Film className="me-2" />
          {lang === 'en' ? 'FILM HUB' : 'فيلـم هـب'}
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link
              as={NavLink}
              to="/movies"
              className={({ isActive }) =>
                isActive ? "text-orange fw-bold" : ""
              }
            >
              {lang === 'en' ? 'Movies' : 'الأفلام'}
            </Nav.Link>
            

            <Nav.Link
              as={NavLink}
              to="/favorites"
              className={({ isActive }) =>
                isActive ? "text-orange fw-bold" : ""
              }
              
            >
              
              {lang === 'en' ? 'Favorites' : 'المفضلة'} 
              <Badge pill bg="danger" className="ms-1">
                {favoriteCount}
              </Badge>
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/login"
              className={({ isActive }) =>
                isActive ? "text-orange fw-bold" : ""
              }
            >
              {lang === 'en' ? 'Login' : 'تسجيل دخول'} 
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/register"
              className={({ isActive }) =>
                isActive ? "text-orange fw-bold" : ""
              }
            >
              
              {lang === 'en' ? 'Register' : 'انشاء حساب'} 
            </Nav.Link>
            <Button 
              variant="outline-warning" 
              size="sm" 
              className="ms-3 fw-bold" 
              onClick={toggleLanguage}
            >
              {lang === 'en' ? 'Ar' : 'En'}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
