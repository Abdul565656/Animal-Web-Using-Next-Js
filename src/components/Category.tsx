import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { fetchCatBreeds } from '../api/catsApi';
import type { CatBreed } from '../../types';

const BrowseCatBreedsGrid = async () => {
  let catBreeds: CatBreed[] = [];
  try {
    catBreeds = await fetchCatBreeds(1, 6);
  } catch (error) {
    console.error("Error fetching cat breeds for BrowseCatBreedsGrid:", error);
  }

  const sectionTitle = "Discover Cat Breeds";
  const sectionSubtitle = "Explore a variety of fascinating cat breeds. Learn more about their characteristics and find your perfect feline companion.";
  const seeAllLink = "/cats";
  const seeAllText = "See All Breeds";

  return (
    <section className="py-12 md:py-16 bg-white sm:bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 md:mb-10">
          <div className="text-center sm:text-left mb-6 sm:mb-0">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-2">
              {sectionTitle}
            </h2>
            <p className="text-sm text-slate-600 max-w-xl">
              {sectionSubtitle}
            </p>
          </div>
          <Link
            href={seeAllLink}
            className="shrink-0 bg-orange-500 text-white text-sm font-semibold py-2.5 px-5 rounded-3xl hover:bg-orange-600 transition-colors duration-200 flex items-center gap-2"
          >
            {seeAllText}
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
        {catBreeds && catBreeds.length > 0 && (
          <div className="mx-auto max-w-4xl">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-5">
              {catBreeds.map((cat) => {
                const imageUrl = cat.image || '/images/placeholders/cat_placeholder.png';
                return (
                  <Link
                    key={cat.id}
                    href={`/cats/${cat.id}`}
                    className="group block bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out p-3 text-center aspect-[3/3.5] sm:aspect-[3/3.8] flex flex-col"
                  >
                    <div className="mb-1.5 sm:mb-2 flex-shrink-0 pt-1">
                      <h3 className="text-[13px] sm:text-sm font-semibold text-slate-700 group-hover:text-orange-600 truncate transition-colors">
                        {cat.name || 'Unknown Breed'}
                      </h3>
                    </div>
                    <div className="relative flex-grow w-full">
                      <Image
                        src={imageUrl}
                        alt={cat.name || 'Cat Breed'}
                        fill
                        style={{ objectFit: 'contain' }}
                        className="group-hover:scale-105 transition-transform duration-200"
                        sizes="(max-width: 640px) 45vw, (max-width: 768px) 30vw, 20vw"
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}      
        </div>
    </section>
  );
};

export default BrowseCatBreedsGrid;