import { useState } from "react";
import "./Home.css";
import { Selections } from "../components/Selections";
import { Display } from "../components/Display";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { HeaderNav } from "../components/HeaderNav";
import { snippets } from "../data/Snippets";

export const Home = () => {
  const [selection, setSelection] = useState(0);
  const [page, setPage] = useState(0);

  return (
    <>
      <div className="home-container">
        {/* <h1 className='title'>SNIPPETS FOR ART</h1> */}
        <HeaderNav />
        <Nav
          page={page}
          setPage={setPage}
          setSelection={setSelection}
        />
        <div className="main-body">
          <Selections
            selection={selection}
            setSelection={setSelection}
            page={page}
            snippets={snippets}
          />
          <br></br>
          <Display
            selection={selection}
            page={page}
          />
        </div>
        <Footer />
      </div>
    </>
  );
};
