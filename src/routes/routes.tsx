import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home.tsx";
import GuguDan from "../pages/GuguDan.tsx";
import WordChain from "../pages/WordChain.tsx";
import Baseball from "../pages/Baseball.tsx";
import Tab from "../pages/tab.tsx";
import Rsp from "../pages/Rsp.tsx";
import Lotto from "../pages/Lotto.tsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/gugudan" element={<GuguDan />}></Route>
      <Route path="/wordchain" element={<WordChain />}></Route>
      <Route path="/baseball" element={<Baseball />}></Route>
      <Route path="/tab" element={<Tab />}></Route>
      <Route path="/rsp" element={<Rsp />}></Route>
      <Route path="/lotto" element={<Lotto />}></Route>
    </Routes>
  );
};

export default AppRoutes;
