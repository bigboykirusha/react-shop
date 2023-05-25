import "./scss/app.scss";
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path={"/"} element={<MainLayout />}>
        <Route path={""} element={<Home />} />
        <Route path={"/cart"} element={<Cart />} />
        <Route path={"*"} element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
