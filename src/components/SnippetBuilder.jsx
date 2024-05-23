import React, { useState } from "react";
import { newSnippet } from "../../backend/newSnippet";
import { useLocalStorage } from "@uidotdev/usehooks";
import Editor from "@monaco-editor/react";

export const SnippetBuilder = (props) => {
  const [user, setUser] = useLocalStorage(
    "user",
    localStorage.getItem("user") ?
      localStorage.getItem("user")
    : null,
  );
  const [profile, setProfile] = useLocalStorage(
    "profile",
    localStorage.getItem("profile") ?
      localStorage.getItem("profile")
    : null,
  );
  const [loggedIn, setLoggedIn] = useLocalStorage(
    "loggedIn",
    localStorage.getItem("loggedIn") ?
      localStorage.getItem("loggedIn")
    : false,
  );
  const [code, setCode] = useState();
  const [snippet, setSnippet] = useState({
    name: "",
    code: "",
    tags: "",
    author: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = value;
    setSnippet({
      ...snippet,
      [name]: newValue,
    });
  };
  function handleCodeChange(value, e) {
    setSnippet({
      ...snippet,
      code: value,
    });
  }

  function createSnippet() {
    console.log("working");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    newSnippet({
      ...snippet,
      author: profile.name,
      id: profile.id,
    });
  };

  return (
    <div className="flex h-full w-full flex-col">
      <form className="flex h-full w-full flex-col justify-between align-bottom">
        <p className="m-0 mt-[0.5em] font-bebasNeue text-[3em] font-medium leading-[0.6]">
          Name
        </p>
        <input
          className="color-bgc color-bgc mb-6 box-border h-[15%] w-full border-none bg-text pl-4 font-satoshi text-xl font-semibold text-bgc"
          placeholder="Name"
          name="name"
          onChange={handleChange}
        ></input>
        <p className="m-0 mt-[0.5em] font-bebasNeue text-[3em] font-medium leading-[0.6]">
          Code
        </p>
        <Editor
          height="100%"
          width="100%"
          options={{
            scrollBeyondLastLine: true,
            fontSize: "20px",
          }}
          theme="vs-dark"
          defaultLanguage="javascript"
          defaultValue="//<3"
          onChange={handleCodeChange}
        />
        <p className="m-0 mt-[0.5em] font-bebasNeue text-[3em] font-medium leading-[0.6]">
          Tags
        </p>
        <input
          className="color-bgc color=[var(--bg)] mb-6 box-border h-[15%] w-full border-none bg-[var(--text)] bg-text pl-4 font-satoshi text-lg font-semibold text-bgc"
          placeholder="Tags"
          name="tags"
          onChange={handleChange}
        ></input>
        <button
          className="ml-auto h-[10%] w-1/3 bg-[var(--secondary)]"
          onClick={handleSubmit}
        >
          Save
        </button>
      </form>
    </div>
  );
};
