import Image from "next/image";
import BarberLandingPage from "./components/barberlandingpage";
import AboutServices from "./components/aboutsection";

export default function Home() {
  return (
    <div>
      <BarberLandingPage/>
      <AboutServices/>
    </div>
  );
}
