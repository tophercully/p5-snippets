import React from "react";
import "./Footer.css";

export const Footer = () => {
  return (
    <div className="footer">
      <p className="copyright">© 2024 Chris McCully</p>
      <div className="socials">
        <a href="https://github.com/tophercully/p5-snippets">
          <img
            className="social-icon"
            src="/github.png"
          ></img>
        </a>
        <a href="https://twitter.com/spinkdinky">
          <img
            className="social-icon"
            src="/twitter.png"
          ></img>
        </a>
        <a href="https://ko-fi.com/chrismccully">
          <img
            className="social-icon"
            src="/kofi.png"
          ></img>
        </a>
      </div>
    </div>
  );
};
