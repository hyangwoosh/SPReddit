import { ThemeProvider } from "@mui/material";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./assets/css/main.scss";

import { darkTheme } from "./assets/themes";

import { View } from "./views";

export const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <Routes>
          <Route path="/">
            <Route index element={<View.RootView />} />
            <Route path="login" element={<View.LoginView />} />
            <Route path="register" element={<View.RegisterView />} />

            <Route path="posts">
              <Route index element={<View.PostListView />} />
              <Route path=":id" element={<View.PostDetailView />} />
              <Route path=":id/edit" element={<View.PostEditView />} />
              <Route path="create" element={<View.PostCreateView />} />
              <Route path="top" element={<View.PostTopListView />} />
              <Route path="hot" element={<View.PostHotListView />} />
            </Route>

            <Route path="/users/">
              <Route index element={<View.UserListView />} />
              <Route path=":id" element={<View.UserDetailView />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};
