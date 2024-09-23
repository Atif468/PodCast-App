import Aboutus from "../components/Aboutus";
import Welcome from "../components/Welcome";
import Footer from "../components/Footer";
import { CardSpotlight } from "../components/ui/card-spotlight";
function LandingPage() {
  return (
    <>
    <div className="">
     <CardSpotlight className="min-h-screen">
      <Welcome />
      <Aboutus />
      <Footer />

    </CardSpotlight>
    </div>

    </>
  );
}

export default LandingPage;
