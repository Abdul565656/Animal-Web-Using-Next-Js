import Image from "next/image";
import { FaUser, FaShoppingCart, FaPaw } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import { ArrowRightIcon } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="w-full min-h-screen flex flex-col lg:flex-row">
      {/* Left Side */}
      <div className="w-full lg:w-1/2 bg-foco-light-blue relative overflow-hidden pb-28 lg:pb-0">
        {/* Logo */}
        <div className="absolute top-4 left-4 flex items-center space-x-2 text-xl sm:text-2xl font-bold text-foco-yellow z-20">
          <FaPaw />
          <span>FocoPet</span>
        </div>

        <div className="mt-24 sm:mt-36 px-4 overflow-x-auto scrollbar-hide">
          <div className="flex justify-start items-end gap-4 w-max mx-auto lg:justify-center">
            {[
              { src: "/images/cat hero 1.png", z: "z-10" },
              { src: "/images/parrot hero 1.png", z: "z-20" },
              { src: "/images/dog hero 2.png", z: "z-30", large: true },
              { src: "/images/crow hero 1.png", z: "z-20" },
            ].map((animal, i) => (
              <div
                key={i}
                className={`relative ${
                  animal.large
                    ? "w-[120px] h-[200px] sm:w-[140px] sm:h-[240px] md:w-[160px] md:h-[280px]"
                    : "w-[100px] h-[160px] sm:w-[120px] sm:h-[200px] md:w-[140px] md:h-[240px]"
                } border-4 border-foco-yellow rounded-lg bg-white drop-shadow-lg ${animal.z}`}
              >
                <Image src={animal.src} alt="Pet" fill className="object-contain" />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Product Cards */}
        <div className="absolute bottom-0 w-full bg-foco-pink flex justify-around items-center px-4 sm:px-8 py-4 sm:py-6 overflow-x-auto scrollbar-hide gap-4">
          {[0, 1, 2].map((_, i) => (
            <div key={i} className="flex flex-col items-center space-y-2 flex-shrink-0 w-[100px]">
              <div className="relative w-[60px] h-[60px] sm:w-[80px] sm:h-[80px]">
                <Image
                  src="/images/cat hero 1.png"
                  alt="Foco Dog Food"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-white text-xs sm:text-sm font-medium text-center">Foco Dog Food</p>
              <p className="text-white text-xs">$32.99</p>
              <div className="mt-1 bg-white rounded-full p-2 drop-shadow-lg">
                <FaShoppingCart className="text-foco-dark text-base" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 bg-foco-amber flex flex-col justify-center px-6 sm:px-10 py-12 relative">
        {/* Top Right Icons */}
        <div className="absolute top-4 right-4 flex items-center gap-3 text-foco-dark text-lg sm:text-xl z-20">
          <FaUser className="cursor-pointer" />
          <FaShoppingCart className="cursor-pointer" />
          <HiMenu className="cursor-pointer lg:hidden" />
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foco-dark leading-tight max-w-xl">
          Quality pet food{" "}
          <span className="hero-text-outlined font-dotted">ensures</span> pet well-being
        </h1>

        <p className="mt-4 text-sm sm:text-base text-foco-dark/90 max-w-md">
          Welcome to Focopet, your ultimate online pet store! At Super Tails,
          we’re more than just an online pet food shop — we’re your partners in
          pet parenting.
        </p>

        <button className="mt-6 inline-flex items-center bg-foco-dark text-white text-base sm:text-lg font-medium rounded-full px-5 py-2 sm:px-6 sm:py-3 max-w-max hover:opacity-90 transition">
          <span>Get Started</span>
          <span className="ml-3 bg-white text-foco-dark rounded-full p-2 flex items-center justify-center drop-shadow">
            <ArrowRightIcon className="w-4 h-4" />
          </span>
        </button>
      </div>
    </section>
  );
}
