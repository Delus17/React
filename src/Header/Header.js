import './header.css';
import logo from '../static/logo.jpg';
import { NavLink } from "react-router";
import { useState } from "react";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const links = <>
    <NavLink to="/about">О нас</NavLink>
    <NavLink to="/services">Услуги</NavLink>
    <NavLink to="/calculate">Калькулятор</NavLink>
    <NavLink to="/contacts">Контакты</NavLink>
    <NavLink to="/gallery">Галлерея</NavLink>
    <NavLink to="/blogs">Блог</NavLink>
  </>;

  return (
    <header className="header">
      <NavLink to="/"><img className='header-logo' src={logo} aria-label='Главная' /></NavLink>
      { !isOpen && <div className='header-mobile-control' onClick={() => setIsOpen(true)}>Меню</div> }
      
      <div className="header-links">
        { links }
      </div>
      { isOpen && <div className="header-links-mobile">
        <div className='header-mobile-control' onClick={() => setIsOpen(false)}>Закрыть</div>
        { links }
      </div> }
    </header>
    );
}

export default Header;