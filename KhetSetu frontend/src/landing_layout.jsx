import { Outlet } from "react-router-dom";
import LandingFooter from "./components/static/LandingFooter";
import LandingNavbar from "./components/static/LandingNavbar";
//layout used only for static pages
export default function LandingLayout() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <LandingNavbar />
      <div className="grow">
        <Outlet />
      </div>
      <LandingFooter />
    </div>
  );
}
