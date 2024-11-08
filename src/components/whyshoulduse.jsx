import React from "react";

function WhyListenPodcast() {
  const benefits = [
    {
      title: "Ad-Free Experience",
      description: "Enjoy uninterrupted podcasts with no ads.",
      imgSrc: "/img/addblock.webp"
    },
    {
      title: "Centralized Platform",
      description: "Access all your favorite podcasts in one place.",
      imgSrc: "/img/centralized.jpg"
    },
    {
      title: "High-Quality Content",
      description: "Listen to curated podcasts with top audio quality.",
      imgSrc: "/img/high.webp"
    },
    {
      title: "Exclusive Content",
      description: "Get access to exclusive podcasts available only here.",
      imgSrc: "/img/exclusive.webp"
    }
  ];

  return (
    <div className="relative text-white py-12 px-6">
      <h2 className="text-4xl font-bold text-center mb-4">
        Why Listen to Podcasts on Our Platform?
      </h2>
      <p className="text-center mb-10 max-w-xl mx-auto">
        Discover the ultimate platform for podcast listeners, designed to enhance your experience and keep you engaged.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
        {benefits.map((benefit, index) => (
          <div key={index} className="bg-white text-black rounded-lg shadow-lg p-2 text-center relative">
            <img src={benefit.imgSrc} alt={benefit.title} className="w-[98%] h-[60%] bg-cover rounded-lg mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 z-50">{benefit.title}</h3>
            <p className="z-50">{benefit.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WhyListenPodcast;
