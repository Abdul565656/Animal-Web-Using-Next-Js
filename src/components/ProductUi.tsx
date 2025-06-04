import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon, ShoppingCartIcon, StarIcon } from '@heroicons/react/24/solid';
import { fetchDisplayProducts } from '../api/dogsApi'; 
import type { Dog as Product } from '../../types';     

const LatestItemsDisplay = async () => {
  let latestProducts: Product[] = [];
  try {
    latestProducts = await fetchDisplayProducts(3);
  } catch (error) {
    console.error("Error fetching latest items for display:", error);
  }

  return (
    <section className="py-12 md:py-16 bg-white"> 
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-center space-x-64 items-center mb-8 md:mb-10">
          <div className="text-center sm:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-1">
              Our Latest Items
            </h2>
            <p className="text-sm text-slate-600 max-w-xl">
              Welcome To FocoPet&lsquo; Your Ultimate Online Pet Store In India! At FocoPet&lsquo; We&apos;re More Than Just A Pet Shop Online - We&apos;re Your Partners In Pet Parenting.
            </p>
          </div>
          <Link
            href="/dogs" // Changed link to /dogs, assuming this is your main product/dog listing page
            className="mt-4 sm:mt-0 bg-orange-500 text-white text-sm font-semibold py-2.5 px-5 rounded-lg hover:bg-orange-600 transition-colors duration-200 flex items-center gap-2"
          >
            See All Products
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>

        {latestProducts && latestProducts.length > 0 ? (
          <div className="mx-auto max-w-5xl"> 
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {latestProducts.map((product) => {
                const imageUrl = product.image || "picture here"; 
             
                const productCategory = product.breed_group || product.origin || "Dog Supplies";

                return (
                  <div key={product.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl group flex flex-col overflow-hidden transition-all duration-300 ease-out hover:-translate-y-0.5">
                    <Link href={`/dogs/${product.id}`} className="block focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-1 rounded-t-xl">
                      <div className="relative aspect-[4/3] w-full bg-gray-50 p-3 overflow-hidden"> 
                        {product.isBestSeller && ( 
                          <span className="absolute top-2 left-2 bg-green-500 text-white text-[9px] font-semibold px-1.5 py-0.5 rounded z-10 shadow">
                            Best Seller
                          </span>
                        )}
                        <Image
                          src={imageUrl}
                          alt={product.name || 'Latest Item'}
                          fill
                          style={{ objectFit: 'contain' }}
                          className="group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw" // Adjusted sizes for 3-col layout
                        />
                      </div>
                    </Link>

                    <div className="p-3 flex flex-col flex-grow"> {/* Reduced padding */}
                      <p className="text-[11px] text-gray-500 mb-0.5 capitalize truncate" title={productCategory}>
                        {productCategory}
                      </p>
                      <Link href={`/dogs/${product.id}`} className="block group/link focus:outline-none">
                      
                        <h3 className="text-sm font-semibold text-slate-700 group-hover/link:text-orange-500 mb-1.5 line-clamp-2 leading-tight transition-colors" title={product.name}>
                          {product.name}
                        </h3>
                      </Link>

                      <div className="mt-auto pt-1.5 flex items-end justify-between">
                        {product.price && (
                          <span className="text-base font-bold text-blue-600">
                            ${product.price.toFixed(2)}
                          </span>
                        )}
                        <div className="flex items-center">
                          {product.rating && ( 
                            <div className="flex items-center text-[11px] text-gray-500 mr-1.5">
                              <StarIcon className="w-3.5 h-3.5 text-yellow-400 mr-0.5" /> {product.rating.toFixed(1)}
                            </div>
                          )}
                          <button
                            aria-label="Add to cart"
                            className="text-slate-400 hover:text-orange-500 transition-colors p-0.5"
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
        ) : (
          <p className="text-center text-slate-500 py-10">
            No latest items to display at this time.
          </p>
        )}
      </div>
    </section>
  );
};

export default LatestItemsDisplay;