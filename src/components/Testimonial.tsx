"use client";
import Image from 'next/image';
import type { Testimonial } from '../../types'; 


const sampleTestimonials: Testimonial[] = [
  {
    id: 1,
    quote: "Focopet's range is fantastic! My dog has never been healthier or happier since we switched. The quality is evident.",
    name: "Emily Rodrigez",
    role: "Dog Owner",
    imageUrl: "/images/testimonial 1.jpg", 
  },
  {
    id: 2,
    quote: "The customer service is top-notch, and delivery is always super fast. I highly recommend Focopet to all my friends with pets.",
    name: "John B. Stevens",
    role: "Cat Enthusiast",
    imageUrl: "/images/testimonial 2.webp", 
  },
  {
    id: 3,
    quote: "I love the variety of natural treats available. It's great to find a store that cares so much about pet well-being.",
    name: "Lisa Chen",
    role: "Bird & Rabbit Parent",
    imageUrl: "/images/testimonial 3.jpg", 
  },
];

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => {
  return (
    <div className="bg-slate-700 p-6 rounded-lg shadow-xl flex flex-col h-full transform hover:scale-105 transition-transform duration-300">
      <div className="flex items-start mb-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-foco-yellow flex-shrink-0">
          <Image
            src={testimonial.imageUrl}
            alt={`Photo of ${testimonial.name}`}
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div>
          <h4 className="font-semibold text-foco-yellow text-lg">{testimonial.name}</h4>
          <p className="text-slate-400 text-xs">{testimonial.role}</p>
        </div>
      </div>
      <blockquote className="flex-grow">
        <p className="text-slate-300 text-sm leading-relaxed italic">
          “{testimonial.quote}”
        </p>
      </blockquote>
    </div>
  );
};


const TestimonialsDisplay = () => {

  const testimonialsToDisplay = sampleTestimonials.slice(0, 3);

  return (
    <section className="bg-slate-800 text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
        
          <svg
            className="w-10 h-10 md:w-12 md:h-12 text-foco-yellow opacity-60 mb-3 md:mb-4 inline-block"
            fill="currentColor"
            viewBox="0 0 32 32"
            aria-hidden="true">
            <path d="M9.333 22.667C7.113 22.667 5.333 20.887 5.333 18.667V6.667C5.333 4.447 7.113 2.667 9.333 2.667H14C16.22 2.667 18 4.447 18 6.667V12C18 14.22 16.22 16 14 16H12V18.667C12 20.887 10.22 22.667 8 22.667H9.333ZM22.667 22.667C20.447 22.667 18.667 20.887 18.667 18.667V6.667C18.667 4.447 20.447 2.667 22.667 2.667H27.333C29.553 2.667 31.333 4.447 31.333 6.667V12C31.333 14.22 29.553 16 27.333 16H25.333V18.667C25.333 20.887 23.553 22.667 21.333 22.667H22.667Z" />
          </svg>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Feedback From Our Users
          </h2>
          <p className="text-slate-400 mt-2 md:mt-3 text-base md:text-lg max-w-2xl mx-auto">
            Hear what our happy pet parents are saying about their Focopet experience!
          </p>
        </div>

        {/* Grid for Testimonials */}
        {testimonialsToDisplay.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {testimonialsToDisplay.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        ) : (
          <p className="text-center text-slate-400">No testimonials available at the moment.</p>
        )}
      </div>
    </section>
  );
};

export default TestimonialsDisplay;