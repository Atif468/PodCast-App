function Aboutus() {
  return (
    <>
      <div className="text-white m-auto min-h-screen flex flex-col justify-center items-center p-6">
        <h1 className="text-center text-3xl md:text-5xl font-bold hover:scale-110 duration-300 mb-8 z-10">
          About Us
        </h1>
        <div className="max-w-2xl lg:max-w-4xl z-10">
          <ul className="list-disc pl-6 md:pl-8 space-y-4 md:space-y-6 text-lg md:text-xl leading-relaxed">
            <li>
              <strong>Engaging Stories:</strong> Discover powerful podcasts
              covering a wide range of topics from creators worldwide.
            </li>
            <li>
              <strong>Diverse Content:</strong> Explore podcasts on tech, arts,
              wellness, and more, from unique hosts.
            </li>
            <li>
              <strong>User-Friendly:</strong> Enjoy a seamless, easy-to-use
              platform for both listeners and creators.
            </li>
            <li>
              <strong>Creator Support:</strong> Empowering podcasters with tools
              to grow, engage, and monetize.
            </li>
            <li>
              <strong>On-the-Go:</strong> Listen anytime, anywhere with our
              mobile-friendly app.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Aboutus;
