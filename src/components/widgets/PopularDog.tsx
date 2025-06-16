"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon, ShoppingCartIcon, StarIcon } from '@heroicons/react/24/solid';
import { fetchAllDogsFromAPI } from '@/api/dogsApi';
import type { Dog } from '../../types';

const PopularDogsDisplay = () => {
  const [allFetchedDogs, setAllFetchedDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDogs = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const dogs = await fetchAllDogsFromAPI(1, 30);
        if (Array.isArray(dogs)) {
          setAllFetchedDogs(dogs.slice(0, 6));
        } else {
          setAllFetchedDogs([]);
          setError("Failed to load dog data in expected format.");
        }
      } catch (err) {
        setError("Could not load dog data.");
        setAllFetchedDogs([]);
      } finally {
        setIsLoading(false);
      }
    };
    loadDogs();
  }, []);

  if (isLoading && allFetchedDogs.length === 0) {
    return <section className="py-12 text-center text-slate-500">Loading popular dogs...</section>;
  }
  if (error) {
    return <section className="py-12 text-center text-red-500">{error}</section>;
  }

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 w-full px-4 sm:px-8 md:px-12 lg:px-24 mb-8 md:mb-10">
      <h2 className="text-2xl md:text-3xl font-bold text-slate-800 text-center sm:text-left">
         Our Most Popular <br /> Dogs
      </h2>
     <Link
    href="/dogs"
    className="bg-orange-500 text-white text-sm font-semibold py-2.5 px-5 rounded-lg hover:bg-orange-600 transition-colors duration-200 flex items-center gap-2 flex-shrink-0">
    See All Products
    <ArrowRightIcon className="w-4 h-4" />
  </Link>
</div>

        {allFetchedDogs.length > 0 ? (
          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {allFetchedDogs.map((dog) => {
                const imageUrl = dog.image || '/images/placeholders/dog_placeholder.png';
                const productCategory = dog.breed_group || dog.origin || "Dog Supplies";

                return (
                  <div key={dog.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl group flex flex-col overflow-hidden transition-all duration-300 ease-out hover:-translate-y-0.5">
                    <Link href={`/dogs/${dog.id}`} className="block focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-1 rounded-t-xl">
                      <div className="relative aspect-square w-full bg-gray-50 p-3 overflow-hidden">
                        {dog.isBestSeller && (
                          <span className="absolute top-2 left-2 bg-green-500 text-white text-[9px] font-semibold px-1.5 py-0.5 rounded z-10 shadow">BEST SELLER</span>
                        )}
                        {dog.discountInfo && (
                          <span className="absolute top-2 right-2 bg-red-500 text-white text-[9px] font-semibold px-1.5 py-0.5 rounded z-10 shadow">{dog.discountInfo}</span>
                        )}
                        <Image
                          src={imageUrl}
                          alt={dog.name || 'Dog Product'}
                          fill
                          style={{ objectFit: 'cover' }}
                          className="group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 500px) 90vw, (max-width: 768px) 45vw, 30vw"
                        />
                      </div>
                    </Link>

                    <div className="p-3 flex flex-col flex-grow">
                      <p className="text-[11px] text-gray-500 mb-0.5 capitalize truncate" title={productCategory}>
                        {productCategory}
                      </p>
                      <Link href={`/dogs/${dog.id}`} className="block group/link focus:outline-none">
                        <h3 className="text-sm font-semibold text-slate-700 group-hover/link:text-orange-500 mb-1.5 line-clamp-2 leading-tight transition-colors" title={dog.name}>
                          {dog.name}
                        </h3>
                      </Link>

                      <div className="mt-auto pt-1.5 flex items-end justify-between">
                        {dog.price && (
                          <span className="text-base font-bold text-blue-600">
                            ${dog.price.toFixed(2)}
                          </span>
                        )}
                        <div className="flex items-center">
                          {dog.rating && (
                            <div className="flex items-center text-[11px] text-gray-500 mr-1.5">
                              <StarIcon className="w-3.5 h-3.5 text-yellow-400 mr-0.5" /> {dog.rating.toFixed(1)}
                            </div>
                          )}
                          <button
                            aria-label="Add to cart"
                            className="text-slate-400 hover:text-orange-500 transition-colors p-0.5">
                            <ShoppingCartIcon className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      {dog.discountInfo && dog.price && (
                        <span className="text-[10px] text-gray-400 line-through ml-0.5 mt-0.5 block">
                          ${(dog.price / (1 - parseFloat(dog.discountInfo.replace('% OFF', '')) / 100)).toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="text-center text-slate-500 py-10 col-span-full">
            {isLoading && !error && allFetchedDogs.length === 0 ? '' : 'No popular dogs to display at the moment.'}
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularDogsDisplay;
