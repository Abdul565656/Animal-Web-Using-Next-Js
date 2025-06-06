import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { fetchCatBreeds } from '@/api/catsApi';
import type { CatBreed } from '../../types';

const BrowseCatBreeds = async () => {
  let catBreeds: CatBreed[] = [];
  try {
    catBreeds = await fetchCatBreeds(1, 6);
  } catch (error) {
    console.error("Error fetching cat breeds:", error);
  }

  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header and Button */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
          <div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
              Pet Product Category
            </h2>
            <p className="text-base text-gray-500 max-w-lg">
              Welcome To FocoPET. Your Ultimate Online Pet Store in India! At FocoPet, We’re More Than Just A Pet Shop Online – We’re Your Partners In Pet Parenting.
            </p>
          </div>
          <Link
            href="/cats"
            className="mt-6 sm:mt-0 inline-flex items-center px-6 py-3 bg-orange-500 text-white font-semibold rounded-full shadow hover:bg-orange-600 transition-colors text-base"
          >
            See All Category
            <ArrowRightIcon className="ml-2 w-5 h-5" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-6">
          {catBreeds && catBreeds.length > 0 && catBreeds.map((cat) => (
            <Link
              key={cat.id}
              href={`/cats/${cat.id}`}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 p-6 flex flex-col items-center text-center"
            >
              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {cat.name || 'Unknown Breed'}
                </h3>
                <div className="relative w-32 h-32 mx-auto">
                  <Image
                    src={cat.image || '/images/placeholders/cat_placeholder.png'}
                    alt={cat.name || 'Cat Breed'}
                    fill
                    style={{ objectFit: 'contain' }}
                    className="rounded-full"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrowseCatBreeds;
