import React, { useEffect, useState } from "react";
import { HeaderNav } from "../components/HeaderNav";
import { Footer } from "../components/Footer";
import { loadAllSnippets } from "../../backend/loadAllSnippets";
import { BrowserNav } from "../components/Browser/BrowserNav";
import { BrowserSelections } from "../components/Browser/BrowserSelections";
import { BrowserDisplay } from "../components/Browser/BrowserDisplay";
import { useLocalStorage } from "@uidotdev/usehooks";
import { loadFavorites } from "../../backend/loadFavorites";

export const Browser = () => {
  const [snippets, setSnippets] = useState([]);
  const [selection, setSelection] = useState(snippets[0]);
  const [page, setPage] = useState({
    name: "all",
    index: 0,
  });
  const [profile, setProfile] = useLocalStorage(
    "profile",
    localStorage.getItem("profile") ?
      localStorage.getItem("profile")
    : null,
  );
  const [favorites, setFavorites] = useLocalStorage(
    "favorites",
    localStorage.getItem("favorites") ?
      localStorage.getItem("favorites")
    : [],
    3,
  );

  //fetches all snippets from library
  useEffect(() => {
    async function getSnippets() {
      const response = await loadAllSnippets();
      if (page.index == 0 || page.name == "all") {
        setSnippets(response);
        setSelection(snippets[0]);
      } else if (page.name == "js") {
        var filteredArray = [];
        response.map((a) => {
          if (a.tags.includes("js") || a.tags.includes("vanilla")) {
            console.log(a);
            filteredArray.push(a);
          }
          setSnippets(filteredArray);
          setSelection(snippets[0]);
        });
      } else if (page.name == "p5") {
        filteredArray = [];
        response.map((a) => {
          if (a.tags.includes("p5")) {
            filteredArray.push(a);
          }
          setSnippets(filteredArray);
          setSelection(snippets[0]);
        });
      } else if (page.name == "glsl") {
        filteredArray = [];
        response.map((a) => {
          if (a.tags.includes("glsl")) {
            filteredArray.push(a);
          }
          setSnippets(filteredArray);
          setSelection(snippets[0]);
        });
      } else {
        setSnippets([]);
      }
    }
    getSnippets();
  }, [page]);

  console.log("favorites", favorites);
  useEffect(() => {
    setSelection(snippets[0]);
  }, [snippets]);

  //update favorites list when triggered or on page change
  useEffect(() => {
    async function updateFavorites() {
      console.log("updating favorites");

      const response = await loadFavorites(profile.id);
      console.log(response);
      setFavorites(response);
    }
    // if (page.name == "favorites") {
    updateFavorites();
    // }
  }, [page, favorites]);

  return (
    <div className="flex h-full w-full flex-col">
      <HeaderNav />
      <BrowserNav
        page={page}
        setPage={setPage}
        setSelection={setSelection}
      />
      <div className="flex h-full w-full flex-row">
        <BrowserSelections
          key={
            favorites && favorites.length > 0 ? favorites[0].name : 0
          }
          selection={selection}
          setSelection={setSelection}
          page={page}
          snippets={snippets}
          favorites={favorites}
          setFavorites={setFavorites}
        />
        <BrowserDisplay
          selection={selection}
          page={page}
          favorites={favorites}
          snippets={snippets}
          setSnippets={setSnippets}
          setFavorites={setFavorites}
        />
      </div>
      <Footer />
    </div>
  );
};
