import image from "../static/Cancer_Recovery_Top_Banner.jpg";

const Hero = () => {
  return (
    <section className="relative w-full h-screen flex items-center bg-white overflow-hidden">
      {/* Background image with gradient fade */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${image})`,
            maskImage: 'linear-gradient(to left, black 60%, transparent)',
            WebkitMaskImage: 'linear-gradient(to left, black 60%, transparent)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 flex flex-col-reverse lg:flex-row items-center h-full">
        {/* Left Text */}
        <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            Healing, Hope, and Health
          </h1>
          <p className="text-lg text-gray-600">
            Empowering patients and caregivers through comprehensive cancer recovery support.
          </p>
          <div className="flex justify-center lg:justify-start gap-4">
            <button className="px-6 py-3 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition">
              Get Started
            </button>
            <button className="px-6 py-3 bg-gray-200 text-gray-800 rounded shadow hover:bg-gray-300 transition">
              Learn More
            </button>
          </div>
        </div>

        {/* Empty right column to help align content nicely */}
        <div className="w-full lg:w-1/2 h-64 lg:h-auto" />
      </div>
    </section>
  );
};

export default Hero;