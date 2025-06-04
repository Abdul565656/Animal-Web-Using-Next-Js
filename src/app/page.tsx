// src/app/page.tsx
import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/Hero';
import CatCharacterCard from '@/components/Category'; 
import StatsSection from '@/components/StatsSection';
import PopularDogsDisplay from '@/components/PopularDog';
import TestimonialSection from '@/components/Testimonial';
import ProductCardUI from '@/components/ProductUi';
import Footer from '@/components/Footer';

const Page = async () => {

  return (
    <div>
      <Navbar />
      <HeroSection />
      <CatCharacterCard />
      <StatsSection />
      <PopularDogsDisplay />
      <TestimonialSection />
      <ProductCardUI />
      <Footer />
    </div>
  );
};

export default Page;