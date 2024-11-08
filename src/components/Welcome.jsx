import Slider from "./swiper.jsx";

function Welcome() {
  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-around min-h-screen px-4 py-8">
        <div className="text-left text-white max-w-lg z-10">
          <i className="text-3xl md:text-4xl z-50 ">Welcome to</i>
          <i className="text-6xl md:text-8xl font-bold block z-50 ">
            <span className="underline">PodCast.</span>
            <span className="opacity-35 z-60">in</span>
          </i>
          <i className="text-sm md:text-lg block mt-4">
            Discover powerful podcasts and stories that resonate with your
            passions.
          </i>
          <i className="z-50 text-sm md:text-lg mt-2">
            {" "}
            Join us in exploring a world of voices and insights.
          </i>
        </div>

        
        <div className="h-64 md:h-96 w-full md:w-96 bg-black mt-8 md:mt-0">
          <Slider />
        </div>
      </div>
    </>
  );
}

export default Welcome;
