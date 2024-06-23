import { FC, Fragment, ReactNode } from "react";
import Footer from "./footer";
import { Header } from "./header";

export const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return <Fragment>
    <Header />
    <main className="mx-auto flex w-full max-w-[320px] flex-grow flex-col">
      {children}
    </main>
    <Footer />
  </Fragment>
} 