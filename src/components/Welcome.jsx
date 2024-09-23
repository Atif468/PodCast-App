function Welcome() {
  return (
    <div className="bg-black flex flex-row  items-center justify-around min-h-screen">
      <div className="text-left text-white p-auto">
        <i className="text-3xl">Welcome to</i>
        <i className="text-8xl font-bold block">PodCast.in</i>
        <i className="block">
          Discover powerful podcasts and stories that resonate with your
          passions.
        </i>
        <i> Join us in exploring a world of voices and insights.</i>
      </div>
      <div className="">
        <div className="h-72 w-72 bg-white rounded-3xl overflow-hidden bg-cover">
          <img src="../../public/cartoon-character-generated-by-Fotor-ai-art-creator.webp"/>
        </div>
      </div>
    </div>
  );
}

export default Welcome;