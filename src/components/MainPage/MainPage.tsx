import { Outlet } from "react-router-dom"
import { Header } from "../Header/Header"
import './MainPage.scss';

export const MainPage = () => {
    return (
        <main className="mainPage">
            <Header/>

            <Outlet/>
        </main>
    )
}