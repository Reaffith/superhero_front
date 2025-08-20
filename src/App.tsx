import { Route, HashRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { MainPage } from "./components/MainPage/MainPage";
import { HeroesList } from "./components/HeroesList/HeroesList";
import { CreateUpdatePage } from "./components/CreateUpdatePage/CreateUpdatePage";
import { HeroPage } from "./components/HeroPage/HeroPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route index element={<HeroesList />}></Route>
          <Route path="create" element={<CreateUpdatePage />}></Route>
          <Route path="update/:id" element={<CreateUpdatePage />}></Route>
          <Route path="hero/:id" element={<HeroPage/>}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
