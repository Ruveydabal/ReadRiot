import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Books from "./pages/Books.jsx";
import Friends from "./pages/Friends.jsx";
import Login from "./pages/Login.jsx";
import AddBoek from "./pages/AddBoek.jsx";
import ProfileDetails from "./pages/ProfileDetails.jsx";
import SearchPage from "./pages/SearchPage.jsx";

const App = () => {
    return (
        <Routes>
            {/* alle Routes die worden gebruikt in de applicatie */}
            <Route path={"/"} element={<Home />} />
            <Route path={"/addbook"} element={<AddBoek />} />
            <Route path={"/books"} element={<Books />} />
            <Route path={"/friends"} element={<Friends />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/profile"} element={<ProfileDetails />} />
            <Route path={"/search"} element={<SearchPage />} />
        </Routes>
    );
};

export default App;