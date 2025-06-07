import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home.tsx";
import GuguDan from "../pages/GuguDan.tsx"

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/gugudan" element={<GuguDan />}></Route>
        </Routes>
    )
}

export default AppRoutes;