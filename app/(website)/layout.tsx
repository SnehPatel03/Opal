import React from "react";
import LandingPageNavbar from "./_components/navbar";
import { Toaster } from "sonner";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <LandingPageNavbar />
      {children}
    </>
  );
};

export default Layout;