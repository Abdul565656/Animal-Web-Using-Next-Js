import Image from "next/image";
import { FaUser, FaShoppingCart, FaPaw } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import { ArrowRightIcon } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="w-full h-screen flex">
      <div className="w-1/2 bg-foco-light-blue relative overflow-hidden">

        <div className="absolute top-4 left-4 flex items-center space-x-2 text-2xl font-bold text-foco-yellow z-20">
          <FaPaw /> 
          <span>FocoPet</span>
        </div>

        <div className="absolute bottom-[250px] w-full flex justify-center items-end gap-[-2rem] z-10">
          <div className="relative w-[120px] h-[200px] sm:w-[140px] sm:h-[240px] md:w-[160px] md:h-[280px] border-4 border-foco-yellow rounded-lg bg-white drop-shadow-lg z-10">
            <Image
              src="/images/cat hero 1.png"
              alt="Cat"
              fill
              className="object-contain"
              priority
            />
          </div>

          <div className="relative w-[120px] h-[200px] sm:w-[140px] sm:h-[240px] md:w-[160px] md:h-[280px] border-4 border-foco-yellow rounded-lg bg-white drop-shadow-lg z-20">
            <Image
              src="/images/parrot hero 1.png"
              alt="Parrot"
              fill
              className="object-contain"
            />
          </div>

          {/* Dog */}
          <div className="relative w-[140px] h-[220px] sm:w-[160px] sm:h-[260px] md:w-[180px] md:h-[300px] border-4 border-foco-yellow rounded-lg bg-white drop-shadow-2xl z-30">
            <Image
              src="/images/dog hero 2.png"
              alt="Dog"
              fill
              className="object-contain"
            />
          </div>

          {/* Crow */}
          <div className="relative w-[120px] h-[200px] sm:w-[140px] sm:h-[240px] md:w-[160px] md:h-[280px] border-4 border-foco-yellow rounded-lg bg-white drop-shadow-lg z-20">
            <Image
              src="/images/crow hero 1.png"
              alt="Crow"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="absolute bottom-0 w-full bg-foco-pink flex justify-around items-center px-8 py-6">
          {[0, 1, 2].map((_, i) => (
            <div key={i} className="flex flex-col items-center space-y-2">
              <div className="relative w-[100px] h-[100px]">
                <Image
                  src="/images/dog hero 1.png"
                  alt="Foco Dog Food"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-white text-sm font-medium">Foco Dog Food</p>
              <p className="text-white text-xs">$32.99</p>
              <div className="mt-1 bg-white rounded-full p-2 drop-shadow-lg">
                <FaShoppingCart className="text-foco-dark text-base" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-1/2 bg-foco-amber flex flex-col justify-center px-16 relative">
        <div className="absolute top-4 right-4 flex items-center space-x-4 text-foco-dark text-xl z-20">
          <FaUser />
          <FaShoppingCart />
          <HiMenu />
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foco-dark leading-tight max-w-2xl">
          Quality pet food{' '}
          <span className="hero-text-outlined font-dotted">ensures</span> pet well-being
        </h1>

        <p className="mt-4 text-base sm:text-lg text-foco-dark/90 max-w-lg">
          Welcome to Focopet, your ultimate online pet store! At Super Tails, 
          we’re more than just an online pet food shop — we’re your partners in 
          pet parenting.
        </p>

        <button className="mt-6 inline-flex items-center bg-foco-dark text-white text-lg font-medium rounded-full px-6 py-3 max-w-max hover:opacity-90 transition">
          <span>Get Started</span>
          <span className="ml-3 bg-white text-foco-dark rounded-full p-2 flex items-center justify-center drop-shadow">
            <ArrowRightIcon className="w-4 h-4" />
          </span>
        </button>
      </div>
    </section>
  );
}
