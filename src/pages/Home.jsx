import SideList from "../components/SideList";
import VideoPlayer from "../components/VideoPlayer";
const Home = () => {
  return (
    <>
      <section className="h-[100%]  fixed left-0   overflow-auto touch-auto">
        <SideList />
      </section>
      <section className="h-[100%] w-3/4 fixed right-0 overflow-auto touch-auto">
        <VideoPlayer />
      </section>
    </>
  );
};

export default Home;
