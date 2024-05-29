import React from "react";
import { useState, useEffect } from "react";
import "./HeaderNav.css";
import { useLocalStorage } from "@uidotdev/usehooks";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { newUser } from "../../backend/newUser";

export const HeaderNav = (props) => {
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

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  const myLogin = () => {
    login();
    setLoggedIn(true);
    console.log("logged in");
  };
  const logOut = () => {
    googleLogout();
    setProfile(null);
    setUser(null);
    setLoggedIn(false);
  };

  useEffect(() => {
    const getProfile = () => {
      if (user && user.access_token) {
        axios
          .get(
            `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
            {
              headers: {
                Authorization: `Bearer ${user.access_token}`,
                Accept: "application/json",
              },
            },
          )
          .then((res) => {
            setProfile(res.data);
          })
          .catch((err) => console.log(err));
        console.log(
          "set profile data" + profile ? profile : (
            " but no profile data to set"
          ),
        );
      }
    };

    //   console.log(profile)
    if (!profile) {
      console.log("getting profile data");
      getProfile();
    }
  }, [user]);

  useEffect(() => {
    async function checkCreate() {
      await newUser(profile);
    }
    if (loggedIn) {
      if (profile) {
        checkCreate();
        console.log(profile);
        console.log(typeof profile.id);
      }
    }
  }, [loggedIn]);

  const profileIcon = loggedIn ? "user.svg" : "login.svg";
  const profileFunction = loggedIn ? logOut : myLogin;
  // console.log(profile)
  return (
    <div className="header-nav">
      <a
        className="title-anchor"
        href="/"
      >
        <h1 className="title">SNIPPETS</h1>
      </a>
      <div className="profile-button">
        <img
          className="userIcon"
          src={profileIcon}
          onClick={profileFunction}
        ></img>
      </div>
    </div>
  );
};
