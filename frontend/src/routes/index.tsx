import React from "react";
import { Route, Routes } from "react-router-dom";

// COMPONENTS LAYOUTS
import { AuthLayout } from "../layouts/AuthLayout";
import { DefaultLayout } from "../layouts/DefaultLayout";

// COMPONENTS PAGES
import { Home } from "../pages/Home";
import { SignIn } from "../pages/SignIn";
import { Dashboard } from "../pages/Dashboard";
import { UserList } from "../pages/UserList";
import { CreateUser } from "../pages/CreateUser";

export const Router: React.FC = () => {
  return (
    <Routes>
      {/* UNAUTHENTICATED ROUTES */}
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      <Route path="/">
        <Route path="/login" element={<SignIn />} />
      </Route>

      {/* AUTHENTICATED ROUTES */}
      <Route element={<AuthLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/users">
          <Route path="/users" element={<UserList />} />
          <Route path="/users/create-user" element={<CreateUser />} />
        </Route>
      </Route>
    </Routes>
  );
};
