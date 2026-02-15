import { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import Footer from "./Footer";
import Contact_us from "./Contact_Us";

const slides = [
  {
    id: 1,
    name: "JEERA",
    subtitle: "KASHMIRI – JEERA SODA",
    info:"The Classic spice",
    bg: "linear-gradient(180deg, #B87333 0%, #8B5A2B 100%)",
    image: "/hero_images/main_Jeera.png",

  },
  {
    id: 2,
    name: "ORANGE",
    subtitle: "KASHMIRI – ORANGE",
    info:"Citrus Burst",
    bg: "linear-gradient(180deg, #FF7B35 0%, #E55A00 100%",
    image: "hero_images/new_orange.png",

  },
  {
    id: 3,
    name: "LEMON",
    subtitle: "KASHMIRI – LEMON",
    info:"Zesty Freshness",
    bg: "linear-gradient(180deg, #4CAF50 0%, #2E7D32 100%)",
    image: "hero_images/IMG_SEGMENT_20260211_130302.png",
  },
  {
    id: 4,
    name: "MANGO",
    subtitle: "KASHMIRI – MANGO",
    info:"Tropical Paradise",
    bg: "linear-gradient(180deg, #FFB347 0%, #FF8C00 100%",
    image: "hero_images/final_mango.png",
  },
  {
    id: 5,
    name: "CLEAR LEMON",
    subtitle: "KASHMIRI – CLEAR_LEMON",
    info:"",
    image: "hero_images/final clear_lemon.png",
  },
];
const heroSlides = slides.slice(0, 4);

function Hero() {
  const nextSlide = () => {
    setPrevIndex(activeIndex);
    setActiveIndex((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setPrevIndex(activeIndex);
    setActiveIndex((prev) =>
      prev === 0 ? heroSlides.length - 1 : prev - 1
    );
  };
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);

  const direction =
    activeIndex === prevIndex
      ? 0
      : (activeIndex - prevIndex + heroSlides.length) % heroSlides.length === 1
        ? 1
        : -1;

  const changeSlide = (index) => {
    setPrevIndex(activeIndex);
    setActiveIndex(index);
  };

  useEffect(() => {
   window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  
  return (
    <>
      <Navbar />
      <section id="Home"
        className="min-h-screen drop-shadow pt-30 h-screen" style={{background: heroSlides[activeIndex].bg}}
      >
        <div className="relative min-h-[80vh] rounded-3xl text-white overflow-hidden flex flex-col items-center justify-center transition-colors duration-700 select-none ">

          {/* WATERMARK */}
          <h1
            className={`absolute inset-0 flex items-center justify-center text-[85px] animate-fade-in
                     md:text-[240px] font-extrabold tracking-widest transition-all duration-3000 ease-out
                     text-white/10 select-none`}>
            {heroSlides[activeIndex].name}
          </h1>

          {/* DOTS */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10 items-center">
            <button className=" mb-4" onClick={prevSlide}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"

              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
                />
              </svg>
            </button>
            <div className="flex flex-col gap-3">
              {heroSlides.map((_, i) => (
                <span
                  key={i}
                  onClick={() => changeSlide(i)}
                  className={`w-1.5 h-1.5 rounded-full cursor-pointer transition-all
                ${activeIndex === i ? "scale-125 bg-white" : "bg-white/60"}`}
                />
              ))}
            </div>
            <button className=" mt-4" onClick={nextSlide}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                />
              </svg>
            </button>
          </div>

          {/* SLIDE CONTAINER */}
          <div className="relative w-full h-[70vh] flex items-center justify-center animate-fade-in-up">
            {heroSlides.map((slide, i) => (
              <img
                key={slide.id}
                src={slide.image}
                alt={slide.name}
                className={`absolute h-160 object-contain
              transition-all duration-700 z-2 animate-float
              ${i === activeIndex
                    ? "opacity-100 translate-x-0 scale-100"
                    : i === prevIndex
                      ? `opacity-0 ${direction === 1 ? "-translate-y-40" : "translate-y-40"} scale-60`
                      : "opacity-0"
                  }`}
              />
            ))}
          </div>
        <div className="absolute text-3xl md:text-4xl left-10 bottom-10 font-black tracking-wider">{heroSlides[activeIndex].name}</div>
        <div className="absolute text-2xl md:text-2xl left-10 bottom-0 font-semibold tracking-wider text-white/60">{heroSlides[activeIndex].info}</div>
        </div>
      </section>

      {/* Collection */}
      <section id="Collection"
        className="py-24 bg-linear-to-bl from-gray-900 to-black">
        <div className="main mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <span className="text-orange-400 text-sm font-bold uppercase tracking-widest">Our collection</span>
            <h2 className="text-4xl font-bold text-white mt-4">Discover Our Flavours</h2>
          </div>
          <div className="grid md::grid-cols-1 lg:grid-cols-5 gap-5">
            {slides.map((flavor, index) => (
              <div
                key={flavor.id}
                className="text-center rounded-3xl p-4 bg-white/10 backdrop-blur-[10px] border border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.08)] transition-all duration-300 ease-in
                           hover:-translate-y-2.5 hover:scale-[1.02]">
                <div className="h-48 flex item-center justify-center mb-6">
                  <img src={flavor.image} alt={flavor.name}
                    className="h-full w-auto object-contain transition-transform duration-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{flavor.name}</h3>
                <p className="text-white/60 text-sm">{flavor.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About us */}
      <section id="aboutus" className="py-45 bg-linear-to-bl from-gray-900 to-black relative overflow-hidden">
        {/* Decorates */}
        <div className="relative max-w-7xl mx-auto px-5 lg:px-12">
        <div className="absolute w-96 h-96 -top-15 -left-15 bg-orange-500/10 rounded-full blur-3xl"></div>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* left side */}
            <div className="">
              <span className="text-orange-400 text-sm uppercase font-bold tracking-widest">About us</span>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mt-4 mb-6">Refreshing Moments, <span className="text-orange-400">Memorable Taste</span></h2>
              <div className="text-white/70 text-lg pr-6 leading-relaxed">
                <p className="pt-4">
                  Kashmiri Beverages has been crafting refreshing experiences since our inception. We believe in the power of natural flavors and the joy they bring to every moment.
                </p>
                <p className="pt-6">Our commitment to quality ensures that every bottle delivers the perfect balance of taste, refreshment, and satisfaction.</p>
              </div>
            </div>
            {/* right side */}
            <div className=" relative flex justify-center items-center over">
              <div className="absolute right-0 w-130 h-130 bg-orange-500/50 rounded-full blur-3xl"></div>
              <div className=" relative inline-block">
                <div className="absolute -bottom-2 -right-2 w-full h-full border-20 border-amber-200 z-0 rounded-4xl"></div>
                <img src="hero_images/about_us.png" alt="" height={100} width={670} className="z-10 rounded-4xl drop-shadow-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Contact_us/>
      <Footer />
    </>
  );
}

export default Hero;
