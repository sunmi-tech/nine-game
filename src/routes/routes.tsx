import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home.tsx";
import GuguDan from "../pages/GuguDan.tsx"
import WordChain from "../pages/WordChain.tsx"

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/gugudan" element={<GuguDan />}></Route>
            <Route path="/wordchain" element={<WordChain />}></Route>
        </Routes>
    )
}

export default AppRoutes;