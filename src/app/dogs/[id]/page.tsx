// src/app/dogs/[id]/page.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchDogById } from '../../../api/dogsApi';      
import type { Dog, DogHeight, DogWeight } from '../../../../types'; 
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { HomeIcon, ChevronRightIcon, TagIcon, ClockIcon, GlobeAltIcon, ScaleIcon, ArrowsRightLeftIcon, PuzzlePieceIcon, ArrowUturnLeftIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

interface DogDetailPageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: DogDetailPageProps): Promise<Metadata> {

  const dog = await fetchDogById(params.id);
  if (!dog) return { title: 'Dog Not Found | FocoPet' };
  const description = dog.description || dog.temperament || `Learn more about ${dog.name}. Origin: ${dog.origin || 'N/A'}.`;
  return {
    title: `${dog.name || 'Dog Details'} | FocoPet`,
    description: description.substring(0, 160),
    openGraph: {
      title: `${dog.name || 'Dog Details'} | FocoPet`,
      description: description,
      images: dog.image ? [{ url: dog.image, alt: dog.name }] : [], 
      type: 'article',
    },
  };
}

const DetailItem: React.FC<{ icon?: React.ElementType; label: string; value?: string | React.ReactNode; className?: string }> = ({ icon: Icon, label, value, className="" }) => { /* ... same as before ... */ if (!value && typeof value !== 'number') return null; return (<div className={`py-2.5 sm:py-3 ${className}`}><dt className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center mb-0.5">{Icon && <Icon className="h-4 w-4 mr-2 text-orange-500 flex-shrink-0" />}{label}</dt><dd className="mt-1 text-sm text-slate-700 leading-relaxed">{value}</dd></div>); };
const PillBadge: React.FC<{ text?: string; className?: string; icon?: React.ElementType }> = ({ text, className = "bg-orange-100 text-orange-600", icon: Icon }) => { /* ... same as before ... */ if (!text) return null; return (<span className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full ${className}`}>{Icon && <Icon className="h-3.5 w-3.5 mr-1 -ml-0.5" />}{text}</span>);};


const DogDetailPage = async ({ params }: DogDetailPageProps) => {
  const dogId = params.id;
  console.log(`[DogDetailPage] Page params ID: ${dogId}`);
  const dog = await fetchDogById(dogId);
  console.log(`[DogDetailPage] Dog data received from fetchDogById:`, dog);

  if (!dog) {
    console.log(`[DogDetailPage] Dog with ID ${dogId} not found by fetchDogById, calling notFound().`);
    notFound();
  }

  const imageUrl = dog.image || '/images/placeholders/dog_placeholder_large.png';
  console.log(`[DogDetailPage] FINAL imageUrl being used for <Image>: ${imageUrl}`);

  return (
    <main className="bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Breadcrumbs */}
        <nav className="mb-6 md:mb-8 text-xs sm:text-sm text-gray-500" aria-label="Breadcrumb">
          <ol className="list-none p-0 inline-flex items-center space-x-1.5">
            <li><Link href="/" className="hover:text-orange-600 flex items-center transition-colors"><HomeIcon className="h-4 w-4 mr-1.5" />Home</Link></li>
            <li><ChevronRightIcon className="h-4 w-4 text-gray-400" /></li>
            <li><Link href="/dogs" className="hover:text-orange-600 transition-colors">Dog Breeds</Link></li>
            <li><ChevronRightIcon className="h-4 w-4 text-gray-400" /></li>
            <li className="font-medium text-gray-700 truncate max-w-[150px] sm:max-w-xs md:max-w-sm" title={dog.name}>{dog.name || 'Dog Details'}</li>
          </ol>
        </nav>

        <article className="bg-white shadow-2xl rounded-xl overflow-hidden">
          <div className="lg:flex">
        
            <div className="lg:w-2/5 xl:w-[45%] bg-slate-100 p-6 md:p-8 flex justify-center items-center">
              <div className="relative w-full max-w-sm aspect-square rounded-lg overflow-hidden shadow-md">
                {imageUrl && ( 
                  <Image
                    src={imageUrl} 
                    alt={dog.name || 'Image of the dog breed'}
                    fill
                    style={{ objectFit: 'contain' }} 
                    priority
                    sizes="(max-width: 768px) 90vw, (max-width: 1200px) 40vw, 33vw"
                  />
                )}
                {!imageUrl.startsWith('http') && 
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                        Image not available
                    </div>
                }
              </div>
            </div>

            <div className="lg:w-3/5 xl:w-[55%] p-6 md:p-10 flex flex-col">
              <div className="mb-3 flex flex-wrap gap-2 items-center">
                {dog.breed_group && <PillBadge text={dog.breed_group} icon={TagIcon} />}
                {dog.country_code && <PillBadge text={dog.country_code} className="bg-blue-100 text-blue-700" />}
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-800 mb-2 leading-tight">
                {dog.name}
              </h1>

              {dog.temperament && (
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                  <strong className="font-medium text-slate-700">Temperament:</strong> {dog.temperament}
                </p>
              )}

              {dog.description && (
                <div className="mb-8 prose prose-sm max-w-none text-slate-700 leading-relaxed">
                  <h2 className="text-lg font-semibold text-slate-700 mt-4 mb-1.5 border-b border-slate-200 pb-1.5">
                    <InformationCircleIcon className="h-5 w-5 inline mr-1.5 text-orange-500 -mt-0.5" />
                    About {dog.name}
                  </h2>
                  <p>{dog.description}</p>
                </div>
              )}

              <div className="mt-auto border-t border-gray-200 pt-4">
                <h3 className="text-base font-semibold text-slate-700 mb-2">Breed Characteristics</h3>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                  <DetailItem icon={GlobeAltIcon} label="Origin" value={dog.origin} />
                  <DetailItem icon={ClockIcon} label="Life Span" value={dog.life_span} />
                  <DetailItem icon={ScaleIcon} label="Weight" value={dog.weight ? `${dog.weight.metric} kg (${dog.weight.imperial} lbs)` : null} />
                  <DetailItem icon={ArrowsRightLeftIcon} label="Height" value={dog.height ? `${dog.height.metric} cm (${dog.height.imperial} inches)` : null} />
                  <DetailItem icon={PuzzlePieceIcon} label="Bred For" value={dog.bred_for} />
                </dl>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link href="/"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 transition-colors shadow-sm"
                >
                  <ArrowUturnLeftIcon className="w-4 h-4 mr-2" />
                  View Other Breeds
                </Link>
              </div>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
};

export default DogDetailPage;