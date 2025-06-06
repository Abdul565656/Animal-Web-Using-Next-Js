import React from 'react';
import HeroSection from '@/components/layout/Hero';
import BrowseCatBreeds from '@/components/widgets/Category';
import StatsSection from '@/components/widgets/StatsSection';
import PopularDogsDisplay from '@/components/widgets/PopularDog';
import TestimonialsDisplay from '@/components/widgets/Testimonial';
import LatestItems from '@/components/widgets/ProductUi';

const Page = async () => {

  return (
    <div>
      <HeroSection />
      <BrowseCatBreeds />
      <StatsSection />
      <PopularDogsDisplay />
      <TestimonialsDisplay />
      <LatestItems />
    </div>
  );
};

export default Page;