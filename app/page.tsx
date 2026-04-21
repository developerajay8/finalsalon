import Image from "next/image";
import BarberLandingPage from "./components/barberlandingpage";
import AboutServices from "./components/aboutsection";
import GallerySection from "./components/gallerysection";

export default function Home() {
  return (
    <div>
      <BarberLandingPage/>
      <AboutServices/>
      <GallerySection/>
    </div>
  );
}
