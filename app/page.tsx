import Image from "next/image";
import BarberLandingPage from "./components/barberlandingpage";
import AboutServices from "./components/aboutsection";
import GallerySection from "./components/gallerysection";
import MenuSection from "./components/menusections";
import StatsTeamReviews from "./components/statsteamreview";
import ContactSection from "./components/contactsection";
import FooterSection from "./components/footersection";
export default function Home() {
  return (
    <div>
      <BarberLandingPage/>
      <AboutServices/>
      <GallerySection/>
      <MenuSection/>
      <StatsTeamReviews/>
      <ContactSection/>
      <FooterSection/>
    </div>
  );
}
