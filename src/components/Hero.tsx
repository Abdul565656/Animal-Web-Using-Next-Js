"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArrowRightIcon } from "lucide-react";

const HeroSectionFocoPetMatched = () => {
  const petImagePaths = {
    dog: "/images/dog hero 1.png",  
    cat: "/images/cat hero 1.png",   
    parrot: "/images/parrot hero 1.png", 
    darkBird: "/images/crow hero 1.png"
  };

  return (
    <section className="relative flex flex-col md:flex-row min-h-[calc(100vh-var(--navbar-height,80px))] overflow-hidden">

   
      <div className="w-full md:w-1/2 bg-foco-blue flex-grow relative 
                      min-h-[55vh] sm:min-h-[60vh] md:min-h-full 
                      flex justify-center items-center md:items-end md:justify-start">

        <div className="relative w-[90%] h-[70%] sm:w-[80%] sm:h-[75%] md:w-[90%] md:h-[80%] lg:w-[85%] lg:h-[85%]
                        max-w-md sm:max-w-lg md:max-w-md lg:max-w-lg xl:max-w-xl
                        md:absolute md:bottom-[5%] md:left-[2%] lg:left-[5%] xl:left-[8%]">

          <div
            className="absolute top-[-5%] sm:top-[-2%] left-[-5%] sm:left-0 
                       w-[45%] sm:w-[40%] md:w-[38%] lg:w-[35%] aspect-[10/12] z-30
                       drop-shadow-lg transition-transform duration-300 ease-out hover:scale-105">
            <Image src={petImagePaths.parrot} alt="Colorful Parrot" fill style={{ objectFit: 'contain' }} />
          </div>

          <div
            className="absolute bottom-[0%] left-[0%] sm:left-[2%] 
                       w-[60%] sm:w-[55%] md:w-[50%] lg:w-[48%] aspect-[10/8] z-20
                       drop-shadow-xl transition-transform duration-300 ease-out hover:scale-105" >
            <Image src={petImagePaths.cat} alt="Playful Cat" fill style={{ objectFit: 'contain' }} />
          </div>

         
          <div
            className="absolute bottom-[0%] left-[35%] sm:left-[40%] 
                       w-[70%] sm:w-[65%] md:w-[60%] lg:w-[58%] aspect-[10/10] z-10
                       drop-shadow-2xl transition-transform duration-300 ease-out hover:scale-105" >
            <Image src={petImagePaths.dog} alt="Loyal Companion Dog" fill style={{ objectFit: 'contain' }} priority />
          </div>


          <div
            className="absolute bottom-[20%] sm:bottom-[25%] right-[-5%] sm:right-0 
                       w-[35%] sm:w-[30%] md:w-[28%] lg:w-[25%] aspect-[10/10] z-20
                       drop-shadow-lg transition-transform duration-300 ease-out hover:scale-105"
          >
            <Image src={petImagePaths.darkBird} alt="Elegant Dark Bird" fill style={{ objectFit: 'contain' }} />
          </div>
        </div>
      </div>

      {/* Right Side: Yellow Background with Text & CTA (remains the same) */}
      <div className="w-full md:w-1/2 bg-foco-yellow flex flex-col justify-center items-start p-6 py-10 sm:p-10 md:p-12 lg:p-16">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight mb-2 text-foco-dark">
          Quality <span className="hero-text-solid">pet</span> <br />
          <span className="hero-text-solid">food</span> <span className="hero-text-outlined">ensures</span> <br />
          <span className="hero-text-outlined">pet</span> <span className="hero-text-outlined">well-being</span>
        </h1>
        <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg max-w-md leading-relaxed text-slate-700/90">
          Discover premium nutrition and essentials for your cherished companions. Focopet: Nurturing health, inspiring happiness.
        </p>
        <Button
          size="lg"
          className="mt-6 sm:mt-8 bg-indigo-700 hover:bg-indigo-800 text-white 
                     rounded-full group shadow-lg hover:shadow-xl 
                     px-0 py-0 h-auto min-h-[48px] sm:min-h-[56px]
                     transition-all duration-300 ease-in-out 
                     transform hover:-translate-y-1 active:translate-y-0 active:shadow-md
                     focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-foco-yellow"
        >
          <div className="flex items-center justify-between w-full pl-5 pr-2 sm:pl-6 sm:pr-2.5 py-2">
            <span className="text-sm sm:text-base font-medium">Explore Products</span>
            <span className="bg-foco-yellow text-white rounded-full p-1.5 sm:p-2 ml-3 sm:ml-4 
                             transition-transform duration-300 ease-in-out transform group-hover:scale-110">
              <ArrowRightIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            </span>
          </div>
        </Button>
      </div>
    </section>
  );
};

export default HeroSectionFocoPetMatched;