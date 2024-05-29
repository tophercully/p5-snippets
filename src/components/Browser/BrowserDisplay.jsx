import React, { useEffect, useState } from "react";
import "../Display.css";
import "highlight.js/styles/github-dark.css";
import { CodeBlock } from "../CodeBlock";
import { addFavorite } from "../../../backend/addFavorite";
import { deleteFavorite } from "../../../backend/deleteFavorite";
import { useLocalStorage } from "@uidotdev/usehooks";
import { loadFavorites } from "../../../backend/loadFavorites";

export const BrowserDisplay = (props) => {
  const {
    selection,
    favorites,
    setFavorites,
    snippets,
    setSnippets,
  } = props;
  const [isFavorite, setIsFavorite] = useState(
    selection ?
      favorites.some((item) => item.snippetID === selection.snippetID)
    : false,
  );
  const [profile, setProfile] = useLocalStorage(
    "profile",
    localStorage.getItem("profile") ?
      localStorage.getItem("profile")
    : null,
  );
  console.log("favorite?", isFavorite);
  console.log("selection", selection);

  let language = "javascript";

  function copyCode(e) {
    navigator.clipboard.writeText(selection.code);
    console.log("code copied to clipboard");
  }

  function handleFavorite() {
    console.log("toggling favorite");
    if (isFavorite) {
      setIsFavorite(false);
    } else {
      setIsFavorite(true);
    }
  }
  //update database and update the global state favorites array
  useEffect(() => {
    console.log("updating favorite in database");
    async function handler() {
      if (selection && selection.snippetID) {
        if (isFavorite) {
          await addFavorite(profile.id, selection.snippetID);
        } else {
          await deleteFavorite(profile.id, selection.snippetID);
        }
      }
    }

    handler();
    let newFavorites = [];
    let newSnippets = snippets;
    const indexOfSelection = newSnippets.findIndex(
      (a) => a.snippetID == selection.snippetID,
    );

    console.log("newFavorites");
    console.log(newFavorites);
    if (isFavorite) {
      //add favorite in database and working list
      newFavorites = favorites;
      newFavorites.push(selection);
      //replace working list
      newSnippets[indexOfSelection].isFavorite = true;
      newSnippets[indexOfSelection].favoriteCount =
        Number(newSnippets[indexOfSelection].favoriteCount) + 1;
    } else {
      //remove favorite in database and working list
      favorites.map((a) => {
        if (a != selection) {
          newFavorites.push(a);
        }
      });
      //replace working list
      if (newSnippets[indexOfSelection]) {
        newSnippets[indexOfSelection].isFavorite = false;
        newSnippets[indexOfSelection].favoriteCount =
          Number(newSnippets[indexOfSelection].favoriteCount) - 1;
      }
    }
    //set working lists
    // setFavorites(newFavorites);
    setSnippets(newSnippets);
  }, [isFavorite]);

  const FavoriteButton = () => {
    if (isFavorite) {
      return (
        <button
          className="favorite-button bg-2/3 flex aspect-square h-full justify-center bg-[url('/public/heart-full.svg')] bg-center bg-no-repeat align-middle"
          onClick={handleFavorite}
        />
      );
    } else {
      return (
        <button
          className="favorite-button bg-2/3 flex aspect-square h-full justify-center bg-[url('/public/heart-empty.svg')] bg-center bg-no-repeat align-middle"
          onClick={handleFavorite}
        />
      );
    }
  };

  if (selection) {
    return (
      <div
        className="filter-[blur(1px)] active:cursor-enjoy flex h-full w-full flex-grow flex-col justify-center overflow-auto border-[1px] border-black bg-text p-0
      align-top duration-200 ease-in-out hover:cursor-clickhere hover:bg-[#2e2e2e] active:scale-[98%] active:transform"
      >
        <div className="display-info">
          <h1 className="display-title">{selection.name}</h1>
          <p className="display-author">{selection.author}</p>
        </div>
        <CodeBlock
          language={language}
          code={selection.code}
          onClick={copyCode}
        />
        <div className="display-buttons">
          <button className="edit-button"></button>
          <FavoriteButton />
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex h-full w-full flex-grow flex-col justify-center overflow-auto border-[1px] border-black bg-text p-0 align-top">
        <p
          className="error-display"
          style={{
            color: "#f5f5f5",
            justifySelf: "center",
          }}
        >
          error
        </p>
      </div>
    );
  }
};
