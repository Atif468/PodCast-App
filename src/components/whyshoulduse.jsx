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
    <div className="relative text-neutral-200 py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            Why Listen to Podcasts on Our Platform?
          </h2>
          <p className="text-xl md:text-3xl text-neutral-400 max-w-3xl mx-auto">
            Discover the ultimate platform for podcast listeners, designed to enhance your experience and keep you engaged.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="group bg-neutral-900 hover:bg-neutral-800 transition-all duration-300 rounded-xl overflow-hidden shadow-xl"
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={benefit.imgSrc} 
                  alt={benefit.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-xl font-semibold">{benefit.title}</h3>
                <p className="text-neutral-400">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WhyListenPodcast;