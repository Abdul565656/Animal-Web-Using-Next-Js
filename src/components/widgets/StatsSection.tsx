import React from 'react';
import Image from 'next/image';

const StatsSection = () => {


  const sectionBgColor = 'bg-slate-800'; 
  const pillBgColor = 'bg-slate-700/60'; 
  const textColor = 'text-white';
  const pugImage = '/images/dog stats 1.avif';
  const catImage = '/images/cats stats1.jpg';
  const dogImage = '/images/dog sta.jpg';

  return (
    <section className={`${sectionBgColor} py-16 md:py-20`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 items-center justify-items-center gap-y-8 sm:gap-y-0 gap-x-4 md:gap-x-6 lg:gap-x-8 max-w-3xl lg:max-w-4xl mx-auto">

          <div className={`${pillBgColor} ${textColor} rounded-full px-6 py-7 text-center shadow-lg w-full max-w-[200px] sm:max-w-none h-[120px] flex flex-col justify-center`}>
            <div className="text-4xl font-bold">86+</div>
            <div className="text-sm mt-1">Award</div>
          </div>


          <div className={`${pillBgColor} rounded-full p-1 shadow-lg w-[120px] h-[120px] flex items-center justify-center transform sm:-translate-y-6`}>
            <div className="relative w-[104px] h-[104px] rounded-full overflow-hidden border-2 border-slate-500">
              <Image src={pugImage} alt="Pug in sweater" fill style={{ objectFit: 'cover' }} priority />
            </div>
          </div>


          <div className={`${pillBgColor} ${textColor} rounded-full px-6 py-7 text-center shadow-lg w-full max-w-[200px] sm:max-w-none h-[120px] flex flex-col justify-center`}>
            <div className="text-4xl font-bold">95k</div>
            <div className="text-sm mt-1">Customer</div>
          </div>


          <div className={`${pillBgColor} rounded-full p-1 shadow-lg w-[120px] h-[120px] flex items-center justify-center sm:order-1 transform sm:translate-y-6`}>
            <div className="relative w-[104px] h-[104px] rounded-full overflow-hidden border-2 border-slate-500">
              <Image src={catImage} alt="Orange cat" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>


          <div className={`${pillBgColor} ${textColor} rounded-full px-6 py-7 text-center shadow-lg w-full max-w-[200px] sm:max-w-none h-[120px] flex flex-col justify-center sm:order-2`}>
            <div className="text-4xl font-bold">92+</div>
            <div className="text-sm mt-1">Employee</div>
          </div>


          <div className={`${pillBgColor} rounded-full p-1 shadow-lg w-[120px] h-[120px] flex items-center justify-center sm:order-3 transform sm:translate-y-6`}>
            <div className="relative w-[104px] h-[104px] rounded-full overflow-hidden border-2 border-slate-500">
              <Image src={dogImage} alt="Brown dog" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;