import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Favorite from "./pages/Favorite.jsx";
import Friends from "./pages/Friends.jsx";
import Login from "./pages/Login.jsx";
import AddBoek from "./pages/AddBoek.jsx";

const App = () => {
    return (
        <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/addbook"} element={<AddBoek />} />
            <Route path={"/favorite"} element={<Favorite />} />
            <Route path={"/friends"} element={<Friends />} />
            <Route path={"/login"} element={<Login />} />
        </Routes>
    );
};

export default App;