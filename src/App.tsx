import React from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { Navigate, Route, Routes } from "react-router-dom";
import { Map } from "./pages/Map";
import { Posts } from "./pages/Posts";
import { TopNavBar } from "./organisms/TopNavBar";
import { BottomNavBar } from "./organisms/BottomNavBar";
import { Post } from "./pages/Post";

function App() {
  return (
    <>
      <TopNavBar />
      <Routes>
        <Route path="/" element={<Map />} />
        <Route path="/posts">
          <Route index element={<Posts />} />
          <Route path=":id" element={<Post />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <BottomNavBar />
    </>
  );
}

export default App;
