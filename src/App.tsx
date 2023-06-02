import "./scss/app.scss";
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import React, { Suspense } from "react";
const Cart = React.lazy(() => import("./pages/Cart"));
function App() {
  return (
    <Routes>
      <Route path={"/"} element={<MainLayout />}>
        <Route path={"/react-shop"} element={<Home />} />
        <Route
          path={"/cart"}
          element={
            <Suspense fallback={<div>Идет загрузка корзины...</div>}>
              <Cart />
            </Suspense>
          }
        />
        <Route path={"*"} element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
