import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchCatById } from '../../../api/catsApi'; 
import { notFound } from 'next/navigation';
import { Cat } from '../../../types'; 

import {
  HomeIcon, ChevronRightIcon, ArrowUturnLeftIcon, TagIcon, ClockIcon,
  GlobeAltIcon, BookOpenIcon, SparklesIcon, ScaleIcon, LinkIcon,
  InformationCircleIcon, StarIcon, CurrencyDollarIcon,
  HeartIcon, 
  PuzzlePieceIcon, 
  NoSymbolIcon, 
} from '@heroicons/react/24/outline';

interface CatDetailsPageProps {
  params: { id: string };
}


interface DetailItemProps {
  icon?: React.ReactNode; 
  label: string;
  value?: string | number | React.ReactNode; 
  className?: string;
}

function DetailItem({ icon, label, value, className }: DetailItemProps) {
  if (value === undefined || value === null || value === '') return null; 

  return (
    <div className={`flex items-start py-2 ${className}`}>
      {icon && (
        <span className="text-indigo-500 mr-3 mt-1 flex-shrink-0 w-5 h-5">
          {React.cloneElement(icon as React.ReactElement, { className: "w-5 h-5" })}
        </span>
      )}
      <div>
        <dt className="text-sm font-medium text-gray-500">{label}</dt>
        <dd className="text-gray-700 font-medium">{value}</dd>
      </div>
    </div>
  );
}

