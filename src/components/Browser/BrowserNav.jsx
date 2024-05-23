import React, { useEffect } from "react";
import "../Nav.css";

export const BrowserNav = (props) => {
  const { page, setPage, setSelection } = props;

  useEffect(() => {
    var pages = document.getElementsByClassName("nav-button");
    for (let i = 0; i < pages.length; i++) {
      if (i == page.index) {
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
        onClick={() => handleClick({ name: "all", index: 0 })}
        key="0"
      >
        All
      </button>
      <button
        className="nav-button"
        onClick={() => handleClick({ name: "js", index: 1 })}
        key="1"
      >
        Vanilla JS
      </button>
      <button
        className="nav-button"
        onClick={() => handleClick({ name: "p5", index: 2 })}
        key="2"
      >
        p5.js
      </button>
      <button
        className="nav-button"
        onClick={() => handleClick({ name: "glsl", index: 3 })}
        key="3"
      >
        GLSL
      </button>
    </div>
  );
};
