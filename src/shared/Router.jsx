import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Detailed from "../pages/Detailed";
import Layout from "./Layout";
import SpendingProvider from "../context/spendingListContext";
import MonthProvider from "../context/selectedMonthContext";
import Create from "../pages/Create";
import SignIn from "../pages/SignIn";
import Join from "../pages/Join";

const Router = () => {
  return (
    <SpendingProvider>
      <MonthProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="create" element={<Create />} />
              <Route path="detailed/:listId" element={<Detailed />} />
              <Route path="signIn" element={<SignIn />} />
              <Route path="join" element={<Join />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </MonthProvider>
    </SpendingProvider>
  );
};

export default Router;