const renderScaleRating = (label: string, value?: number) => {
  if (value === undefined || value === null) return null;
  return (
    <div className="py-1">
      <span className="text-sm font-medium text-gray-500 mr-2">{label}:</span>
      <div className="inline-flex items-center">
        {[1, 2, 3, 4, 5].map((i) => (
          <StarIcon
            key={i}
            className={`h-5 w-5 ${i <= value ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          />
        ))}
        <span className="ml-2 text-xs text-gray-600">({value}/5)</span>
      </div>
    </div>
  );
};

const BooleanTrait = ({ label, isTrue, icon }: { label: string, isTrue?: boolean, icon?: React.ReactNode }) => {
  if (isTrue === undefined) return null;
  return (
    <div className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full mr-2 mb-2 ${isTrue ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
      {icon && React.cloneElement(icon as React.ReactElement, { className: "w-4 h-4 mr-1"})}
      {label}
    </div>
  );
}


export default async function CatDetailsPage({ params }: CatDetailsPageProps) {
  const cat: Cat | null = await fetchCatById(params.id);

  if (!cat) {
    return notFound();
  }

  const formatWeight = (weight?: { imperial?: string; metric?: string }) => {
    if (!weight) return 'N/A';
    const parts = [];
    if (weight.imperial) parts.push(`${weight.imperial} lbs`);
    if (weight.metric) parts.push(`${weight.metric} kg`);
    return parts.length > 0 ? parts.join(' / ') : 'N/A';
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-gray-600 text-sm mb-8">
          <Link href="/" className="flex items-center space-x-1 hover:text-indigo-700">
            <HomeIcon className="h-4 w-4" /> <span>Home</span>
          </Link>
          <ChevronRightIcon className="h-4 w-4 text-gray-400" />
          <Link href="/cats" className="hover:text-indigo-700"> {/* Assuming a /cats list page */}
            <span>Cats</span>
          </Link>
          <ChevronRightIcon className="h-4 w-4 text-gray-400" />
          <span className="font-medium text-gray-800">{cat.name}</span>
        </nav>

        <div className="bg-white shadow-2xl rounded-xl overflow-hidden">
          {cat.image && (
            <div className="w-full h-72 sm:h-80 md:h-96 lg:h-[500px] relative">
              <Image
                src={cat.image}
                alt={`Photo of ${cat.name}, a ${cat.temperament || ''} cat.`}
                fill
                style={{ objectFit: 'cover' }}
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 60vw"
              />
            </div>
          )}

          <div className="p-6 sm:p-10">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-3">{cat.name}</h1>
            {cat.altNames && <p className="text-md text-indigo-600 mb-6 italic">Also known as: {cat.altNames}</p>}

            {cat.description && (
              <section className="mb-8 prose prose-indigo max-w-none">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2 border-b-2 border-indigo-200 pb-2">
                  <BookOpenIcon className="h-6 w-6 inline-block mr-2 text-indigo-600" />
                  About {cat.name}
                </h2>
                <p className="text-gray-700 leading-relaxed">{cat.description}</p>
              </section>
            )}

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-indigo-200 pb-2">
                <TagIcon className="h-6 w-6 inline-block mr-2 text-indigo-600" />
                Breed Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
                <DetailItem icon={<SparklesIcon />} label="Temperament" value={cat.temperament} />
                <DetailItem icon={<GlobeAltIcon />} label="Origin" value={`${cat.origin || ''} ${cat.countryCode || cat.countryCodes || ''}`} />
                <DetailItem icon={<ClockIcon />} label="Life Span" value={cat.lifeSpan} />
                <DetailItem icon={<ScaleIcon />} label="Weight" value={formatWeight(cat.weight)} />
                {cat.wikipediaUrl && <DetailItem icon={<LinkIcon />} label="Wikipedia" value={<a href={cat.wikipediaUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">View on Wikipedia</a>} />}
                {cat.cfaUrl && <DetailItem icon={<LinkIcon />} label="CFA Profile" value={<a href={cat.cfaUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">View CFA Profile</a>} />}
                {cat.vetstreetUrl && <DetailItem icon={<LinkIcon />} label="Vetstreet" value={<a href={cat.vetstreetUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">View on Vetstreet</a>} />}
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-indigo-200 pb-2">
                <PuzzlePieceIcon className="h-6 w-6 inline-block mr-2 text-indigo-600" />
                Traits & Characteristics (1-5 Scale)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                {renderScaleRating("Adaptability", cat.adaptability)}
                {renderScaleRating("Affection Level", cat.affectionLevel)}
                {renderScaleRating("Child Friendly", cat.childFriendly)}
                {renderScaleRating("Dog Friendly", cat.dogFriendly)}
                {renderScaleRating("Energy Level", cat.energyLevel)}
                {renderScaleRating("Grooming Needs", cat.groomingNeeds)}
                {renderScaleRating("Health Issues", cat.healthIssues)}
                {renderScaleRating("Intelligence", cat.intelligence)}
                {renderScaleRating("Shedding Level", cat.sheddingLevel)}
                {renderScaleRating("Social Needs", cat.socialNeeds)}
                {renderScaleRating("Stranger Friendly", cat.strangerFriendly)}
                {renderScaleRating("Vocalisation", cat.vocalisation)}
              </div>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-indigo-200 pb-2">
                <InformationCircleIcon className="h-6 w-6 inline-block mr-2 text-indigo-600" />
                Other Features
              </h2>
              <div className="flex flex-wrap">
                <BooleanTrait label="Good Indoor Cat" isTrue={cat.isIndoor} icon={<HomeIcon />} />
                <BooleanTrait label="Lap Cat" isTrue={cat.isLapCat} icon={<HeartIcon />} />
                <BooleanTrait label="Hypoallergenic" isTrue={cat.isHypoallergenic} icon={<SparklesIcon />} />
                <BooleanTrait label="Hairless" isTrue={cat.isHairless} icon={<NoSymbolIcon />} />
                <BooleanTrait label="Natural Breed" isTrue={cat.isNatural} />
                <BooleanTrait label="Rare Breed" isTrue={cat.isRare} />
                <BooleanTrait label="Rex Coat" isTrue={cat.isRex} />
                <BooleanTrait label="Experimental" isTrue={cat.isExperimental} />
                <BooleanTrait label="Suppressed Tail" isTrue={cat.hasSuppressedTail} />
                <BooleanTrait label="Short Legs" isTrue={cat.hasShortLegs} />
              </div>
            </section>

            {(cat.price !== undefined || cat.rating !== undefined) && (
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3 border-b-2 border-indigo-200 pb-2">Example Adoption Info</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
                  {cat.price !== undefined && (
                    <DetailItem icon={<CurrencyDollarIcon />} label="Est. Adoption Fee" value={`$${cat.price.toFixed(2)}`} />
                  )}
                  {cat.rating !== undefined && (
                    <DetailItem icon={<StarIcon />} label="Community Rating" value={`${cat.rating.toFixed(1)} / 5.0`} />
                  )}
                </div>
              </section>
            )}

            <div className="mt-12 pt-8 border-t border-gray-200">
              <Link
                href="/" 
                className="inline-flex items-center px-8 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transform hover:scale-105"
              >
                <ArrowUturnLeftIcon className="h-6 w-6 mr-3" />
                See All Cats
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}