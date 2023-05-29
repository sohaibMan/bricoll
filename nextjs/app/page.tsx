import { NavBar } from "../components/home/NavBar";
import { HeroSection } from "../components/home/HeroSection";
import { ExpertiseSection } from "../components/home/ExpertiseSection";
import { WhySection } from "../components/home/WhySection";
import { GuidesSection } from "../components/home/GuidesSection";
import { CommentsSection } from "../components/home/CommentsSection";
import { FooterSection } from "../components/home/Footer";
// this page is static and will be rendered at build time
const Home = () => {
  return (
    <>
      <NavBar />
      <HeroSection />
      <ExpertiseSection />
      <WhySection />
      <GuidesSection />
      <CommentsSection />
      <FooterSection />
    </>
  );
};
export default Home;
