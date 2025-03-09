function Aboutus() {
  const features = [
    {
      title: "Engaging Stories",
      description:
        "Discover powerful podcasts covering a wide range of topics from creators worldwide.",
      icon: "🎙️",
    },
    {
      title: "Diverse Content",
      description:
        "Explore podcasts on tech, arts, wellness, and more, from unique hosts.",
      icon: "🌟",
    },
    {
      title: "User-Friendly",
      description:
        "Enjoy a seamless, easy-to-use platform for both listeners and creators.",
      icon: "💻",
    },
    {
      title: "Creator Support",
      description:
        "Empowering podcasters with tools to grow, engage, and monetize.",
      icon: "🚀",
    },
    {
      title: "On-the-Go",
      description: "Listen anytime, anywhere with our mobile-friendly app.",
      icon: "📱",
    },
  ];

  return (
    <div className="relative text-neutral-200 py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-6 hover:scale-105 transition-transform duration-300">
            About Us
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Your gateway to the world's most captivating podcasts and stories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 border border-neutral-700 bg-neutral-900 hover:bg-neutral-800 hover:scale-105 transition-all duration-300 rounded-xl overflow-hidden shadow-xl"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-purple-300">
                {feature.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-20 text-center">
          <button className=" relative px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/25">
            Join Our Community
          </button>
        </div>
      </div>
    </div>
  );
}

export default Aboutus;
