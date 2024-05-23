import React, { useEffect, useState } from "react";
// import "../Selections.css";
import { dynamicSort } from "../../Utility/Tools";

export const BrowserSelections = (props) => {
  const snippets = props.snippets;
  const { selection, setSelection, page } = props;
  console.log("page is ", page);
  const [scrollPos, setScrollPos] = useState(0);
  const [filter, setFilter] = useState("");

  let array = snippets;
  console.log("array", array);

  if (array && array.name) {
    array.sort(dynamicSort("name"));
  }

  function handleClick(e, index) {
    console.log("button is ", e.target);
    e.target.style.backgroundColor = "var(--text)";
    e.target.style.color = "var(--bg)";
    setScrollPos(document.getElementById("selections").scrollTop);
    setSelection(array[index]);
  }

  function debounce(callback, delay) {
    let timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(() => {
        callback();
      }, delay);
    };
  }

  // useEffect(() => {
  //     //highlight selection
  //     var buttons = document.getElementsByClassName('selection-button')
  //     for(let i = 0; i < buttons.length; i++) {
  //         if(i == selection) {

  //             buttons[i].style.backgroundColor = 'var(--text)'
  //             buttons[i].style.color = 'var(--bg)'
  //         }
  //     }
  // }, [selection])

  useEffect(() => {
    //return to last scrollbar position
    document.getElementById("selections").addEventListener(
      "scrollend",
      (event) => {
        debounce(() => {
          console.log("scrolling stopped");
          setScrollPos(
            document.getElementById("selections").scrollTop,
          );
        }, 100);
      },
      { once: true },
    );
  }, [selection]);
  useEffect(() => {
    document.getElementById("selections").scrollTop = scrollPos;
  }, [selection]);

  function handleChange(e) {
    setFilter(e.target.value);
  }

  function AllNames() {
    if (array) {
      return (
        <div
          className="selections"
          id="selections"
        >
          {array.map((a, index) => {
            if (
              a.name.toLowerCase().includes(filter.toLowerCase()) ||
              a.tags.includes(filter.toLowerCase())
            ) {
              return (
                <div
                  className="selection-button group flex w-full flex-col justify-between border-[1px] border-black px-1 py-2 align-top hover:bg-text hover:text-bgc active:bg-primary"
                  onClick={(e) => handleClick(e, index)}
                  key={index}
                >
                  <div className="flex h-full w-full flex-1 justify-end align-middle group-hover:invert">
                    <h4
                      className="m-0 w-2/3 flex-1 text-nowrap pr-[1vh] font-satoshi text-[1.5em] font-bold text-text"
                      key={index}
                    >
                      {a.name}
                    </h4>
                    <div className="flex h-full w-full justify-end align-middle">
                      <img
                        className="mr-1 flex h-4 flex-col justify-center self-center align-middle"
                        src="heart-empty.svg"
                      ></img>
                      <p
                        className="m-0 self-center font-satoshi text-sm font-normal text-text"
                        style={{
                          margin: "0",
                        }}
                      >
                        {a.favoriteCount}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end align-middle">
                    {/* <img className="selection-author-icon" src="author.svg"></img> */}
                    <p
                      className="flex justify-end align-middle"
                      style={{
                        margin: "0",
                      }}
                    >
                      {a.author}
                    </p>
                  </div>
                </div>
              );
            }
          })}
        </div>
      );
    } else {
      return (
        <div
          className="selections"
          id="selections"
        >
          <div className="selection-button">
            <h4 className="selection-name">Nothing here yet</h4>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="selection-box">
      <input
        type="text"
        className="searchbar"
        onChange={handleChange}
        placeholder={"search"}
      ></input>
      <AllNames />
    </div>
  );
};
