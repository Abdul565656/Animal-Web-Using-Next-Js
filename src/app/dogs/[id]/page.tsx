import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchDogById } from '../../../api/dogsApi'; 
import { notFound } from 'next/navigation';
import { Dog } from '../../../types'; 

import {
  HomeIcon,
  ChevronRightIcon,
  TagIcon,
  ClockIcon,
  GlobeAltIcon,
  ArrowUturnLeftIcon,
  InformationCircleIcon,
  SparklesIcon,
  ScaleIcon,
  ArrowsRightLeftIcon, 
  HeartIcon, 
  BookOpenIcon, 
  CurrencyDollarIcon, 
  StarIcon 
} from '@heroicons/react/24/outline'; 

interface DogDetailsPageProps {
  params: { id: string };
}

export default async function DogDetailsPage({ params }: DogDetailsPageProps) {
  const dog: Dog | null = await fetchDogById(params.id);

  if (!dog) {
    return notFound(); 
  }

  const formatDimension = (dimension?: { imperial?: string; metric?: string }) => {
    if (!dimension) return 'N/A';
    const parts = [];
    if (dimension.imperial) parts.push(`${dimension.imperial} (imperial)`);
    if (dimension.metric) parts.push(`${dimension.metric} (metric)`);
    return parts.join(' / ') || 'N/A';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <nav className="flex items-center space-x-2 text-gray-500 text-sm mb-8">
          <Link href="/" className="flex items-center space-x-1 hover:text-indigo-600 transition-colors">
            <HomeIcon className="h-4 w-4" />
            <span>Home</span>
          </Link>
          <ChevronRightIcon className="h-4 w-4 text-gray-400" />
          <Link href="/dogs" className="hover:text-indigo-600 transition-colors">
            <span>Dogs</span> 
          </Link>
          <ChevronRightIcon className="h-4 w-4 text-gray-400" />
          <span className="font-medium text-gray-700">{dog.name}</span>
        </nav>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {dog.image && (
            <div className="w-full h-64 sm:h-80 md:h-96 relative">
              <Image
                src={dog.image}
                alt={`Photo of ${dog.name}`}
                fill 
                style={{ objectFit: 'cover' }} 
                priority // Good for LCP
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}

          <div className="p-6 sm:p-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">{dog.name}</h1>

            {/* Core Details Section */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-700 mb-3 border-b pb-2">Key Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-gray-600">
                {dog.breed && (
                  <DetailItem icon={<TagIcon />} label="Breed" value={dog.breed} />
                )}
                {dog.age !== undefined && dog.age !== null && (
                  <DetailItem icon={<ClockIcon />} label="Age" value={`${dog.age} years`} />
                )}
                {dog.location && (
                  <DetailItem icon={<GlobeAltIcon />} label="Location" value={dog.location} />
                )}
                {dog.breed_group && (
                  <DetailItem icon={<SparklesIcon />} label="Breed Group" value={dog.breed_group} />
                )}
                {dog.life_span && (
                  <DetailItem icon={<HeartIcon />} label="Life Span" value={dog.life_span} />
                )}
                {dog.origin && (
                  <DetailItem icon={<GlobeAltIcon />} label="Origin" value={`${dog.origin}${dog.country_code ? ` (${dog.country_code})` : ''}`} />
                )}
              </div>
            </section>

            {/* Description and Temperament */}
            {(dog.description || dog.temperament) && (
              <section className="mb-8">
                {dog.description && (
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2 flex items-center">
                      <BookOpenIcon className="h-5 w-5 mr-2 text-indigo-500" /> About {dog.name}
                    </h2>
                    <p className="text-gray-600 leading-relaxed">{dog.description}</p>
                  </div>
                )}
                {dog.temperament && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-1 flex items-center">
                      <SparklesIcon className="h-5 w-5 mr-2 text-indigo-500" /> Temperament
                    </h3>
                    <p className="text-gray-600">{dog.temperament}</p>
                  </div>
                )}
              </section>
            )}

            {(dog.weight || dog.height || dog.bred_for) && (
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-700 mb-3 border-b pb-2">Physical Characteristics</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-gray-600">
                  {dog.weight && (
                    <DetailItem icon={<ScaleIcon />} label="Weight" value={formatDimension(dog.weight)} />
                  )}
                  {dog.height && (
                    <DetailItem icon={<ArrowsRightLeftIcon />} label="Height" value={formatDimension(dog.height)} />
                  )}
                  {dog.bred_for && (
                    <DetailItem icon={<InformationCircleIcon />} label="Bred For" value={dog.bred_for} />
                  )}
                </div>
              </section>
            )}
            
            {/* Additional Info like Price and Rating (if available from your API/type) */}
            {(dog.price !== undefined || dog.rating !== undefined) && (
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-700 mb-3 border-b pb-2">Purchase Info</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-gray-600">
                  {dog.price !== undefined && (
                    <DetailItem icon={<CurrencyDollarIcon />} label="Price" value={`$${dog.price.toFixed(2)}`} />
                  )}
                  {dog.rating !== undefined && (
                    <DetailItem icon={<StarIcon />} label="Rating" value={`${dog.rating.toFixed(1)} / 5.0`} />
                  )}
                </div>
              </section>
            )}


            <div className="mt-10 pt-6 border-t border-gray-200">
              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
              >
                <ArrowUturnLeftIcon className="h-5 w-5 mr-2" />
                Back to Dogs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface DetailItemProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

function DetailItem({ icon, label, value }: DetailItemProps) {
  return (
    <div className="flex items-start">
      <span className="text-indigo-500 mr-3 mt-1 flex-shrink-0 w-5 h-5">
        {React.cloneElement(icon as React.ReactElement, { className: "w-5 h-5" })}
      </span>
      <div>
        <dt className="text-sm font-medium text-gray-500">{label}</dt>
        <dd className="text-gray-700 font-medium">{value}</dd>
      </div>
    </div>
  );
}