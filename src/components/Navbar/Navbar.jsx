import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import MobileNavbar from "./MobileNavbar";
import Link from "next/link";
import {
  applications_menu,
  company_menu,
  partners_menu,
  resources_menu,
  sustainability_menu,
} from "./navMenu";

// One dropdown panel: icon slot + title + one-line standfirst per row.
const NavDropdown = ({ label, items, isOpen, onOpen, onClose, wide }) => (
  <div className="nav-item" onMouseEnter={onOpen} onMouseLeave={onClose}>
    <div className={`categories-dropdown ${isOpen ? "active" : ""}`}>
      {label}
      {isOpen ? <ExpandLess /> : <ExpandMore />}
    </div>

    {isOpen && (
      <ul className={`dropdown-menu ${wide ? "wide" : ""}`}>
        {items.map((item) => (
          <li key={item.id}>
            <Link href={item.href} className="dropdown-item" onClick={onClose}>
              <span className="dropdown-item-text">
                <span className="dropdown-item-title">{item.title}</span>
                <span className="dropdown-item-desc line-clamp-2">
                  {item.description}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    )}
  </div>
);

const Navbar = () => {
  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isFloating, setIsFloating] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const [check, setCheck] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState({});
  const [openMenu, setOpenMenu] = useState(null);

  const handleClick = () => setCheck((prev) => !prev);

  const toggleSubMenu = (menu) => {
    setOpenSubMenu((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  useEffect(() => {
    if (currentScrollY === 0) {
      // Topmost position: show navbar without floating-nav
      setIsNavVisible(true);
      setIsFloating(false);
    } else if (currentScrollY > lastScrollY && !check) {
      // Scrolling down: hide navbar
      setIsNavVisible(false);
      setIsFloating(true);
    } else if (currentScrollY < lastScrollY && !check) {
      // Scrolling up: show navbar
      setIsNavVisible(true);
      setIsFloating(true);
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  return (
    <nav className={`nav-container ${check ? "active" : ""}`}>
      <header
        className={`nav-header container ${isFloating ? "floating-nav" : ""} ${
          isNavVisible ? "" : "is-hidden"
        }`}
      >
        <nav className="nav-inner">
          {/* <!-- Logo and Product Button --> */}
          <div className="logo-container">
            <img src="/images/logo.svg" alt="logo" className="logo" />
          </div>

          {/* <!-- Navigation Links --> */}
          <div className="nav-links-container">
            <div className="nav-links">
              <NavDropdown
                label="Applications"
                items={applications_menu}
                isOpen={openMenu === "applications"}
                onOpen={() => setOpenMenu("applications")}
                onClose={() => setOpenMenu(null)}
              />

              <NavDropdown
                label="Partners"
                items={partners_menu}
                isOpen={openMenu === "partners"}
                onOpen={() => setOpenMenu("partners")}
                onClose={() => setOpenMenu(null)}
              />

              <NavDropdown
                label="Resources"
                items={resources_menu}
                isOpen={openMenu === "resources"}
                onOpen={() => setOpenMenu("resources")}
                onClose={() => setOpenMenu(null)}
              />

              <NavDropdown
                label="Sustainability"
                items={sustainability_menu}
                isOpen={openMenu === "sustainability"}
                onOpen={() => setOpenMenu("sustainability")}
                onClose={() => setOpenMenu(null)}
              />

              <NavDropdown
                label="Company"
                items={company_menu}
                isOpen={openMenu === "company"}
                onOpen={() => setOpenMenu("company")}
                onClose={() => setOpenMenu(null)}
              />

              <Link href="/#" className="nav-link">
                Careers
              </Link>
            </div>
          </div>

          <div className="nav-btns">
            <Link href={"/contact"} className="cta-btn">
              Contact Us
            </Link>
          </div>

          <div
            className={`${check ? "active-nav" : ""} hamburger`}
            onClick={handleClick}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </nav>
      </header>

      <MobileNavbar
        check={check}
        toggleSubMenu={toggleSubMenu}
        openSubMenu={openSubMenu}
        closeMenu={() => setCheck(false)}
      />
    </nav>
  );
};

export default Navbar;
