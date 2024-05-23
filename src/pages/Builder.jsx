import { useState } from "react";
import { HeaderNav } from "../components/HeaderNav";
import { SnippetBuilder } from "../components/SnippetBuilder";
import { Footer } from "../components/Footer";

export const Builder = () => {
  const [selection, setSelection] = useState(0);
  const [page, setPage] = useState(0);

  return (
    <div className="flex h-full w-full flex-col justify-center align-middle">
      <div className="h-fit w-full">
        <HeaderNav />
      </div>
      <div className="box-border flex h-full w-full flex-col">
        <SnippetBuilder />
      </div>
      <Footer />
    </div>
  );
};
