import Aboutus from "../components/Aboutus";
import Welcome from "../components/Welcome";
import Footer from "../components/Footer";
import Whypodcast from "../components/whypodcast";
import WhyListenPodcast from "../components/whyshoulduse";
import { CardSpotlight } from "../components/ui/card-spotlight";
function LandingPage() {
  return (
    <>
      <div className="">
        <CardSpotlight className="min-h-screen">
          <Welcome />
          <Whypodcast />
          <WhyListenPodcast />
          <Aboutus />
          <Footer />
        </CardSpotlight>
      </div>
    </>
  );
}

export default LandingPage;
