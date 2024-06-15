import { FC, Fragment, ReactNode } from "react";
import Footer from "./footer";
import { Header } from "./header";

export const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return <Fragment>
    <Header />
    <main className="flex flex-col flex-grow">
      {children}
    </main>
    <Footer />
  </Fragment>
} 