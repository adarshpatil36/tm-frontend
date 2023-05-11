import React from "react";
import { Header } from "./partials/Header.comp";
import { Footer } from "./partials/Footer.comp";

export const DefaultLayout = ({ user, children }) => {
  return (
    <div className="default-layout">
      <header className="header mb-2">
        <Header user={user}/>
      </header>

      <main className="main">{children}</main>

      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
};
