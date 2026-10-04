import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="container">
        <div className="company-details">
          <div className="img-container">
            <img src="/images/logo.svg" alt="logo" />
          </div>
          <p className="description">
            We are a global technology company that builds innovative solutions
            to help businesses thrive in the digital age.
          </p>
        </div>

        <div className="quick-links">
          <div className="links">
            <p className="title">Company</p>
            <ul>
              <li>
                <Link href="/#">About Us</Link>
              </li>
              <li>
                <Link href="/#">Careers</Link>
              </li>
              <li>
                <Link href="/#">Contact</Link>
              </li>
            </ul>
          </div>

          <div className="links">
            <p className="title">Resources</p>
            <ul>
              <li>
                <Link href="/#">Blog</Link>
              </li>
              <li>
                <Link href="/#">Help Center</Link>
              </li>
              <li>
                <Link href="/#">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          <div className="links">
            <p className="title">Follow Us</p>
            <ul>
              <li>
                <Link href="/#">Facebook</Link>
              </li>
              <li>
                <Link href="/#">Twitter</Link>
              </li>
              <li>
                <Link href="/#">LinkedIn</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          Crafted By{" "}
          <a
            href="https://www.linkedin.com/in/mudassir-shaikh-7b6325243/"
            target="__blank"
          >
            Mudassir
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
