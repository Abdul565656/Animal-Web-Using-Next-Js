import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon, ShoppingCartIcon, StarIcon } from '@heroicons/react/24/solid';
import { fetchDisplayProducts } from '@/api/dogsApi';
import type { Dog as Product } from '../../types';

const LatestItems = async () => {
  let latestProducts: Product[] = [];
  try {
    latestProducts = await fetchDisplayProducts(3);
  } catch (error) {
    console.error("Error fetching latest items for display:", error);
  }

  if (!latestProducts.length) return null;

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center text-center md:text-left gap-4 mb-8 md:mb-10">
          <div className="max-w-xl mx-auto md:mx-0">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-1">
              Our Latest Items
            </h2>
            <p className="text-sm text-slate-600">
              Welcome To FocoPet&lsquo; Your Ultimate Online Pet Store In India! At FocoPet&lsquo; We&apos;re More Than Just A Pet Shop Online - We&apos;re Your Partners In Pet Parenting.
            </p>
          </div>
          <div>
            <Link
              href="/dogs"
              className="inline-flex items-center gap-2 bg-orange-500 text-white text-sm font-semibold py-2.5 px-5 rounded-lg hover:bg-orange-600 transition-colors duration-200"
            >
              See All Products
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Products Grid */}
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestProducts.map((product) => {
              const imageUrl = product.image;
              const productCategory = product.breed_group || product.origin || "Dog Supplies";

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg group flex flex-col overflow-hidden transition-all duration-300 ease-out hover:-translate-y-0.5"
                >
                  <Link href={`/dogs/${product.id}`} className="block focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-1 rounded-t-xl">
                    <div className="relative w-full aspect-video bg-gray-50 p-3 overflow-hidden">
                      <Image
                        src={imageUrl ?? '/placeholder.png'}
                        alt={product.name || 'Latest Item'}
                        fill
                        style={{ objectFit: 'contain' }}
                        className="group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  </Link>

                  <div className="p-4 flex flex-col flex-grow">
                    <p className="text-xs text-gray-500 mb-1 capitalize truncate" title={productCategory}>
                      {productCategory}
                    </p>
                    <Link href={`/dogs/${product.id}`} className="block group/link focus:outline-none">
                      <h3 className="text-sm font-semibold text-slate-700 group-hover/link:text-orange-500 mb-2 line-clamp-2 leading-tight transition-colors" title={product.name}>
                        {product.name}
                      </h3>
                    </Link>

                    <div className="mt-auto flex items-end justify-between">
                      {product.price && (
                        <span className="text-base font-bold text-blue-600">
                          ${product.price.toFixed(2)}
                        </span>
                      )}
                      <div className="flex items-center">
                        {product.rating && (
                          <div className="flex items-center text-xs text-gray-500 mr-2">
                            <StarIcon className="w-4 h-4 text-yellow-400 mr-0.5" />
                            {product.rating.toFixed(1)}
                          </div>
                        )}
                        <button
                          aria-label="Add to cart"
                          className="text-slate-400 hover:text-orange-500 transition-colors p-1"
                        >
                          <ShoppingCartIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestItems;
