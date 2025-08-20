import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";
import "./MainPage.scss";
import { Footer } from "../Footer/Footer";

export const MainPage = () => {
  return (
    <main className="mainPage">
      <Header />

      <Outlet />

      <Footer />
    </main>
  );
};
