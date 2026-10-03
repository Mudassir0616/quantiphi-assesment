import { Close } from "@mui/icons-material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import {
  applications_menu,
  company_menu,
  partners_menu,
  resources_menu,
  sustainability_menu,
} from "./navMenu";

// One collapsible group in the drawer; mirrors a desktop dropdown.
const MobileSubMenu = ({
  id,
  label,
  items,
  openSubMenu,
  toggleSubMenu,
  closeMenu,
}) => (
  <li className="sub-menu" onClick={() => toggleSubMenu(id)}>
    <div className="menu-item">
      <p>{label}</p>
      <div className="icon-container">
        {openSubMenu[id] ? <Close /> : <AddIcon />}
      </div>
    </div>

    {openSubMenu[id] && (
      <ul>
        {items.map((item) => (
          <Link href={item.href} key={item.id} onClick={closeMenu}>
            <li className="sub-menu">
              {/* icon slot — empty until the icon assets are dropped in */}
              {item.icon ? (
                <img src={item.icon} alt="" />
              ) : (
                <span className="icon-placeholder" />
              )}
              <div className="sub-menu-text">
                <p>{item.title}</p>
                {item.description ? <span>{item.description}</span> : null}
              </div>
            </li>
          </Link>
        ))}
      </ul>
    )}
  </li>
);

const MobileNavbar = ({ check, openSubMenu, toggleSubMenu, closeMenu }) => {
  return (
    <div className={check ? "active-mobile-menu mobile-menu" : "mobile-menu"}>
      <ul>
        <Link href="/" onClick={closeMenu}>
          <li>Home</li>
        </Link>

        <MobileSubMenu
          id="applications"
          label="Applications"
          items={applications_menu}
          openSubMenu={openSubMenu}
          toggleSubMenu={toggleSubMenu}
          closeMenu={closeMenu}
        />

        <MobileSubMenu
          id="partners"
          label="Partners"
          items={partners_menu}
          openSubMenu={openSubMenu}
          toggleSubMenu={toggleSubMenu}
          closeMenu={closeMenu}
        />

        <MobileSubMenu
          id="resources"
          label="Resources"
          items={resources_menu}
          openSubMenu={openSubMenu}
          toggleSubMenu={toggleSubMenu}
          closeMenu={closeMenu}
        />

        <MobileSubMenu
          id="sustainability"
          label="Sustainability"
          items={sustainability_menu}
          openSubMenu={openSubMenu}
          toggleSubMenu={toggleSubMenu}
          closeMenu={closeMenu}
        />

        <MobileSubMenu
          id="company"
          label="Company"
          items={company_menu}
          openSubMenu={openSubMenu}
          toggleSubMenu={toggleSubMenu}
          closeMenu={closeMenu}
        />

        <Link href="/careers" onClick={closeMenu}>
          <li>Careers</li>
        </Link>

        <li className="mobile-cta">
          <Link href="/contact" className="cta-btn" onClick={closeMenu}>
            Contact Us
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MobileNavbar;
