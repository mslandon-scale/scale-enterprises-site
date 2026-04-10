import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import GoldSyndicate from "@/components/sections/GoldSyndicate";
import EnterpriseChallenge from "@/components/sections/EnterpriseChallenge";
import MasterclassPreview from "@/components/sections/MasterclassPreview";
import FlagshipCTA from "@/components/sections/FlagshipCTA";
import ProductSuite from "@/components/sections/ProductSuite";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <div className="section-divider" />
      <GoldSyndicate />
      <div className="section-divider" />
      <EnterpriseChallenge />
      <div className="section-divider" />
      <MasterclassPreview />
      <div className="section-divider" />
      <ProductSuite />
      <div className="section-divider" />
      <FlagshipCTA />
      <Footer />
    </>
  );
}
