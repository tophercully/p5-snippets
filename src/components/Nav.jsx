import React, { useEffect } from "react";
import "./Nav.css";

export const Nav = (props) => {
  const { page, setPage, setSelection } = props;

  useEffect(() => {
    var pages = document.getElementsByClassName("nav-button");
    for (let i = 0; i < pages.length; i++) {
      if (i == page) {
        pages[i].style.backgroundColor = "var(--text)";
        pages[i].style.color = "var(--bg)";
        pages[i].style.flex = "1.2";
      } else {
        pages[i].style.backgroundColor = "var(--bg)";
        pages[i].style.color = "var(--text)";
        pages[i].style.flex = "1";
      }
    }
  }, [page]);

  function handleClick(index) {
    setPage(index);
    setSelection(0);
  }

  return (
    <div className="navBar">
      <button
        className="nav-button"
        onClick={() => handleClick(0)}
        key="0"
      >
        Vanilla JS
      </button>
      <button
        className="nav-button"
        onClick={() => handleClick(1)}
        key="1"
      >
        p5.js
      </button>
      <button
        className="nav-button"
        onClick={() => handleClick(2)}
        key="2"
      >
        GLSL
      </button>
      <button
        className="nav-button"
        onClick={() => handleClick(3)}
        key="3"
      >
        Color
      </button>
    </div>
  );
};
