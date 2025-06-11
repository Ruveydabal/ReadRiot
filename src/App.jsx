import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Books from "./pages/Books.jsx";
import Friends from "./pages/Friends.jsx";
import Login from "./pages/Login.jsx";

const App = () => {
    return (
        <Routes>
            <Route path={"/"} element={<Home />} />
            {/* <Route path={"/addbook"} element={<AddBoek />} /> */}
            <Route path={"/books"} element={<Books />} />
            <Route path={"/friends"} element={<Friends />} />
            <Route path={"/login"} element={<Login />} />
        </Routes>
    );
};

export default App;