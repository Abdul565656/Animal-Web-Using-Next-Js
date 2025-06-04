import Link from 'next/link';
import { ArrowRightIcon } from 'lucide-react';
import { FaLinkedinIn, FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';


const navigationLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/products', label: 'All Products' },
  { href: '/blog', label: 'Our Blog' },
];

const helpLinks = [
  { href: '/support', label: 'Customer Support' },
  { href: '/faq', label: 'FAQs' },
  { href: '/terms', label: 'Terms & Conditions' },
  { href: '/testimonials', label: 'Testimonials' },
];

const socialLinks = [
  { href: 'https://linkedin.com', icon: FaLinkedinIn, label: 'LinkedIn', colorClass: 'hover:bg-[#0077B5]' }, 
  { href: 'https://facebook.com', icon: FaFacebookF, label: 'Facebook', colorClass: 'hover:bg-[#1877F2]' }, 
  { href: 'https://instagram.com', icon: FaInstagram, label: 'Instagram', colorClass: 'hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-500 hover:to-red-500' }, 
  { href: 'https://twitter.com', icon: FaTwitter, label: 'Twitter', colorClass: 'hover:bg-[#1DA1F2]' },    
];

const legalLinks = [
    { href: '/terms', label: 'Terms & Condition' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/contact', label: 'Contact Us' },
];


const Footer = () => {
  return (
    <footer className="bg-foco-yellow text-foco-dark pt-16 pb-8 sm:pt-20 sm:pb-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 mb-12 md:mb-16">
       
          <div className="md:col-span-6 lg:col-span-5">
            <h3 className="text-base sm:text-lg font-semibold mb-4 text-foco-dark tracking-wide">
              Stay Posted To Receive Updates
            </h3>
            <form className="flex items-center mb-8 max-w-md">
              <label htmlFor="footer-email" className="sr-only">Your Email</label>
              <input
                type="email"
                id="footer-email"
                placeholder="Enter your email address"
                className="w-full py-3 px-4 bg-transparent border-b-2 border-foco-dark/50 placeholder-slate-500 focus:outline-none focus:border-foco-orange focus:ring-0 transition-colors text-sm appearance-none"
              />
              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="bg-foco-orange text-white p-3 rounded-full -ml-10 flex-shrink-0 hover:bg-orange-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-foco-orange focus-visible:ring-offset-2 focus-visible:ring-offset-foco-yellow transition-all duration-200 ease-in-out transform hover:scale-110"
              >
                <ArrowRightIcon className="w-5 h-5" />
              </button>
            </form>

            <h3 className="text-base sm:text-lg font-semibold mb-4 mt-8 text-foco-dark tracking-wide">Social</h3>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`bg-foco-dark text-foco-yellow p-3 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110 hover:text-white ${social.colorClass}`}
                >
                  <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              ))}
            </div>
          </div>


          <div className="hidden md:block md:col-span-1 lg:col-span-2"></div>


          <div className="md:col-span-2 lg:col-span-2">
            <h3 className="text-base sm:text-lg font-semibold mb-5 text-foco-dark tracking-wide">Navigation</h3>
            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 hover:text-foco-orange hover:underline underline-offset-2 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3 lg:col-span-3"> 
            <h3 className="text-base sm:text-lg font-semibold mb-5 text-foco-dark tracking-wide">Help</h3>
            <ul className="space-y-3">
              {helpLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 hover:text-foco-orange hover:underline underline-offset-2 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      
          <div className="inline-flex items-center space-x-1 sm:space-x-2">
            <span className="font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-foco-dark tracking-tight
                             font-['Arial_Black',_'Gadget',_sans-serif]"> 
              FocoPet
            </span>
          </div>


        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500">
          <p className="mb-3 sm:mb-0 order-2 sm:order-1">
            © {new Date().getFullYear()} FocoPet Store. All Rights Reserved.
          </p>
          <ul className="flex flex-wrap justify-center sm:justify-end space-x-4 order-1 sm:order-2 mb-3 sm:mb-0">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="hover:text-foco-orange hover:underline underline-offset-2 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;