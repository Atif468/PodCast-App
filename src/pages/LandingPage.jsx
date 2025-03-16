import Aboutus from "../components/Aboutus";
import Welcome from "../components/Welcome";
import Footer from "../components/Footer";
import Whypodcast from "../components/whypodcast";
import WhyListenPodcast from "../components/whyshoulduse";
import { useEffect } from 'react';
import fluidCursor from '../components/ui/use-FluidCursor';

function LandingPage() {
  useEffect(() => {
    fluidCursor();
  }, []);

  return (
    <div className="relative min-h-screen bg-black">
      {/* Canvas positioned absolute and set to the background */}
      <canvas id="fluid" className="fixed top-0 left-0 w-screen h-screen pointer-events-none z-10" />
      
      {/* Main content container */}
      <div className="relative z-20">
        <section className="min-h-screen pointer-events-auto">
          <Welcome />
        </section>
        
        <section className="min-h-screen pointer-events-auto">
          <Whypodcast />
        </section>
        
        <section className="min-h-screen pointer-events-auto">
          <WhyListenPodcast />
        </section>
        
        <section className="min-h-screen pointer-events-auto">
          <Aboutus />
        </section>
        
        <Footer />
      </div>
    </div>
  );
}

export default LandingPage;