import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Home from "./pages/landing/Home.jsx";
import ProtectedRoutes from "./components/ProtectedRoutes.jsx";
import About from "./pages/landing/About.jsx";
import LandingLayout from "./landing_layout.jsx";
import SignIn from "./pages/landing/Signin.jsx";
import CompleteProfile from "./pages/app/CompleteProfile.jsx";

import Equipment from "./pages/app/Equipment.jsx";
import Dashboard from "./pages/app/dashboard.jsx";
import Profile from "./pages/app/Profile.jsx";
import AppLayout from "./AppLayout.jsx";
import EquipmentDetails from "./pages/app/EquipmentDetails.jsx";
import AddListing from "./pages/app/AddListing.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* 🌍 Public routes */}
      <Route path="/" element={<LandingLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
      </Route>

      <Route path="/signin" element={<SignIn />} />

      {/* 🔐 Protected Routes */}
      <Route element={<ProtectedRoutes />}>
        <Route element={<AppLayout />}>
          <Route path="/equipments" element={<Equipment />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/completeprofile" element={<CompleteProfile />} />
          <Route path="/equipment/:id" element={<EquipmentDetails />} />
          <Route path="/add-listing" element={<AddListing />} />
        </Route>
      </Route>
    </>,
  ),
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
