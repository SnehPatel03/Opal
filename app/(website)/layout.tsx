import React from "react";
import LandingPageNavbar from "./_components/navbar";


type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>

      {children}
    </>
  );
};

export default Layout;